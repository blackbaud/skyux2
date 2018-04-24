import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {
  Type,
  Provider
} from '@angular/core';

export class SkyToastMessage {
  private _isClosed: BehaviorSubject<boolean>;
  private _isClosing: BehaviorSubject<boolean>;

  public get isClosed(): Observable<boolean> { return this._isClosed.asObservable(); }
  public get isClosing(): Observable<boolean> { return this._isClosing.asObservable(); }

  constructor(
    public message: string,
    public customComponentType: Type<any>,
    public toastType: string,
    private removeFromQueue: Function,
    public providers: Provider[] = []
  ) {
    this._isClosed = new BehaviorSubject(false);
    this._isClosing = new BehaviorSubject(false);
  }

  public close = () => {
    if (!this._isClosing.getValue()) {
      this._isClosing.next(true);

      setTimeout(() => {
        this.removeFromQueue(this);
        this._isClosed.next(true);
      }, 500);
    }
  }
}
