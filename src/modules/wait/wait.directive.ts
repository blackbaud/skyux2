import {
  Directive,
  ViewContainerRef,
  Input
} from '@angular/core';

import {
  SkyWaitService
} from './wait.service';

@Directive({
  selector: '[skyWait]'
})
export class SkyWaitDirective {

  @Input()
  public set skyWait(value: boolean) {
    debugger;
    let oldValue = this._skyWait;

    if (value && (!oldValue || this._firstWaitSet)) {
      this.waitService.beginViewWait(this.viewRef);
    } else if (oldValue && !value) {
      this.waitService.endViewWait(this.viewRef);
    }

    this._skyWait = value;
    this._firstWaitSet = false;
  }

  public get skyWait() {
    return this._skyWait;
  }

  private _skyWait = false;

  private _firstWaitSet = true;

  constructor(private viewRef: ViewContainerRef, private waitService: SkyWaitService) {}
}
