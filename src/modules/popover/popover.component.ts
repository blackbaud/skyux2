import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  OnDestroy,
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

import { Subscription } from 'rxjs/Subscription';

import { SkyWindowRefService } from '../window';
import { SkyPopoverPlacement, SkyPopoverAdapterService } from './index';

@Component({
  selector: 'sky-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  providers: [SkyPopoverAdapterService],
  animations: [
    trigger('popoverState', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => visible', animate('150ms')),
      transition('visible => hidden', animate('150ms'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyPopoverComponent implements OnInit, OnDestroy {
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

  private lastCaller: ElementRef;
  private isMouseEnter = false;
  private readonly placementDefault: SkyPopoverPlacement = 'above';
  private placementSubscription: Subscription;

  constructor(
    private windowRef: SkyWindowRefService,
    private changeDetector: ChangeDetectorRef,
    private adapterService: SkyPopoverAdapterService
  ) {
    this.placement = this.placementDefault;
    this.popoverOpened = new EventEmitter<SkyPopoverComponent>();
    this.popoverClosed = new EventEmitter<SkyPopoverComponent>();
    this.placementSubscription = this.adapterService.placementChanges
      .subscribe((placement: SkyPopoverPlacement) => {
        this.placement = placement;
        this.placementClassName = this.getPlacementClassName();
      });
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
  }

  public ngOnInit(): void {
    this.placementClassName = this.getPlacementClassName();
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

    // Wait for a tick to allow placement styles to render.
    // (The styles affect the element dimensions.)
    this.windowRef.getWindow().setTimeout(() => {
      this.adapterService.setPopoverPosition(elements, placement || this.placementDefault);
      this.isOpen = true;
      this.changeDetector.markForCheck();
    });
  }

  public close() {
    this.lastCaller = undefined;
    this.isOpen = false;
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

  public ngOnDestroy(): void {
    this.placementSubscription.unsubscribe();
  }

  private getPlacementClassName(): string {
    return `sky-popover-placement-${this.placement}`;
  }
}
