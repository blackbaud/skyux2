import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';

import { SkyTabsetService } from './tabset.service';

@Component({
  selector: 'sky-tab',
  templateUrl: './tab.component.html'
})
export class SkyTabComponent implements OnDestroy {
  @Input()
  public tabHeading: string;

  @Input()
  public tabHeaderCount: string;

  @Input()
  public disabled: boolean;

  @Input()
  public set active(value: boolean) {
    let wasActive = this._active;

    this._active = value;

    if (!wasActive && this._active) {
      this.tabsetService.activateTab(this);
    }
  }

  public get active(): boolean {
    return this._active;
  }

  public get allowClose(): boolean {
    return this.close.observers.length > 0;
  }

  @Output()
  public close = new EventEmitter<any>();

  private _active = false;

  constructor(private tabsetService: SkyTabsetService) { }

  public ngOnDestroy() {
    this.tabsetService.destroyTab(this);
  }
}
