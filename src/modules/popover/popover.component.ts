import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
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

import { SkyWindowRefService } from '../window';
import { SkyPopoverPlacement, SkyPopoverAdapterService } from './index';

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
export class SkyPopoverComponent {
  @Input()
  public popoverTitle: string;

  @Input()
  public placement: SkyPopoverPlacement;

  @Output()
  public popoverOpened: EventEmitter<SkyPopoverComponent>;

  @Output()
  public popoverClosed: EventEmitter<SkyPopoverComponent>;

  @ViewChild('popoverContainer')
  public popoverContainer: ElementRef;

  @ViewChild('popoverArrow')
  public popoverArrow: ElementRef;
  public isOpen = false;
  public placementClassName: string;
  public isMouseEnter = false;

  private isMarkedForCloseOnMouseLeave = false;
  private lastCaller: ElementRef;
  private readonly placementDefault: SkyPopoverPlacement = 'above';

  constructor(
    private windowRef: SkyWindowRefService,
    private changeDetector: ChangeDetectorRef,
    private adapterService: SkyPopoverAdapterService
  ) {
    this.placement = this.placementDefault;
    this.popoverOpened = new EventEmitter<SkyPopoverComponent>();
    this.popoverClosed = new EventEmitter<SkyPopoverComponent>();
  }

  @HostListener('window:resize')
  public adjustOnResize() {
    this.positionNextTo(this.lastCaller, this.placement);
  }

  @HostListener('document:keyup', ['$event'])
  public closeOnEscapeKeyPressed(event: KeyboardEvent): void {
    if (this.isOpen && event.which === 27) {
      this.close();
    }
  }

  @HostListener('document:click', ['$event'])
  public closeOnDocumentClick(event: MouseEvent): void {
    if (this.isOpen && !this.isMouseEnter) {
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

  public positionNextTo(caller: ElementRef, placement: SkyPopoverPlacement) {
    if (!caller) {
      return;
    }

    this.lastCaller = caller;

    const elements = {
      popover: this.popoverContainer,
      popoverArrow: this.popoverArrow,
      caller: this.lastCaller
    };

    this.placement = placement || this.placementDefault;
    this.changeDetector.markForCheck();

    // Wait for a tick to allow placement styles to render.
    // (The styles affect the element dimensions.)
    this.windowRef.getWindow().setTimeout(() => {
      this.adapterService.setPopoverPosition(elements, this.placement);
      this.isOpen = true;
      this.changeDetector.markForCheck();
    });
  }

  public close() {
    this.lastCaller = undefined;
    this.isOpen = false;
    this.changeDetector.markForCheck();
  }

  public onAnimationStart(event: AnimationEvent) {
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
      this.adapterService.hidePopover(this.popoverContainer);
      this.popoverClosed.emit(this);
    } else {
      this.popoverOpened.emit(this);
    }
  }

  public getAnimationState(): string {
    return (this.isOpen) ? 'visible' : 'hidden';
  }

  public markForCloseOnMouseLeave() {
    this.isMarkedForCloseOnMouseLeave = true;
  }
}
