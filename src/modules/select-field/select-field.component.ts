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
  SkySelectField,
  SkySelectFieldSelectMode
} from './types';

import { SkySelectFieldPickerContext } from './select-field-picker-context';
import { SkySelectFieldPickerComponent } from './select-field-picker.component';

@Component({
  selector: 'sky-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SkyResourcesService,
    {
      provide: NG_VALUE_ACCESSOR,
      /* tslint:disable-next-line:no-forward-ref */
      useExisting: forwardRef(() => SkySelectFieldComponent),
      multi: true
    }
  ]
})
export class SkySelectFieldComponent implements ControlValueAccessor {
  @Input()
  public ariaLabel: string;

  @Input()
  public ariaLabelledBy: string;

  @Input()
  public data: Observable<SkySelectField[]>;

  @Input()
  public set descriptorKey(value: string) {
    this._descriptorKey = value;
  }

  public get descriptorKey(): string {
    return this._descriptorKey || 'label';
  }

  @Input()
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  public get disabled(): boolean {
    return this._disabled || false;
  }

  @Input()
  public set selectMode(value: SkySelectFieldSelectMode) {
    this._selectMode = value;
  }

  public get selectMode(): SkySelectFieldSelectMode {
    return this._selectMode || 'multiple';
  }

  @Input()
  public set multipleSelectOpenButtonText(value: string) {
    this._multipleSelectOpenButtonText = value;
  }

  public get multipleSelectOpenButtonText(): string {
    return this._multipleSelectOpenButtonText ||
      this.resourcesService.getString('select_field_multiple_select_open_button');
  }

  @Input()
  public set singleSelectClearButtonTitle(value: string) {
    this._singleSelectClearButtonTitle = value;
  }

  public get singleSelectClearButtonTitle(): string {
    return this._singleSelectClearButtonTitle ||
      this.resourcesService.getString('select_field_single_select_clear_button_title');
  }

  @Input()
  public set singleSelectOpenButtonTitle(value: string) {
    this._singleSelectOpenButtonTitle = value;
  }

  public get singleSelectOpenButtonTitle(): string {
    return this._singleSelectOpenButtonTitle ||
      this.resourcesService.getString('select_field_single_select_open_button_title');
  }

  @Input()
  public set singleSelectPlaceholderText(value: string) {
    this._singleSelectPlaceholderText = value;
  }

  public get singleSelectPlaceholderText(): string {
    return this._singleSelectPlaceholderText ||
      this.resourcesService.getString('select_field_single_select_placeholder');
  }

  @Input()
  public set pickerHeading(value: string) {
    this._pickerHeading = value;
  }

  public get pickerHeading(): string {
    if (this._pickerHeading) {
      return this._pickerHeading;
    }

    return this.resourcesService.getString(`select_field_${this.selectMode}_select_picker_heading`);
  }

  public get value(): any {
    return this._value;
  }

  public set value(value: any) {
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

  private _descriptorKey: string;
  private _disabled: boolean;
  private _multipleSelectOpenButtonText: string;
  private _pickerHeading: string;
  private _selectMode: SkySelectFieldSelectMode;
  private _singleSelectClearButtonTitle: string;
  private _singleSelectOpenButtonTitle: string;
  private _singleSelectPlaceholderText: string;
  private _value: any;

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

    this.data.take(1).subscribe((items: SkySelectField[]) => {
      const newValues = items.filter(item => newIds.indexOf(item.id) > -1);
      this.value = newValues;
      this.setTokensFromValue();
      this.changeDetector.markForCheck();
    });
  }

  public openPicker() {
    const pickerContext = new SkySelectFieldPickerContext();
    pickerContext.headingText = this.pickerHeading;
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

  public writeValue(value: any) {
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
  public onChange = (value: any) => {};
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
      tokens = this.value.map((value: any) => ({ value }));
    }

    this.tokens = tokens;
  }
}
