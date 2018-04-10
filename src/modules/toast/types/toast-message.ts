import { SkyToastMessageType } from './toast-message-type';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export class SkyToastMessage {
  public timeout?: NodeJS.Timer;
  private _isClosed: BehaviorSubject<boolean>;
  private _isClosing: BehaviorSubject<boolean>;
  public isClosed: Observable<boolean>;
  public isClosing: Observable<boolean>;

  constructor(public message: string, public toastType: string, private removeFromQueue: Function, timeout?: number) {
    this._isClosed = new BehaviorSubject(false);
    this._isClosing = new BehaviorSubject(false);
    this.isClosed = this._isClosed.asObservable();
    this.isClosing = this._isClosing.asObservable();
    if (timeout) {
      this.timeout = setTimeout(this.close, timeout);
    }
  }

  public close = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (!this._isClosing.getValue()) {
      this._isClosing.next(true);
      setTimeout(() => {
        this.removeFromQueue(this);
        this._isClosed.next(true);
      }, 500);
    }
  }
}