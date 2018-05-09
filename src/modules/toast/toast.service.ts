// #region imports
import {
  ApplicationRef,
  ComponentRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
  OnDestroy,
  Provider
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';

import {
  Observable
} from 'rxjs/Observable';

import {
  SkyToast
} from './toast';

import {
  SkyToastConfig
} from './types';

import {
  SkyToastAdapterService
} from './toast-adapter.service';

import {
  SkyToastBodyComponent
} from './toast-body.component';

import {
  SkyToastInstance
} from './toast-instance';

import {
  SkyToastBodyContext
} from './toast-body-context';

import {
  SkyToasterComponent
} from './toaster.component';
// #endregion

@Injectable()
export class SkyToastService implements OnDestroy {
  public get toastStream(): Observable<SkyToast[]> {
    return this._toastStream;
  }

  private host: ComponentRef<SkyToasterComponent>;
  private toasts: SkyToast[] = [];

  private _toastStream = new BehaviorSubject<SkyToast[]>([]);

  constructor(
    private appRef: ApplicationRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private adapter: SkyToastAdapterService
  ) { }

  public ngOnDestroy() {
    this.host = undefined;
    this.toasts.forEach(toast => toast.instance.close());
    this.toasts = [];
    this._toastStream.next(this.toasts);
    this._toastStream.complete();
    this.adapter.removeHostElement();
  }

  public openMessage(
    message: string,
    config?: SkyToastConfig
  ): SkyToastInstance {
    const context = new SkyToastBodyContext();
    context.message = message;

    const providers = [{
      provide: SkyToastBodyContext,
      useValue: context
    }];

    return this.openComponent(SkyToastBodyComponent, config, providers);
  }

  public openComponent(
    component: any,
    config?: SkyToastConfig,
    providers: Provider[] = []
  ): SkyToastInstance {
    if (!this.host) {
      this.host = this.createHostComponent();
    }

    const instance = new SkyToastInstance();

    providers.push({
      provide: SkyToastInstance,
      useValue: instance
    });

    const toast = new SkyToast(component, providers, config);
    toast.instance = instance;
    this.addToast(toast);

    return instance;
  }

  private addToast(toast: SkyToast): void {
    this.toasts.push(toast);
    this._toastStream.next(this.toasts);
    toast.instance.closed.subscribe(() => {
      this.removeToast(toast);
    });
  }

  private removeToast(toast: SkyToast): void {
    this.toasts = this.toasts.filter(t => t !== toast);
    this._toastStream.next(this.toasts);
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
