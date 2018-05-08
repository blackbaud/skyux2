import {
  Component,
  Input,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  OnDestroy,
  ViewContainerRef,
  ReflectiveInjector,
  ComponentRef,
  Injector,
  trigger,
  state,
  style,
  animate,
  transition,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  SkyToastInstance
} from '../types';

const TOAST_OPEN_STATE = 'toastOpen';
const TOAST_CLOSED_STATE = 'toastClosed';

@Component({
  selector: 'sky-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastState', [
      state(TOAST_OPEN_STATE, style({ opacity: 1 })),
      state(TOAST_CLOSED_STATE, style({ opacity: 0 })),
      transition(`toastOpen => toastClosed`, animate('500ms linear'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyToastComponent implements OnInit, OnDestroy {
  @Input('instance')
  public instance: SkyToastInstance;

  @ViewChild('skytoastcustomtemplate', { read: ViewContainerRef })
  private toastHost: ViewContainerRef;

  private customComponent: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  public getAnimationState(): string {
    return this.instance.isOpen ? TOAST_OPEN_STATE : TOAST_CLOSED_STATE;
  }

  public ngOnInit() {
    if (this.instance.customComponentType) {
      this.loadComponent();
    }
  }

  public ngOnDestroy() {
    if (this.customComponent) {
      this.customComponent.destroy();
    }
  }

  public animationDone(event: AnimationEvent) {
    if (!this.instance.isOpen) {
      this.instance.isClosed.emit();
      this.instance.isClosed.complete();
    }
  }

  private loadComponent() {
    this.toastHost.clear();
    this.instance.providers.push({
      provide: SkyToastInstance,
      useValue: this.instance
    });

    const componentFactory = this.resolver.resolveComponentFactory(this.instance.customComponentType);
    const providers = ReflectiveInjector.resolve(this.instance.providers || []);

    const injector = ReflectiveInjector.fromResolvedProviders(providers, this.injector);

    this.customComponent = this.toastHost.createComponent(componentFactory, undefined, injector);
  }
}
