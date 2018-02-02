import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  OnDestroy,
  ReflectiveInjector,
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
      transition('* => void', [
        animate(250, style({ transform: 'translateX(0)' }))
      ]),
      transition(`${FLYOUT_OPEN_STATE} => ${FLYOUT_CLOSED_STATE}`, animate('250ms ease-in')),
      transition(`${FLYOUT_CLOSED_STATE} => ${FLYOUT_OPEN_STATE}`, animate('250ms ease-in'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyFlyoutComponent implements OnDestroy {
  public config: SkyFlyoutConfig;
  public flyoutState = FLYOUT_CLOSED_STATE;
  public isOpen = false;
  public isOpening = false;

  @ViewChild('target', { read: ViewContainerRef })
  private target: ViewContainerRef;

  @ViewChild('header')
  private header: ElementRef;

  private instance: SkyFlyoutInstance;
  private destroy = new Subject<boolean>();

  constructor(
    private adapter: SkyFlyoutAdapterService,
    private changeDetector: ChangeDetectorRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) { }

  public ngOnDestroy() {
    this.destroy.next(false);
    this.destroy.unsubscribe();
  }

  public getAnimationState(): string {
    return (this.isOpening) ? FLYOUT_OPEN_STATE : FLYOUT_CLOSED_STATE;
  }

  public attach(component: any, config: SkyFlyoutConfig) {
    this.isOpen = false;
    this.target.clear();
    this.config = Object.assign({ providers: [] }, config);

    // Emit the closed event on any previously opened flyout instance
    if (this.instance) {
      this.instance.closed.emit();
      this.instance.closed.complete();
      this.instance.opened.complete();
    }

    const factory = this.resolver.resolveComponentFactory(component);
    const providers = ReflectiveInjector.resolve(this.config.providers);
    const injector = ReflectiveInjector.fromResolvedProviders(providers, this.injector);
    const componentRef = this.target.createComponent(factory, undefined, injector);

    console.log('header?', this.header.nativeElement);
    this.adapter.adjustHeaderForHelp(this.header.nativeElement);

    this.instance = new SkyFlyoutInstance();
    this.instance.componentInstance = componentRef.instance;
    this.instance.messageStream
      .takeUntil(this.destroy)
      .subscribe((message: SkyFlyoutMessage) => {
        this.handleIncomingMessages(message);
      });

    return this.instance;
  }

  public open() {
    this.isOpening = true;
    this.changeDetector.markForCheck();
  }

  public close() {
    this.isOpening = false;
    this.changeDetector.markForCheck();
  }

  public animationDone(event: AnimationEvent) {
    if (event.toState === FLYOUT_OPEN_STATE) {
      this.isOpen = true;
      this.instance.opened.emit();
    }

    if (event.toState === FLYOUT_CLOSED_STATE) {
      this.isOpen = false;
      this.instance.closed.emit();
    }
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
}
