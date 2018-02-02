import { SkyFlyoutAdapterService } from './flyout-adapter.service';
import {
  AnimationTransitionEvent,
  animate,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  state,
  style,
  transition,
  trigger,
  ViewChild,
  ComponentFactoryResolver,
  Injector,
  ReflectiveInjector,
  ViewContainerRef
} from '@angular/core';
import { SkyFlyoutInstance } from './flyout-instance';
import { SkyFlyoutConfigurationInterface as IConfig } from './flyout.interface';

const FLYOUT_OPEN_STATE: string = 'flyoutOpen';
const FLYOUT_CLOSED_STATE: string = 'flyoutClosed';

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
export class SkyFlyoutComponent {
  public flyoutState = FLYOUT_CLOSED_STATE;
  public isOpen = false;
  public displayedInstance: SkyFlyoutInstance;
  public closed: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('target', { read: ViewContainerRef })
  public target: ViewContainerRef;

  private config: IConfig = {};

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private flyoutAdapter: SkyFlyoutAdapterService,
    private changeDetector: ChangeDetectorRef
  ) { }

  public close() {
    this.isOpen = false;
    this.changeDetector.markForCheck();
  }

  public getAnimationState(): string {
    return (this.isOpen) ? FLYOUT_OPEN_STATE : FLYOUT_CLOSED_STATE;
  }

  public get ariaDescribedBy() {
    return this.config.ariaDescribedBy || undefined;
  }

  public get ariaLabelledBy() {
    return this.config.ariaLabelledBy || undefined;
  }

  public get ariaRole() {
    return this.config.ariaRole || undefined;
  }

  public open(flyoutInstance: SkyFlyoutInstance, component: any, config: IConfig) {
    this.isOpen = true;
    this.changeDetector.markForCheck();
    this.target.clear();
    this.config = config;

    const factory = this.resolver.resolveComponentFactory(component);

    const resolvedProviders = ReflectiveInjector.resolve(config.providers);
    const injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.injector);
    const componentRef = this.target.createComponent(factory, undefined, injector);

    flyoutInstance.componentInstance = componentRef.instance;

    // Emit the closed event on any previously opened flyout instance
    if (this.displayedInstance) {
      this.displayedInstance.closed.emit();
      this.displayedInstance.closed.complete();
    }

    this.displayedInstance = flyoutInstance;

    this.flyoutAdapter.adjustHeaderForHelp();
  }

  public animationDone(event: AnimationTransitionEvent) {
    if (event.fromState === FLYOUT_OPEN_STATE && event.toState === FLYOUT_CLOSED_STATE) {
      /* istanbul ignore else */
      /* sanity check */
      if (this.displayedInstance) {
        this.displayedInstance.closed.emit();
        this.displayedInstance.closed.complete();
      }
      this.closed.emit();
      this.closed.complete();
    }
  }
}
