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
      transition(`* <=> *`, animate('500ms linear'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyToastComponent implements OnInit, OnDestroy {
  @Input('message')
  public message: SkyToastInstance;

  @ViewChild('skytoastcustomtemplate', { read: ViewContainerRef })
  private customToastHost: ViewContainerRef;

  private customComponent: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  public getAnimationState(): string {
    return !this.message.isClosing.isStopped ? TOAST_OPEN_STATE : TOAST_CLOSED_STATE;
  }

  public ngOnInit() {
    if (this.message.customComponentType) {
      this.loadComponent();
    }
  }

  public ngOnDestroy() {
    if (this.customComponent) {
      this.customComponent.destroy();
    }
  }

  public animationDone(event: AnimationEvent) {
    this.message.isClosed.emit();
  }

  private loadComponent() {
    this.customToastHost.clear();
    this.message.providers.push({
      provide: SkyToastInstance,
      useValue: this.message
    });

    let componentFactory = this.resolver.resolveComponentFactory(this.message.customComponentType);
    let providers = ReflectiveInjector.resolve(this.message.providers || []);

    let injector = ReflectiveInjector.fromResolvedProviders(providers, this.injector);

    this.customComponent = this.customToastHost.createComponent(componentFactory, undefined, injector);
    this.customComponent.instance.message = this.message;
  }
}
