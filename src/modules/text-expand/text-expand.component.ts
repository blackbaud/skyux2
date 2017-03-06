import {
  Component,
  Input,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  SkyResourcesService
} from '../resources';

@Component({
  selector: 'sky-text-expand',
  templateUrl: './text-expand.component.html',
  styleUrls: ['./text-expand.component.scss'],
  providers: [
    SkyResourcesService
  ]
})
export class SkyTextExpandComponent {
  @Input()
  public set text(value: string) {
    let textExpand = this;
    if (value) {
      this.collapsedText = this.getTruncatedText(value, this.maxLength, this.maxNewlines);
      this.expandedText =
        this.getTruncatedText(value, this.maxExpandedLength, this.maxExpandedNewlines);
      if (this.collapsedText !== value) {
        this.ellipsis.nativeElement.style.display = 'inline';
        this.space.nativeElement.style.display = 'inline';
        this.seeMore.nativeElement.style.display = 'inline';
        this.seeMore.nativeElement.innerHtml = 'See more';
        this.isExpanded = false;
      } else {
        this.ellipsis.nativeElement.style.display = 'none';
        this.space.nativeElement.style.display = 'none';
        this.seeMore.nativeElement.style.display = 'none';
      }
      this.textToShow = this.collapsedText;

      this.seeMore.nativeElement.onclick = function(){
        if (!textExpand.isExpanded) {
          textExpand.animateText(textExpand.collapsedText, textExpand.expandedText, 'See less', false);
          textExpand.isExpanded = true;
        } else {
          textExpand.animateText(textExpand.expandedText, textExpand.collapsedText, 'See more', true);
          textExpand.isExpanded = false;
        }
      };

    } else {
      this.textToShow = '';
    }
  }
  @Input()
  public maxLength: number = 200;
  @Input()
  public maxExpandedLength: number = 600;
  public maxNewlines: number = 1;
  @Input()
  public maxExpandedNewlines: number = 2;
  @Input()
  public expandModalTitle: string;
  @Input()
  public expandRepeaterMax: number;
  @Input()
  public expandRepeaterData: number;
  public textToShow: string;
  private collapsedText: string;
  private expandedText: string;
  private isExpanded: boolean;
  @ViewChild('ellipsis') private ellipsis: ElementRef;
  @ViewChild('space') private space: ElementRef;
  @ViewChild('seeMore') private seeMore: ElementRef;

  constructor(private resources: SkyResourcesService, private elRef: ElementRef) { }

  private getNewlineCount(value: string) {
    let matches = value.match(/\n/gi);

    if (matches) {
      return matches.length;
    }

    return 0;
  }
  private getTruncatedText(value: string, length: number, newlines: number) {
    let i;

    if (newlines && this.getNewlineCount(value) >= newlines) {
      value = value.replace(/\s+/gi, ' ');
    }

    // Jump ahead one character and see if it's a space, and if it isn't,
    // back up to the first space and break there so a word doesn't get cut
    // in half.
    if (length < value.length) {
      for (i = length; i > length - 10; i--) {
        if (/\s/.test(value.charAt(i))) {
          length = i;
          break;
        }
      }
    }
    return value.substr(0, length);
  }

  private animateText(previousText: string, newText: string,
    newExpandText: string, showEllipsis: boolean) {
    // Measure the current height so we can animate from it.
    let currentHeight = this.elRef.nativeElement.style.height;

    this.textToShow = newText;
    this.seeMore.nativeElement.innerHtml = newExpandText;
    let newHeight = this.elRef.nativeElement.style.height;

    if (newHeight < currentHeight) {
      // The new text is smaller than the old text, so put the old text back before doing
      // the collapse animation to avoid showing a big chunk of whitespace.
      this.textToShow = previousText;
    }

    this.ellipsis.nativeElement.style.display = showEllipsis ? 'inline' : 'none';
    // this.elRef.nativeElement
    //   .height(currentHeight)
    //   .animate(
    //   {
    //     height: newHeight
    //   },
    //   250,
    //   function () {
    //     if (newHeight < currentHeight) {
    //       this.textToShow = newText;
    //     }
    //     this.elRef.nativeElement.style.height = 'auto';
    //   }
    //   );
  }

}
