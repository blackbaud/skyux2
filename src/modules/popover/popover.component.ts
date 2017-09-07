import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  Renderer2,
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
  ]
})
export class SkyPopoverComponent implements OnDestroy {
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

  private lastCaller: ElementRef;
  private isMouseEnter = false;
  private readonly defaultPlacement: SkyPopoverPlacement = 'above';
  private placementSubscription: Subscription;

  constructor(
    private renderer: Renderer2,
    private adapterService: SkyPopoverAdapterService,
    private windowRef: SkyWindowRefService
  ) {
    this.placement = this.defaultPlacement;
    this.popoverOpened = new EventEmitter<SkyPopoverComponent>();
    this.popoverClosed = new EventEmitter<SkyPopoverComponent>();
    this.placementSubscription = this.adapterService.placementChanges
      .subscribe((placement: SkyPopoverPlacement) => {
        this.placement = placement;
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

  public positionNextTo(caller: ElementRef, placement: SkyPopoverPlacement) {
    const tick = this.windowRef.getWindow().setTimeout;

    if (!caller) {
      return;
    }

    this.lastCaller = caller;
    this.placement = placement || this.defaultPlacement;

    // Wait for a tick to allow placement styles to render.
    // (The styles affect the element dimensions.)
    tick(() => {
      const elements = {
        popover: this.popoverContainer,
        popoverArrow: this.popoverArrow,
        caller: this.lastCaller
      };

      this.adapterService.setPopoverPosition(elements, this.placement);
      this.isOpen = true;
    });
  }

  public close() {
    this.lastCaller = undefined;
    this.isOpen = false;
  }

  public getPlacementClassName(): string {
    return `sky-popover-placement-${this.placement}`;
  }

  public onAnimationStart(event: AnimationEvent) {
    if (event.fromState === 'void') {
      return;
    }

    if (event.toState === 'visible') {
      this.renderer.removeClass(this.popoverContainer.nativeElement, 'hidden');
    }
  }

  public onAnimationDone(event: AnimationEvent) {
    if (event.fromState === 'void') {
      return;
    }

    if (event.toState === 'hidden') {
      this.renderer.addClass(this.popoverContainer.nativeElement, 'hidden');
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
}
