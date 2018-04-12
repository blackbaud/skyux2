import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import {
  SkyModalService,
  SkyModalCloseArgs
} from '../modal';

import {
  SkyResourcesService
} from '../resources';

import {
  SkyToken
} from '../tokens';

import {
  SkySelectFieldSelectMode
} from './types';

import { SkySelectFieldPickerContext } from './select-field-picker-context';
import { SkySelectFieldPickerComponent } from './select-field-picker.component';

const SKY_SELECT_FIELD_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => SkySelectFieldComponent),
  multi: true
};

@Component({
  selector: 'sky-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SkyResourcesService,
    SKY_SELECT_FIELD_VALUE_ACCESSOR
  ]
})
export class SkySelectFieldComponent implements ControlValueAccessor {
  @Input()
  public ariaLabel: string;

  @Input()
  public ariaLabelledBy: string;

  @Input()
  public data: Observable<any[]>;

  @Input()
  public descriptorKey = 'label';

  @Input()
  public disabled = false;

  @Input()
  public selectMode: SkySelectFieldSelectMode = 'multiple';

  public get value(): any[] {
    return this._value;
  }

  public set value(value: any[]) {
    this._value = value;
    this.onChange(this.value);
    this.onTouched();
  }

  public get singleSelectModeValue(): string {
    const value = this.value;

    if (value) {
      return (value as any)[this.descriptorKey];
    }

    return '';
  }

  public tokens: SkyToken[];

  private _value: any[];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: SkyModalService,
    private resourcesService: SkyResourcesService
  ) { }

  public onTokensChange(change: SkyToken[]) {
    if (!change || change === this.tokens) {
      return;
    }

    const newIds = change.map(token => token.value.id);

    this.data.take(1).subscribe((items: any[]) => {
      const newValues = items.filter(item => newIds.indexOf(item.id) > -1);
      this.value = newValues;
      this.setTokensFromValue();
      this.changeDetector.markForCheck();
    });
  }

  public openPicker() {
    const pickerContext = new SkySelectFieldPickerContext();
    pickerContext.headingText = this.resourcesService.getString(`select_field_${this.selectMode}_select_picker_heading`);
    pickerContext.data = this.data;
    pickerContext.selectedValue = this.value;
    pickerContext.selectMode = this.selectMode;

    const modalInstance = this.modalService.open(SkySelectFieldPickerComponent, {
      providers: [{
        provide: SkySelectFieldPickerContext,
        useValue: pickerContext
      }]
    });

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'save') {
        if (this.selectMode === 'single') {
          this.writeValue(result.data[0]);
        } else {
          this.writeValue(result.data);
        }
      }
    });
  }

  public writeValue(value: any[]) {
    if (this.disabled) {
      return;
    }

    if (value) {
      this.value = value;
      this.setTokensFromValue();
      this.changeDetector.markForCheck();
    }
  }

  // Angular automatically constructs these methods.
  /* istanbul ignore next */
  public onChange = (value: any[]) => {};
  /* istanbul ignore next */
  public onTouched = () => {};

  public registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  public setDisabledState(disabled: boolean) {
    this.disabled = disabled;
    this.changeDetector.markForCheck();
  }

  public clearSelection() {
    this.value = undefined;
  }

  private setTokensFromValue() {
    let tokens: SkyToken[] = [];

    // Tokens only appear for multiple select mode.
    if (this.selectMode === 'single') {
      return;
    }

    // Reset tokens if the value is empty.
    if (!this.value) {
      this.tokens = undefined;
      return;
    }

    // Collapse the tokens into a single token if the user has selected many options.
    if (this.value.length > 5) {
      tokens = [{
        value: {
          [this.descriptorKey]: this.resourcesService
            .getString('select_field_multiple_select_summary')
            .replace('{0}', this.value.length.toString())
        }
      }];
    } else {
      tokens = this.value.map(value => ({ value }));
    }

    this.tokens = tokens;
  }
}
