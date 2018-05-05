import { ElementRef, EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SkyTabsetAdapterService {
  public overflowChange = new EventEmitter<boolean>();

  public currentOverflow = false;

  private el: HTMLElement;

  private tabsEl: HTMLElement;

  private bntsEl: HTMLElement;

  public init(elRef: ElementRef) {
    this.el = elRef.nativeElement.querySelector('.sky-tabset');
    this.tabsEl = elRef.nativeElement.querySelector('.sky-tabset-tabs');
    this.bntsEl = elRef.nativeElement.querySelector('.sky-tabset-btns');

    this.detectOverflow();
  }

  public detectOverflow() {
    if (this.el && this.tabsEl) {
      const elWidth = this.el.offsetWidth;
      const tabsElWidth = this.tabsEl.offsetWidth + this.bntsEl.offsetWidth;
      if (tabsElWidth < elWidth) {
        if (this.currentOverflow) {
          this.currentOverflow = false;
          this.overflowChange.emit(false);
        }
      } else if (!this.currentOverflow) {
        this.currentOverflow = true;
        this.overflowChange.emit(true);
      }
    }
  }
}
