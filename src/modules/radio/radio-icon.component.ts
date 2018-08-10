import {
  Component,
  Input,
  forwardRef
} from '@angular/core';
import {
  SkyRadioComponent
} from './radio.component';
import { NG_VALUE_ACCESSOR } from '../../../node_modules/@angular/forms';

/**
 * Provider Expression that allows sky-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 */
// tslint:disable:no-forward-ref no-use-before-declare
export const SKY_RADIO_ICON_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyRadioIconComponent),
  multi: true
};
// tslint:enable

@Component({
  selector: 'sky-radio-icon',
  templateUrl: './radio-icon.component.html',
  providers: [SKY_RADIO_ICON_CONTROL_VALUE_ACCESSOR]
})
export class SkyRadioIconComponent extends SkyRadioComponent {
  @Input()
  public icon: string;

  @Input()
  public get radioType(): string {
    return this._radioType || 'info';
  }
  public set radioType(value: string) {
    if (value) {
      this._radioType = value.toLowerCase();
    }
  }

  private _radioType: string;
}
