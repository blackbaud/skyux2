import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

import { SkyPopoverComponent } from './popover.component';

@Directive({
  selector: '[skyPopoverClose]'
})
export class SkyPopoverCloseDirective {
  public target: SkyPopoverComponent;

  @HostListener('click', ['$event'])
  private closeTarget(event: MouseEvent): void {
    event.preventDefault();
    if (this.target) {
      this.target.hide();
    }
  }
}
