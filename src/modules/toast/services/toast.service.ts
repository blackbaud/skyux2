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
  SkyToasterComponent
} from '../toaster.component';
import {
  SkyToastAdapterService
} from './toast-adapter.service';
import {
  SkyToastInstance,
  SkyToastConfig
} from '../types';

@Injectable()
export class SkyToastService implements OnDestroy {
  private host: ComponentRef<SkyToasterComponent>;

  private _toastInstances: SkyToastInstance[] = [];
  public toastInstances: BehaviorSubject<SkyToastInstance[]> = new BehaviorSubject([]);

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private adapter: SkyToastAdapterService
  ) {}

  public openMessage(message: string, config: SkyToastConfig = {}): SkyToastInstance {
    return this.open(config, message);
  }

  public openTemplatedMessage(customComponentType: Type<any>, config: SkyToastConfig = {}, providers?: Provider[]): SkyToastInstance {
    return this.open(config, undefined, customComponentType, providers);
  }

  public ngOnDestroy() {
    this.host = undefined;
    this._toastInstances.forEach(instance => {
      instance.close();
    });
    this.toastInstances.next([]);
    this.adapter.removeHostElement();
  }

  private open(config: SkyToastConfig, message?: string, customComponentType?: Type<any>, providers?: Provider[]): SkyToastInstance {
    if (!this.host) {
      this.host = this.createHostComponent();
    }

    let instance: SkyToastInstance = this.createToastInstance(config, message, customComponentType, providers);
    this._toastInstances.push(instance);
    this.toastInstances.next(this._toastInstances);

    return instance;
  }

  private removeFromQueue: Function = (instance: SkyToastInstance) => {
    this._toastInstances = this._toastInstances.filter(inst => inst !== instance);
    this.toastInstances.next(this._toastInstances);
  }

  private createToastInstance(
    config: SkyToastConfig,
    message?: string,
    customComponentType?: Type<any>,
    providers?: Provider[]
  ): SkyToastInstance {
    let newToast = new SkyToastInstance(
      message,
      customComponentType,
      config.toastType ? config.toastType : 'info',
      providers);
      newToast.isClosed.subscribe(() => { this.removeFromQueue(newToast); });
      return newToast;
  }

  private createHostComponent(): ComponentRef<SkyToasterComponent> {
    const componentRef = this.resolver
      .resolveComponentFactory(SkyToasterComponent)
      .create(this.injector);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];

    this.appRef.attachView(componentRef.hostView);
    this.adapter.appendToBody(domElem);

    return componentRef;
  }
}
