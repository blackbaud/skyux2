import {
  Component,
  Input,
  ElementRef,
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
import {
  SkyTextExpandAdapterService
} from './text-expand-adapter.service';
@Component({
  selector: 'sky-text-expand',
  templateUrl: './text-expand.component.html',
  styleUrls: ['./text-expand.component.scss'],
  providers: [
    SkyTextExpandAdapterService,
    SkyResourcesService
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
  public expandModalTitle: string = this.resources.getString('text_expand_modal_title');
  @Input()
  public expandRepeaterMax: number;
  @Input()
  public expandRepeaterData: number;
  public buttonText: string;
  private seeMoreText: string = this.resources.getString('text_expand_see_more');
  private seeLessText: string = this.resources.getString('text_expand_see_less');
  private textToShow: string;
  private collapsedText: string;
  private expandedText: string;
  private newlineCount: number;
  private isExpanded: boolean = false;
  private expandable: boolean;
  @ViewChild('container')
  private containerEl: ElementRef;
  @ViewChild('text')
  private textEl: ElementRef;

  constructor(private resources: SkyResourcesService, private modalService: SkyModalService,
    private elRef: ElementRef, private textExpandAdapter: SkyTextExpandAdapterService) { }

  public textExpand() {
    if (this.newlineCount > this.maxExpandedNewlines
      || this.expandedText.length > this.maxExpandedLength) {
      // Modal View
      /* istanbul ignore else */
      /* sanity check */
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
      // Normal View
      if (!this.isExpanded) {
        this
          .animateText(this.collapsedText, this.expandedText, true);
        this.isExpanded = true;
      } else {
        this
          .animateText(this.expandedText, this.collapsedText, false);
        this.isExpanded = false;
      }
    }
  }

  public animationEnd() {
    // Ensure the correct text is displayed
    this.textExpandAdapter.setText(this.textEl, this.textToShow);
    // Set height back to auto so the browser can change the height as needed with window changes
    this.textExpandAdapter.setContainerHeight(this.containerEl, 'auto');
  }

  private setup(value: string) {
    if (value) {
      this.newlineCount = this.getNewlineCount(value);
      this.collapsedText = this.getTruncatedText(value, this.maxLength, this.maxNewlines);
      this.expandedText = value.length > this.maxExpandedLength ||
        this.newlineCount > this.maxExpandedNewlines ?
        value : this.getTruncatedText(value, this.maxExpandedLength, this.maxExpandedNewlines);
      if (this.collapsedText !== value) {
        this.buttonText = this.seeMoreText;
        this.isExpanded = false;
        this.expandable = true;
      } else {
        this.expandable = false;
      }
      this.textToShow = this.collapsedText;
    } else {
      this.textToShow = '';
    }
    this.textExpandAdapter.setText(this.textEl, this.textToShow);
  }

  private getNewlineCount(value: string) {
    let matches = value.match(/\n/gi);

    if (matches) {
      return matches.length;
    }

    return 0;
  }
  private getTruncatedText(value: string, length: number, newlines: number) {
    let i: number;
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
    expanding: boolean) {
    let adapter = this.textExpandAdapter;
    let container = this.containerEl;
    // Measure the current height so we can animate from it.
    let currentHeight = adapter.getContainerHeight(container);
    this.textToShow = newText;
    adapter.setText(this.textEl, this.textToShow);
    this.buttonText = expanding ? this.seeLessText : this.seeMoreText;
    // Measure the new height so we can animate to it.
    let newHeight = adapter.getContainerHeight(container);
    if (newHeight < currentHeight) {
      // The new text is smaller than the old text, so put the old text back before doing
      // the collapse animation to avoid showing a big chunk of whitespace.
      adapter.setText(this.textEl, previousText);
    }
    adapter.setContainerHeight(container, `${currentHeight}px`);
    // This timeout is necessary due to the browser needing to pick up the non-auto height being set
    // in order to do the transtion in height correctly. Without it the transition does not fire.
    setTimeout(function () {
      adapter.setContainerHeight(container, `${newHeight}px`);
    }, 5);
  }

}
