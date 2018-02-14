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

import {
  SkyWindowRefService
} from '../window';

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
    private elementRef: ElementRef,
    private windowRef: SkyWindowRefService
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
      .subscribe((event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
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

          // Give the popover a chance to set its isMouseEnter flag before checking to see
          // if it should be closed.
          this.windowRef.getWindow().setTimeout(() => {
            if (this.isPopoverOpen()) {
              if (this.skyPopover.isMouseEnter) {
                this.skyPopover.markForCloseOnMouseLeave();
              } else {
                this.closePopover();
              }
            }
          });
        }
      });
  }

  private removeEventListeners() {
    this.idled.next(true);
    this.idled.unsubscribe();
    this.idled = new Subject<boolean>();
  }
}
