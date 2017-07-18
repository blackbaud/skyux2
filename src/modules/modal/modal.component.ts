 import {
  animate,
  Component,
  state,
  style,
  transition,
  trigger,
  ElementRef,
  AfterViewInit,
  HostListener
} from '@angular/core';

import { SkyModalHostService } from './modal-host.service';
import { SkyModalConfiguration } from './modal-configuration';

import { SkyModalComponentAdapterService } from './modal-component-adapter.service';

@Component({
  selector: 'sky-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalState', [
      state('in', style({ opacity: '1.0' })),
      state('out', style({ opacity: '0.0' })),
      transition('void => *', [
        style({ opacity: '0.0' }),
        animate(150)
      ]),
      transition('* => void', [
        animate(150, style({ opacity: '0.0' }))
      ])
    ])
  ],
  providers: [
    SkyModalComponentAdapterService
  ]
})
export class SkyModalComponent implements AfterViewInit {
  public modalState = 'in';

  public get modalZIndex() {
    return this.hostService.getModalZIndex();
  }

  public get modalFullPage() {
    return this.config.fullPage;
  }

  public get isSmallSize() {
    return !this.modalFullPage && this.isSizeEqual(this.config.size, 'small');
  }

  public get isMediumSize() {
    return !this.modalFullPage && !(this.isSmallSize || this.isLargeSize);
  }

  public get isLargeSize() {
    return !this.modalFullPage && this.isSizeEqual(this.config.size, 'large');
  }

  @HostListener('document:keydown', ['$event'])
  public onDocumentKeyDown(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return event;
    }
    if (SkyModalHostService.openModalCount > 0) {
      let topModal = SkyModalHostService.topModal;
      if (topModal && topModal === this.hostService) {
        switch(event.which) {
          case 27: { // Esc key pressed
            event.preventDefault();
            this.hostService.onClose(this);
          }

          case 9: {  // Tab pressed
            let focusChanged = false;

            let focusElementList = this.componentAdapter.loadFocusElementList(this.elRef);

            if (
              event.shiftKey &&
              this.componentAdapter.isFocusInFirstItem(event, focusElementList)) {

              focusChanged = this.componentAdapter.focusLastElement(focusElementList);
            } else if (this.componentAdapter.isFocusInLastItem(event, focusElementList)) {
              focusChanged = this.componentAdapter.focusFirstElement(focusElementList);
            }

            if (focusChanged) {
              event.preventDefault();
              event.stopPropagation();
            }
          }
        }
      }

    }
  }

  constructor(
    private hostService: SkyModalHostService,
    private config: SkyModalConfiguration,
    private elRef: ElementRef,
    private componentAdapter: SkyModalComponentAdapterService) { }

  public ngAfterViewInit() {
    this.componentAdapter.handleWindowChange(this.elRef);

    this.componentAdapter.modalOpened(this.elRef);
  }

  public closeButtonClick() {
    this.hostService.onClose(this);
  }

  public windowResize() {
    this.componentAdapter.handleWindowChange(this.elRef);
  }

  private isSizeEqual(actualSize: string, size: string) {
    return actualSize && actualSize.toLowerCase() === size;
  }
}
