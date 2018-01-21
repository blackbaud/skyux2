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
  SkyPopoverPlacement,
  SkyPopoverPositionChange
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

  private isMarkedForCloseOnMouseLeave = false;
  private caller: ElementRef;
  private destroy = new Subject<boolean>();

  private _alignment: SkyPopoverAlignment;
  private _placement: SkyPopoverPlacement;

  constructor(
    public elementRef: ElementRef,
    private windowRef: SkyWindowRefService,
    private changeDetector: ChangeDetectorRef,
    private adapterService: SkyPopoverAdapterService
  ) {
    this.adapterService.positionChange
      .takeUntil(this.destroy)
      .subscribe((change: SkyPopoverPositionChange) => {
        this.updateClassNames(change.placement, change.alignment);
        this.windowRef.getWindow().setTimeout(() => {
          this.isOpen = true;
          this.changeDetector.markForCheck();
        });
      });
  }

  public ngOnInit() {
    console.log('popover component, ngOnInit()');
    this.adapterService.hidePopover(this.popoverContainer);
    this.updateClassNames(this.placement, this.alignment);
  }

  public ngOnDestroy() {
    console.log('popover component, ngOnDestroy()');
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  @HostListener('keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent): void {
    console.log('popover component, onKeyUp()');
    const key = event.key.toLowerCase();
    if (key === 'escape') {
      event.preventDefault();
      event.stopPropagation();
      this.close();
      this.focusCallerElement();
    }
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    console.log('popover component, onDocumentClick()');
    if (!this.isMouseEnter) {
      this.close();
    }
  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) {
    console.log('popover component, onClick()');
    event.stopPropagation();
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
    console.log('popover component, positionNextTo()');
    if (!caller) {
      return;
    }

    this.caller = caller;
    this.placement = placement;
    this.alignment = alignment;

    const elements = {
      popover: this.popoverContainer,
      popoverArrow: this.popoverArrow,
      caller: this.caller
    };

    this.adapterService.setPopoverPosition(
      elements,
      this.placement,
      this.alignment
    );
  }

  public close() {
    console.log('popover component, close()');
    if (this.isOpen) {
      this.isOpen = false;
      this.changeDetector.markForCheck();
    }
  }

  public onAnimationStart(event: AnimationEvent) {
    console.log('popover component, onAnimationStart()');
    if (event.fromState === 'void') {
      return;
    }

    if (event.toState === 'visible') {
      console.log('adapterService.showPopover()');
      this.adapterService.showPopover(this.popoverContainer);
      // this.windowRef.getWindow().setTimeout(() => {
        // this.popoverOpened.emit(this);
      // });
    }
  }

  public onAnimationDone(event: AnimationEvent) {
    console.log('popover component, onAnimationDone()');
    if (event.fromState === 'void') {
      return;
    }

    if (event.toState === 'hidden') {
      this.adapterService.hidePopover(this.popoverContainer);
      this.windowRef.getWindow().setTimeout(() => {
        this.popoverClosed.emit(this);
      });
    } else {
      console.log('popover component, visible?', getComputedStyle(this.popoverContainer.nativeElement).visibility);
      this.windowRef.getWindow().setTimeout(() => {
        this.popoverOpened.emit(this);
      });
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
      `sky-popover-alignment-${alignment || this.alignment}`,
      `sky-popover-placement-${placement || this.placement}`
    ];
  }

  private focusCallerElement() {
    this.caller.nativeElement.focus();
  }
}
