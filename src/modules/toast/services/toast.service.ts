import {
  Injectable,
  ComponentRef,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  EmbeddedViewRef,
  OnDestroy,
  Type,
  Provider
} from '@angular/core';
import {
  BehaviorSubject
} from 'rxjs';
import {
  SkyToastContainerComponent
} from '../toast-container.component';
import {
  SkyToastAdapterService
} from './toast-adapter.service';
import {
  SkyToastInstance,
  SkyToastConfig,
  SkyToastType
} from '../types';

@Injectable()
export class SkyToastService implements OnDestroy {
  private host: ComponentRef<SkyToastContainerComponent>;

  private _messages: SkyToastInstance[] = [];
  public messages: BehaviorSubject<SkyToastInstance[]> = new BehaviorSubject([]);

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private adapter: SkyToastAdapterService
  ) {}

  public openMessage(message: string, config: SkyToastConfig = {}) {
    config.message = message;
    config.customComponentType = undefined;
    return this.open(config);
  }

  public openTemplatedMessage(customComponentType: Type<any>, config: SkyToastConfig = {}, providers?: Provider[]) {
    config.customComponentType = customComponentType;
    config.providers = providers || config.providers;
    config.message = undefined;
    return this.open(config);
  }

  public open(config: SkyToastConfig) {
    if (!this.host) {
      this.host = this.createHostComponent();
    }

    let message: SkyToastInstance = this.createMessage(config);
    this._messages.push(message);
    this.messages.next(this._messages);

    return message;
  }

  public ngOnDestroy() {
    this.host = undefined;
    this._messages.forEach(message => {
      message.close();
    });
    this.messages.next([]);
    this.adapter.removeHostElement();
  }

  private removeFromQueue: Function = (message: SkyToastInstance) => {
    this._messages = this._messages.filter(msg => msg !== message);
    this.messages.next(this._messages);
  }

  private createMessage(config: SkyToastConfig): SkyToastInstance {
    if (!config.message && !config.customComponentType) {
      throw 'You must provide either a message or a customComponentType.';
    }
    if (config.message && config.customComponentType) {
      throw 'You must not provide both a message and a customComponentType.';
    }

    let toastType: string = 'info';
    switch (config.toastType) {
      case SkyToastType.Success:
        toastType = 'success';
        break;
      case SkyToastType.Warning:
        toastType = 'warning';
        break;
      case SkyToastType.Danger:
        toastType = 'danger';
        break;
      default:
        toastType = 'info';
        break;
    }

    return new SkyToastInstance(config.message, config.customComponentType, toastType, config.providers, this.removeFromQueue);
  }

  private createHostComponent(): ComponentRef<SkyToastContainerComponent> {
    const componentRef = this.resolver
      .resolveComponentFactory(SkyToastContainerComponent)
      .create(this.injector);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];

    this.appRef.attachView(componentRef.hostView);
    this.adapter.appendToBody(domElem);

    return componentRef;
  }
}
