import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export enum ToastType {
  Info,
  Success,
  Warning,
  Danger
}

export class Message {
  public timeout?: NodeJS.Timer;
  private _isClosed: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public get isClosed(): Observable<boolean> { return this._isClosed.asObservable() }

  constructor(public message: string, public toastType: string, private removeFromQueue: Function, timeout?: number) {
    if (timeout) {
      this.timeout = setTimeout(this.close, timeout);
    }
  }

  public close = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.removeFromQueue(this);
    this._isClosed.next(true);
  }
}
export interface ToastConfig {
  message?: string,
  disableTimeout?: boolean,
  timeout?: number,
  toastType?: ToastType
}

@Injectable()
export class SkyToastService {

  private _messages: Message[] = [];
  private _messageList: BehaviorSubject<Message[]> = new BehaviorSubject([]);
  public get getMessages(): Observable<Message[]> { return this._messageList.asObservable() }

  constructor() {}

  public openMessage(message: string, config: ToastConfig = {}) {
    config.message = message;
    return this.open(config);
  }

  public open(config: ToastConfig) {
    let message: Message = this.createMessage(config);

    this._messages.push(message);
    this._messageList.next(this._messages);
  }

  private removeFromQueue: Function = (message: Message) => {
    if (this._messages.length == 0) {
      throw 'The supplied message is not active.';
    }
    let foundMessage: Message = this._messages.reduce((prev, cur) => prev === message ? prev : cur);
    if (!foundMessage) {
      throw 'The supplied message is not active.';
    }

    this._messages = this._messages.filter(message => message !== message);
    this._messageList.next(this._messages);
  };

  private createMessage(config: ToastConfig): Message {
    if (!config.message) {
      throw 'A message must be provided.';
    }

    let timeout: number;
    if (!config.disableTimeout) {
      timeout = config.timeout || 10000;
    }

    let toastType: string = 'info';
    switch(config.toastType) {
      case ToastType.Success:
        toastType = 'success';
        break;
      case ToastType.Warning:
        toastType = 'warning';
        break;
      case ToastType.Danger:
        toastType = 'danger';
        break;
    }

    return new Message(config.message, toastType, this.removeFromQueue, timeout);
  }
}
