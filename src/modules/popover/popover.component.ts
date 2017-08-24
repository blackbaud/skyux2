import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'sky-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class SkyPopoverComponent {
  @Input()
  public popoverTitle: string;

  @Input()
  public placement: string;

  public constructor(
    public elementRef: ElementRef) { }

  public getClassName(): any {
    return `sky-popover-placement-${this.placement}`;
  }

  // public setElementPosition(top: number, left: number): void {
  //   this.elementRef.nativeElement.style.left = `${left}px`;
  //   this.elementRef.nativeElement.style.top = `${top}px`;
  // }
}
