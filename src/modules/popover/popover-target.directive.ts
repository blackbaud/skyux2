import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit
} from '@angular/core';

import { SkyPopoverComponent } from './popover.component';

@Directive({
  selector: '[skyPopoverTarget]'
})
export class SkyPopoverTargetDirective implements OnInit {
  @Input()
  public skyPopoverTarget: SkyPopoverComponent;

  @Input()
  public skyPopoverPlacement: string;

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) {
    event.preventDefault();

    const controlRect = this.elementRef.nativeElement.getBoundingClientRect();
    const popoverRect = this.skyPopoverTarget.elementRef.nativeElement.getBoundingClientRect();

    let left;
    let top;

    switch (this.skyPopoverPlacement) {
      default:
      case 'top':
        left = controlRect.left - (popoverRect.width / 2) + (controlRect.width / 2);
        top = controlRect.top - popoverRect.height - 10;
        break;
      case 'right':
        break;
      case 'bottom':
        left = controlRect.left - (popoverRect.width / 2) + (controlRect.width / 2);
        top = controlRect.bottom + 10;
        break;
      case 'left':
        break;
    }

    // this.skyPopoverTarget.setElementPosition(left, top);
    this.skyPopoverTarget.elementRef.nativeElement.style.left = `${left}px`;
    this.skyPopoverTarget.elementRef.nativeElement.style.top = `${top}px`;
    this.skyPopoverTarget.placement = this.skyPopoverPlacement;
  }

  public constructor(
    private elementRef: ElementRef) { }

  public ngOnInit(): void {
  }
}
