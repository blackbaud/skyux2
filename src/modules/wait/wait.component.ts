import {
  Component,
  Input,
  ElementRef
} from '@angular/core';

import {
  SkyWaitAdapterService
} from './wait-adapter.service';
import {
  SkyResourcesService
} from '../resources';

@Component({
  selector: 'sky-wait',
  templateUrl: './wait.component.html',
  styleUrls: ['./wait.component.scss'],
  providers: [SkyWaitAdapterService]
})
export class SkyWaitComponent {

  @Input()
  public set isWaiting(value: boolean) {
    if (value && !this._isFullPage) {
      this.adapterService.setWaitBounds(this.elRef);
    } else if (!value && !this._isFullPage) {
      this.adapterService.removeWaitBounds(this.elRef);
    }
    this.adapterService.setBusyState(this.elRef, this._isFullPage, value, this.isNonBlocking);
    this._isWaiting = value;
  }

  public get isWaiting() {
    return this._isWaiting;
  }

  @Input()
  public set isFullPage(value: boolean) {
    if (value) {
      this.adapterService.removeWaitBounds(this.elRef);
    } else if (!value && this._isWaiting) {
      this.adapterService.setWaitBounds(this.elRef);
    }

    this._isFullPage = value;
  }

  public get isFullPage() {
    return this._isFullPage;
  }

  @Input()
  public isNonBlocking: boolean;

  @Input()
  public set ariaLabel(value: string) {
    if (value) {
      this._ariaLabel = value;
    } else {
      const type = this.isFullPage ? '_page' : '';
      const blocking = this.isNonBlocking ? '' : '_blocking';
      const defaultMessage = this.resourceService.getString('wait' + type + blocking + '_aria_alt_text');

      this._ariaLabel = defaultMessage;
    }
  }
  public get ariaLabel(): string {
    return this._ariaLabel;
  }

  private _isWaiting: boolean;
  private _ariaLabel: string;
  private _isFullPage: boolean;

  constructor(
    private elRef: ElementRef,
    private adapterService: SkyWaitAdapterService,
    private resourceService: SkyResourcesService
  ) {}
}
