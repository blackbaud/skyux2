import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ElementRef,
  HostListener,
  Injector,
  OnDestroy,
  OnInit,
  ReflectiveInjector,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { SkyFlyoutAdapterService } from './flyout-adapter.service';
import { SkyFlyoutInstance } from './flyout-instance';

import {
  SkyFlyoutConfig,
  SkyFlyoutMessage,
  SkyFlyoutMessageType
} from './types';

const FLYOUT_OPEN_STATE = 'flyoutOpen';
const FLYOUT_CLOSED_STATE = 'flyoutClosed';

@Component({
  selector: 'sky-flyout',
  templateUrl: './flyout.component.html',
  styleUrls: ['./flyout.component.scss'],
  animations: [
    trigger('flyoutState', [
      state(FLYOUT_OPEN_STATE, style({ transform: 'translateX(0)' })),
      state(FLYOUT_CLOSED_STATE, style({ transform: 'translateX(100%)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(250)
      ]),
      transition(`* <=> *`, animate('250ms ease-in'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyFlyoutComponent implements OnDestroy, OnInit {
  public config: SkyFlyoutConfig;
  public flyoutState = FLYOUT_CLOSED_STATE;
  public isOpen = false;
  public isOpening = false;

  public flyoutWidth = 0;
  public isDragging = false;
  private xCoord = 0;

  public get messageStream(): Subject<SkyFlyoutMessage> {
    return this._messageStream;
  }

  @ViewChild('target', { read: ViewContainerRef })
  private target: ViewContainerRef;

  @ViewChild('flyoutHeader')
  private flyoutHeader: ElementRef;

  private flyoutInstance: SkyFlyoutInstance<any>;
  private destroy = new Subject<boolean>();

  private _messageStream = new Subject<SkyFlyoutMessage>();

  constructor(
    private adapter: SkyFlyoutAdapterService,
    private changeDetector: ChangeDetectorRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) {
    // All commands flow through the message stream.
    this.messageStream
      .takeUntil(this.destroy)
      .subscribe((message: SkyFlyoutMessage) => {
        this.handleIncomingMessages(message);
      });
  }

  public ngOnInit() {
    this.adapter.adjustHeaderForHelp(this.flyoutHeader);
  }

  public ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  public onCloseButtonClick() {
    this.messageStream.next({
      type: SkyFlyoutMessageType.Close
    });
  }

  public attach<T>(component: Type<T>, config: SkyFlyoutConfig): SkyFlyoutInstance<T> {
    this.cleanTemplate();

    // Emit the closed event on any previously opened flyout instance
    if (this.flyoutInstance) {
      this.notifyClosed();
    }

    this.config = Object.assign({ providers: [] }, config);
    this.config.defaultWidth = this.config.defaultWidth || 500;
    this.config.minWidth = this.config.minWidth || 320;
    this.config.maxWidth = this.config.maxWidth || this.config.defaultWidth;

    const factory = this.resolver.resolveComponentFactory(component);
    const providers = ReflectiveInjector.resolve(this.config.providers);
    const injector = ReflectiveInjector.fromResolvedProviders(providers, this.injector);
    const componentRef = this.target.createComponent(factory, undefined, injector);

    this.flyoutInstance = this.createFlyoutInstance<T>(componentRef.instance);

    // Open the flyout immediately.
    this.messageStream.next({
      type: SkyFlyoutMessageType.Open
    });

    this.flyoutWidth = this.config.defaultWidth;

    return this.flyoutInstance;
  }

  public getAnimationState(): string {
    return (this.isOpening) ? FLYOUT_OPEN_STATE : FLYOUT_CLOSED_STATE;
  }

  public animationDone(event: AnimationEvent) {
    if (event.toState === FLYOUT_OPEN_STATE) {
      this.isOpen = true;
    }

    if (event.toState === FLYOUT_CLOSED_STATE) {
      this.isOpen = false;
      this.notifyClosed();
      this.cleanTemplate();
    }
  }

  public onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.xCoord = event.clientX;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(event: MouseEvent) {
    if (!this.isDragging) {
      return;
    }

    console.log('xcoord?', event.clientX, this.xCoord);
    const offsetX = event.clientX - this.xCoord;
    let width = this.flyoutWidth;

    width -= offsetX;

    if (width < this.config.minWidth || width > this.config.maxWidth) {
      return;
    }

    this.flyoutWidth = width;
    this.xCoord = event.clientX;
  }

  @HostListener('document:mouseup', ['$event'])
  public onHandleRelease(event: MouseEvent) {
    this.isDragging = false;
  }

  private open() {
    if (!this.isOpen) {
      this.isOpen = false;
      this.isOpening = true;
    }

    this.changeDetector.markForCheck();
  }

  private close() {
    this.isOpen = true;
    this.isOpening = false;
    this.changeDetector.markForCheck();
  }

  private createFlyoutInstance<T>(component: T): SkyFlyoutInstance<T> {
    const instance = new SkyFlyoutInstance<T>();

    instance.componentInstance = component;
    instance.hostController
      .takeUntil(this.destroy)
      .subscribe((message: SkyFlyoutMessage) => {
        this.messageStream.next(message);
      });

    return instance;
  }

  private handleIncomingMessages(message: SkyFlyoutMessage) {
    /* tslint:disable-next-line:switch-default */
    switch (message.type) {
      case SkyFlyoutMessageType.Open:
      this.open();
      break;

      case SkyFlyoutMessageType.Close:
      this.close();
      break;
    }
  }

  private notifyClosed() {
    this.flyoutInstance.closed.emit();
    this.flyoutInstance.closed.complete();
  }

  private cleanTemplate() {
    this.target.clear();
  }
}
