import {
  animate,
  Component,
  state,
  style,
  transition,
  trigger,
  ViewChild,
  ComponentFactoryResolver,
  Injector,
  ReflectiveInjector,
  ViewContainerRef,
  HostListener,
  EventEmitter
} from '@angular/core';
import { SkyFlyoutInstance } from './flyout-instance';
import { SkyFlyoutConfigurationInterface as IConfig } from './flyout.interface';

@Component({
  selector: 'sky-flyout',
  templateUrl: './flyout.component.html',
  styleUrls: ['./flyout.component.scss'],
  animations: [
    trigger('flyoutState', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(100%)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(250)
      ]),
      transition('* => void', [
        animate(250, style({ transform: 'translateX(0)' }))
      ]),
      transition('in => out', animate('250ms ease-in')),
      transition('out => in', animate('250ms ease-in'))
    ])
  ]
})
export class SkyFlyoutComponent {
  public flyoutState = 'in';
  public isOpen = false;
  public displayedInstance: SkyFlyoutInstance;
  public closed: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('target', { read: ViewContainerRef })
  public target: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  public toggleState() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:keyup', ['$event'])
  public closeOnEscapeKeyPressed(event: KeyboardEvent): void {
    if (this.isOpen && event.which === 27) {
      this.close();
    }
  }
  public close() {
    this.isOpen = false;
    /* istanbul ignore else */
    /* sanity check */
    if (this.displayedInstance) {
      this.displayedInstance.close();
    }
    this.closed.emit();
    this.closed.complete();
  }

  public getAnimationState(): string {
    return (this.isOpen) ? 'in' : 'out';
  }

  public open(flyoutInstance: SkyFlyoutInstance, component: any, config?: IConfig) {
    this.isOpen = true;
    this.target.clear();

    let factory = this.resolver.resolveComponentFactory(component);

    let providers = config.providers /* istanbul ignore next */ || [];
    let resolvedProviders = ReflectiveInjector.resolve(providers);
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.injector);
    let componentRef = this.target.createComponent(factory, undefined, injector);

    flyoutInstance.componentInstance = componentRef.instance;
    this.displayedInstance = flyoutInstance;
  }
}
