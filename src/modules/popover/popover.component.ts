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

import { SkyWindowRefService } from '../window';

import {
  SkyPopoverAlignment,
  SkyPopoverMessageType,
  SkyPopoverMessage,
  SkyPopoverPlacement,
  SkyPopoverPlacementChange
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

  @Input()
  public messageStream = new Subject<SkyPopoverMessage>();

  @Output()
  public popoverOpened = new EventEmitter<SkyPopoverComponent>();

  @Output()
  public popoverClosed = new EventEmitter<SkyPopoverComponent>();

  @ViewChild('popoverContainer')
  public popoverContainer: ElementRef;

  @ViewChild('popoverArrow')
  public popoverArrow: ElementRef;

  public isOpen = false;
  public placementClassName: string;
  public isMouseEnter = false;
  public classNames: string[] = [];

  private isMarkedForCloseOnMouseLeave = false;
  private destroy = new Subject<boolean>();

  private _alignment: SkyPopoverAlignment;
  private _placement: SkyPopoverPlacement;

  constructor(
    private windowRef: SkyWindowRefService,
    private changeDetector: ChangeDetectorRef,
    private adapterService: SkyPopoverAdapterService
  ) {
    this.adapterService.placementChanges
      .takeUntil(this.destroy)
      .subscribe((change: SkyPopoverPlacementChange) => {
        if (change.placement) {
          this.updateClassNames(
            change.placement,
            this.alignment
          );
        }
      });
  }

  public ngOnInit() {
    this.updateClassNames(this.placement, this.alignment);

    this.messageStream.takeUntil(this.destroy).subscribe((message: SkyPopoverMessage) => {
      this.handleIncomingMessages(message);
    });
  }

  public ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
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

  public positionNextTo(
    caller: ElementRef,
    placement: SkyPopoverPlacement,
    alignment?: SkyPopoverAlignment
  ) {
    if (!caller) {
      return;
    }

    const elements = {
      popover: this.popoverContainer,
      popoverArrow: this.popoverArrow,
      caller
    };

    // Allow the caller to overwrite the component's placement and alignment values.
    // If none are provided, use the component's configuration.
    placement = placement || this.placement;
    alignment = alignment || this.alignment;
    this.updateClassNames(placement, alignment);

    // Wait for a tick to allow placement styles to render.
    // (The styles affect the element dimensions.)
    this.windowRef.getWindow().setTimeout(() => {
      this.adapterService.setPopoverPosition(elements, placement, alignment);
      this.isOpen = true;
      this.changeDetector.markForCheck();
    });
  }

  public close() {
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

  private updateClassNames(placement: SkyPopoverPlacement, alignment: SkyPopoverAlignment) {
    this.classNames = [
      `sky-popover-alignment-${alignment}`,
      `sky-popover-placement-${placement}`
    ];
  }

  private handleIncomingMessages(message: SkyPopoverMessage) {
    if (message.type === SkyPopoverMessageType.Close) {
      this.close();
      return;
    }

    if (message.type === SkyPopoverMessageType.Open) {
      this.positionNextTo(
        message.elementRef,
        message.placement,
        message.alignment
      );
    }
  }
}
