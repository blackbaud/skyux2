import {
  Component,
  Input,
  ElementRef,
  trigger,
  state,
  style,
  transition,
  animate,
  ViewChild
} from '@angular/core';

import {
  SkyResourcesService
} from '../resources';
import {
  SkyModalService
} from '../modal';
import {
  SkyTextExpandModalComponent
} from './text-expand-modal.component';
import {
  SkyTextExpandModalContext
} from './text-expand-modal-context';
@Component({
  selector: 'sky-text-expand',
  templateUrl: './text-expand.component.html',
  styleUrls: ['./text-expand.component.scss'],
  providers: [
    SkyResourcesService
  ],
  animations: [
    trigger('expansionChanged', [
      state('false', style({ 'height': '*' })),
      state('true', style({ 'height': '*' })),
      transition('* <=> *', [style({ 'height': '*' }),
        animate('250ms', style({ 'height': 'auto' }))])
    ])
  ]
})
export class SkyTextExpandComponent {
  @Input()
  public set text(value: string) {
    this.setup(value);
  }
  @Input()
  public maxLength: number = 200;
  @Input()
  public maxExpandedLength: number = 600;
  public maxNewlines: number = 1;
  @Input()
  public maxExpandedNewlines: number = 2;
  @Input()
  public expandModalTitle: string = 'Expanded text';
  @Input()
  public expandRepeaterMax: number;
  @Input()
  public expandRepeaterData: number;
  public seeMore: string;
  private textToShow: string;
  private collapsedText: string;
  private expandedText: string;
  private newlineCount: number;
  private isExpanded: boolean = false;
  private expandable: boolean;
  private elementHeight: string;
  @ViewChild('container')
  private containerEl: ElementRef;
  @ViewChild('text')
  private textEl: ElementRef;

  constructor(private resources: SkyResourcesService, private elRef: ElementRef,
    private modalService: SkyModalService) { }

  public textExpand() {
    if (this.newlineCount > this.maxExpandedNewlines
      || this.expandedText.length > this.maxExpandedLength) {
      if (!this.isExpanded) {
        this.modalService.open(
          SkyTextExpandModalComponent,
          [
            {
              provide: SkyTextExpandModalContext,
              useValue: {
                header: this.expandModalTitle,
                text: this.expandedText
              }
            }
          ]
        );
      }
    } else {
      if (!this.isExpanded) {
        this
          .animateText(this.collapsedText, this.expandedText, 'See less');
        this.isExpanded = true;
      } else {
        this
          .animateText(this.expandedText, this.collapsedText, 'See more');
        this.isExpanded = false;
      }
    }
  }

  public animationEnd() {
    this.textEl.nativeElement.textContent = this.textToShow;
  }

  private setup(value: string) {
    if (value) {
      this.newlineCount = this.getNewlineCount(value);
      this.collapsedText = this.getTruncatedText(value, this.maxLength, this.maxNewlines);
      this.expandedText = value.length > this.maxExpandedLength ||
        this.newlineCount > this.maxExpandedNewlines ?
          value : this.getTruncatedText(value, this.maxExpandedLength, this.maxExpandedNewlines);
      if (this.collapsedText !== value) {
        this.seeMore = 'See more';
        this.isExpanded = false;
        this.expandable = true;
      } else {
        this.expandable = false;
      }
      this.textToShow = this.collapsedText;
    } else {
      this.textToShow = '';
    }
    this.textEl.nativeElement.textContent = this.textToShow;
  }

  private getNewlineCount(value: string) {
    let matches = value.match(/\n/gi);

    if (matches) {
      return matches.length;
    }

    return 0;
  }
  private getTruncatedText(value: string, length: number, newlines: number) {
    let i;

    if (newlines && this.newlineCount >= newlines) {
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
    newExpandText: string) {
    // Measure the current height so we can animate from it.
    // let currentHeight = this.elementHeight;
    let currentHeight = this.containerEl.nativeElement.offsetHeight;
    this.textToShow = newText;
    this.textEl.nativeElement.textContent = this.textToShow;
    this.seeMore = newExpandText;
    let newHeight = this.containerEl.nativeElement.offsetHeight;

    if (newHeight < currentHeight) {
      // The new text is smaller than the old text, so put the old text back before doing
      // the collapse animation to avoid showing a big chunk of whitespace.
      this.textEl.nativeElement.textContent = previousText;
    }
    this.elementHeight = `${currentHeight}px`;
    // this.elementHeight = currentHeight;
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
