import {
    Component,
    Input,
    forwardRef
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import {
  SkyCheckboxComponent
} from './checkbox.component';

/**
 * Provider Expression that allows sky-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 */
// tslint:disable:no-forward-ref no-use-before-declare
export const SKY_CHECKBOX_ICON_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyCheckboxIconComponent),
  multi: true
};
// tslint:enable

@Component({
  selector: 'sky-checkbox-icon',
  templateUrl: './checkbox.component.html',
  providers: [SKY_CHECKBOX_ICON_CONTROL_VALUE_ACCESSOR]
})
export class SkyCheckboxIconComponent extends SkyCheckboxComponent {
  @Input()
  public icon: String;

  @Input()
  public get checkboxType(): string {
    return this._checkboxType || 'info';
  }
  public set checkboxType(value: string) {
    if (value) {
      this._checkboxType = value.toLowerCase();
    }
  }

  private _checkboxType: string;
}
