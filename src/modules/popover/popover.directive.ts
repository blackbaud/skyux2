import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import {
  SkyPopoverAlignment,
  SkyPopoverPlacement,
  SkyPopoverTrigger
} from './types';

import { SkyPopoverComponent } from './popover.component';

@Directive({
  selector: '[skyPopover]'
})
export class SkyPopoverDirective implements OnChanges, OnDestroy {
  @Input()
  public skyPopover: SkyPopoverComponent;

  @Input()
  public skyPopoverAlignment: SkyPopoverAlignment;

  @Input()
  public skyPopoverPlacement: SkyPopoverPlacement;

  @Input()
  public skyPopoverTrigger: SkyPopoverTrigger = 'click';

  private idled = new Subject<boolean>();

  constructor(
    private elementRef: ElementRef
  ) { }

  public ngOnChanges(changes: SimpleChanges) {
    /* istanbul ignore else */
    if (changes.skyPopover) {
      this.removeEventListeners();
      if (changes.skyPopover.currentValue !== undefined) {
        this.addEventListeners();
      }
    }
  }

  public ngOnDestroy(): void {
    this.removeEventListeners();
  }

  public togglePopover() {
    if (this.isPopoverOpen()) {
      this.closePopover();
      return;
    }

    this.positionPopover();
  }

  private positionPopover() {
    this.skyPopover.positionNextTo(
      this.elementRef,
      this.skyPopoverPlacement,
      this.skyPopoverAlignment
    );
  }

  private closePopover() {
    this.skyPopover.close();
  }

  private isPopoverOpen(): boolean {
    return (this.skyPopover && this.skyPopover.isOpen);
  }

  private addEventListeners() {
    const element = this.elementRef.nativeElement;

    Observable
      .fromEvent(element, 'keyup')
      .takeUntil(this.idled)
      .subscribe((event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        if (key === 'escape' && this.isPopoverOpen()) {
          event.stopPropagation();
          event.preventDefault();
          this.closePopover();
          this.elementRef.nativeElement.focus();
        }
      });

    Observable
      .fromEvent(element, 'click')
      .takeUntil(this.idled)
      .subscribe((event: any) => {
        this.togglePopover();
      });

    Observable
      .fromEvent(element, 'mouseenter')
      .takeUntil(this.idled)
      .subscribe((event: MouseEvent) => {
        this.skyPopover.isMouseEnter = true;
        if (this.skyPopoverTrigger === 'mouseenter') {
          event.preventDefault();
          this.positionPopover();
        }
      });

      Observable
      .fromEvent(element, 'mouseleave')
      .takeUntil(this.idled)
      .subscribe((event: MouseEvent) => {
        this.skyPopover.isMouseEnter = false;

        if (this.skyPopoverTrigger === 'mouseenter') {
          event.preventDefault();

          if (this.skyPopover.isOpen) {
            this.closePopover();
          } else {
            // If the mouse leaves before the popover is open,
            // wait for the transition to complete before closing it.
            this.skyPopover.popoverOpened.take(1).subscribe(() => {
              this.closePopover();
            });
          }
        }
      });
  }

  private removeEventListeners() {
    this.idled.next(true);
    this.idled.unsubscribe();
    this.idled = new Subject<boolean>();
  }
}
