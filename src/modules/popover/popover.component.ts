import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import {
  AnimationEvent,
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Subject } from 'rxjs/Subject';

import {
  SkyWindowRefService
} from '../window';

import {
  SkyPopoverAlignment,
  SkyPopoverPlacement
} from './types';

import { SkyPopoverAdapterService } from './popover-adapter.service';

@Component({
  selector: 'sky-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  providers: [SkyPopoverAdapterService],
  animations: [
    trigger('popoverState', [
      state('visible', style({ opacity: 1, visibility: 'visible' })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => visible', animate('150ms')),
      transition('visible => hidden', animate('150ms'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyPopoverComponent implements OnInit, OnDestroy {
  @Input()
  public dismissOnBlur = true;

  @Input()
  public popoverTitle: string;

  @Input()
  public set alignment(value: SkyPopoverAlignment) {
    this._alignment = value;
  }

  public get alignment(): SkyPopoverAlignment {
    return this._alignment || 'center';
  }

  @Input()
  public set placement(value: SkyPopoverPlacement) {
    this._placement = value;
  }

  public get placement(): SkyPopoverPlacement {
    return this._placement || 'above';
  }

  @Output()
  public popoverOpened = new EventEmitter<SkyPopoverComponent>();

  @Output()
  public popoverClosed = new EventEmitter<SkyPopoverComponent>();

  @ViewChild('popoverContainer')
  public popoverContainer: ElementRef;

  @ViewChild('popoverArrow')
  public popoverArrow: ElementRef;

  public isOpen = false;
  public isMouseEnter = false;
  public classNames: string[] = [];
  public animationState: 'hidden' | 'visible' = 'hidden';

  public popoverTop: number;
  public popoverLeft: number;
  public arrowTop: number;
  public arrowLeft: number;

  private isMarkedForCloseOnMouseLeave = false;
  private caller: ElementRef;
  private destroy = new Subject<boolean>();

  private _alignment: SkyPopoverAlignment;
  private _placement: SkyPopoverPlacement;

  constructor(
    private adapterService: SkyPopoverAdapterService,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    private windowRef: SkyWindowRefService
  ) { }

  public ngOnInit() {
    this.adapterService.hidePopover(this.popoverContainer);
    this.updateClassNames();
  }

  public ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  @HostListener('keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    if (key === 'escape' && this.isOpen) {
      event.stopPropagation();
      event.preventDefault();
      this.close();
      if (this.caller) {
        this.caller.nativeElement.focus();
      }
    }
  }

  @HostListener('document:focusin', ['$event'])
  public onFocusIn(event: KeyboardEvent) {
    const targetIsChild = (this.elementRef.nativeElement.contains(event.target));
    const targetIsCaller = (this.caller && this.caller.nativeElement === event.target);

    if (!targetIsChild && !targetIsCaller && this.isOpen && this.dismissOnBlur) {
      // The popover is open, is currently being operated by the user, and
      // has just lost keyboard focus. We should close it.
      this.close();
    }
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (!this.isMouseEnter && this.dismissOnBlur) {
      this.close();
    }
  }

  @HostListener('mouseenter')
  public onMouseEnter() {
    this.isMouseEnter = true;
  }

  @HostListener('mouseleave')
  public onMouseLeave() {
    this.isMouseEnter = false;
    if (this.isMarkedForCloseOnMouseLeave) {
      this.close();
      this.isMarkedForCloseOnMouseLeave = false;
    }
  }

  @HostListener('window:scroll')
  public onWindowScroll() {
    if (this.isOpen) {
      this.positionNextTo(this.caller, this.placement, this.alignment);
    }
  }

  public positionNextTo(
    caller: ElementRef,
    placement?: SkyPopoverPlacement,
    alignment?: SkyPopoverAlignment
  ) {
    if (!caller) {
      return;
    }

    if (placement !== this.placement) {
      this.updateClassNames(placement, alignment);
      this.changeDetector.markForCheck();
    }

    this.caller = caller;
    this.placement = placement;
    this.alignment = alignment;

    const elements = {
      popover: this.popoverContainer,
      popoverArrow: this.popoverArrow,
      caller: this.caller
    };

    // Let the styles render before gauging the dimensions.
    this.windowRef.getWindow().setTimeout(() => {
      const position = this.adapterService.getPopoverPosition(
        elements,
        this.placement,
        this.alignment
      );

      this.updateClassNames(position.placement, position.alignment);

      this.popoverTop = position.top;
      this.popoverLeft = position.left;
      this.arrowTop = position.arrowTop;
      this.arrowLeft = position.arrowLeft;
      this.animationState = 'visible';
      this.changeDetector.markForCheck();
    });
  }

  public resetPopover() {
    this.adapterService.clearConcreteDimensions(this.popoverContainer);
  }

  public close() {
    if (this.isOpen) {
      this.animationState = 'hidden';
      this.changeDetector.markForCheck();
    }
  }

  public onAnimationStart(event: AnimationEvent) {
    this.isOpen = false;

    if (event.fromState === 'void') {
      return;
    }

    if (event.toState === 'visible') {
      this.adapterService.showPopover(this.popoverContainer);
    }
  }

  public onAnimationDone(event: AnimationEvent) {
    if (event.fromState === 'void') {
      return;
    }

    if (event.toState === 'hidden') {
      this.isOpen = false;
      this.adapterService.hidePopover(this.popoverContainer);
      this.popoverClosed.emit(this);
    } else {
      this.isOpen = true;
      this.popoverOpened.emit(this);
    }
  }

  public markForCloseOnMouseLeave() {
    this.isMarkedForCloseOnMouseLeave = true;
  }

  public updateClassNames(placement?: SkyPopoverPlacement, alignment?: SkyPopoverAlignment) {
    this.classNames = [
      `sky-popover-alignment-${alignment || this.alignment}`,
      `sky-popover-placement-${placement || this.placement}`
    ];
  }
}
