import { Injectable, ComponentRef, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { SkyToastComponent } from './toast.component';
import { SkyToastAdapterService } from './toast-adapter.service';
import { SkyToastMessage, ToastConfig, SkyToastType } from './types';

@Injectable()
export class SkyToastService {
  private host: ComponentRef<SkyToastComponent>;

  private _messages: SkyToastMessage[] = [];
  private _messageList: BehaviorSubject<SkyToastMessage[]> = new BehaviorSubject([]);
  public get getMessages(): Observable<SkyToastMessage[]> { return this._messageList.asObservable() }

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private adapter: SkyToastAdapterService) {}

  public openMessage(message: string, config: ToastConfig = {}) {
    config.message = message;
    return this.open(config);
  }

  public open(config: ToastConfig) {
    if (!this.host) {
      this.host = this.createHostComponent();
    }

    let message: SkyToastMessage = this.createMessage(config);
    this._messages.push(message);
    this._messageList.next(this._messages);

    return message;
  }

  private removeFromQueue: Function = (message: SkyToastMessage) => {
    if (this._messages.length == 0) {
      throw 'The supplied message is not active.';
    }
    let foundMessage: SkyToastMessage = this._messages.reduce((prev, cur) => prev === message ? prev : cur);
    if (!foundMessage) {
      throw 'The supplied message is not active.';
    }

    this._messages = this._messages.filter(msg => msg !== message);
    this._messageList.next(this._messages);
  };

  private createMessage(config: ToastConfig): SkyToastMessage {
    if (!config.message) {
      throw 'A message must be provided.';
    }

    let timeout: number;
    if (!config.disableTimeout) {
      timeout = config.timeout || 10000;
    }

    let toastType: string = 'info';
    switch(config.toastType) {
      case SkyToastType.Success:
        toastType = 'success';
        break;
      case SkyToastType.Warning:
        toastType = 'warning';
        break;
      case SkyToastType.Danger:
        toastType = 'danger';
        break;
    }

    return new SkyToastMessage(config.message, toastType, this.removeFromQueue, timeout);
  }

  private createHostComponent(): ComponentRef<SkyToastComponent> {
    const componentRef = this.resolver
      .resolveComponentFactory(SkyToastComponent)
      .create(this.injector);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];

    this.appRef.attachView(componentRef.hostView);
    this.adapter.appendToBody(domElem);

    return componentRef;
  }
}
