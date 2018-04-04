import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export enum ToastType {
  Info,
  Success,
  Warning,
  Danger
}

export interface Message {
  id: string,
  message: string,
  toastType: string,
  timeout?: NodeJS.Timer
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
  public get messageList(): Observable<Message[]> { return this._messageList.asObservable() }

  constructor() {}

  public openMessage(message: string, config?: ToastConfig) {
    config.message = message;
    return this.open(config);
  }

  public open(config: ToastConfig) {
    let message: Message = this.createMessage(config);

    this._messages.push(message);
    this._messageList.next(this._messages);
  }

  public close(messageId: string) {
    let message: Message = this._messages.reduce((prev, cur) => prev.id === messageId ? prev : cur);
    if (!message) {
      throw 'SkyToast message not found.';
    }

    if (message.timeout) {
      clearTimeout(message.timeout);
    }
    this._messages.map(message => message.id !== messageId);
    this._messageList.next(this._messages);
  }

  private createMessage(config: ToastConfig): Message {
    if (!config.message) {
      throw 'A message must be provided.';
    }
    let message: Message = {
      message: config.message,
      toastType: 'info',
      id: '_' + Math.random().toString(36).substr(2, 9)
    };

    if (!config.disableTimeout) {
      message.timeout = setTimeout(() => {
        this.close(message.id);
      }, config.timeout || 10000);
    }

    switch(config.toastType) {
      case ToastType.Success:
        message.toastType = 'success';
        break;
      case ToastType.Warning:
        message.toastType = 'warning';
        break;
      case ToastType.Danger:
        message.toastType = 'danger';
        break;
    }

    return message;
  }
}
