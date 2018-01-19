import { SkyFlyoutAdapterService } from './flyout-adapter.service';
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
  EventEmitter,
  AfterViewInit,
  ElementRef
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
export class SkyFlyoutComponent implements AfterViewInit {
  public flyoutState = 'out';
  public isOpen = false;
  public displayedInstance: SkyFlyoutInstance;
  public closed: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('target', { read: ViewContainerRef })
  public target: ViewContainerRef;

  private config: IConfig = {};

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private elRef: ElementRef,
    private flyoutAdapter: SkyFlyoutAdapterService
  ) { }

  public ngAfterViewInit() {
    this.flyoutAdapter.setFlyoutFocus(this.elRef);
  }

  @HostListener('document:keyup', ['$event'])
  public closeOnEscapeKeyPressed(event: KeyboardEvent): void {
    if (this.isOpen && event.which === 27) {
      this.close();
    }
  }

  public close() {
    this.isOpen = false;
  }

  public getAnimationState(): string {
    return (this.isOpen) ? 'in' : 'out';
  }

  public get ariaDescribedBy() {
    return this.config.ariaDescribedBy || "";
  }

  public get ariaLabelledBy() {
    return this.config.ariaLabelledBy || "";
  }

  public get ariaRole() {
    return this.config.ariaRole || "";
  }

  public open(flyoutInstance: SkyFlyoutInstance, component: any, config?: IConfig) {
    this.isOpen = true;
    this.target.clear();
    this.config = config || {};

    let factory = this.resolver.resolveComponentFactory(component);

    let providers = config.providers /* istanbul ignore next */ || [];
    let resolvedProviders = ReflectiveInjector.resolve(providers);
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.injector);
    let componentRef = this.target.createComponent(factory, undefined, injector);

    flyoutInstance.componentInstance = componentRef.instance;
    this.displayedInstance = flyoutInstance;

    this.flyoutAdapter.adjustHeaderForHelp();
  }

  public animationDone(event: any) {
    if (!this.isOpen) {
      /* istanbul ignore else */
      /* sanity check */
      if (this.displayedInstance) {
        this.displayedInstance.close();
      }
      this.closed.emit();
      this.closed.complete();
    }
  }
}
