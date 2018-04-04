import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

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

import { SkySelectFieldContext } from './select-field-context';
import { SkySelectFieldFormComponent } from './select-field-form.component';
// import { SkySelectField, SkySelectFieldListItemsType } from './types';

const SKY_SELECT_FIELD_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable-next-line:no-forward-ref */
  useExisting: forwardRef(() => SkySelectFieldComponent),
  multi: true
};

@Component({
  selector: 'sky-select-field',
  styleUrls: ['./select-field.component.scss'],
  templateUrl: 'select-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SkyResourcesService,
    SKY_SELECT_FIELD_VALUE_ACCESSOR
  ]
})
export class SkySelectFieldComponent
  implements AfterContentInit, OnInit, OnDestroy, ControlValueAccessor {

  public get value(): SkyToken[] {
    return this._value;
  }

  public set value(value: SkyToken[]) {
    this._value = value;
    this.onChange(this.value);
    this.onTouched();
  }

  @Input()
  public data: any[];

  @Input()
  public disabled = false;

  @Input()
  public tokenDisplayWith = 'name';

  @Input()
  public pickerTemplateRef: TemplateRef<any>;

  @Input()
  public set multiselectButtonText(value: string) {
    this._multiselectButtonText = value;
  }

  public get multiselectButtonText(): string {
    return this._multiselectButtonText || this.resourcesService.getString('select_field_multiselect_button_text');
  }

  public get tokens(): SkyToken[] {
    if (!this.value) {
      return [];
    }

    return this.value.map(value => ({ value }));
  }

  private _multiselectButtonText: string;
  private _value: any[];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: SkyModalService,
    private resourcesService: SkyResourcesService
  ) { }

  public ngOnInit() {}

  public ngAfterContentInit() {}

  public ngOnDestroy() {}

  public writeValue(value: any[]) {
    if (value && !this.disabled) {
      this.value = value;
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

  // Allows Angular to disable the input.
  public setDisabledState(disabled: boolean) {
    this.disabled = disabled;
    this.changeDetector.markForCheck();
  }

  public openModal() {
    console.log('open modal');
    const context = new SkySelectFieldContext();
    context.headingText = this.multiselectButtonText;
    context.data = this.data;
    context.templateRef = this.pickerTemplateRef;
    // context.pickerHeader = this._selectFieldPickerHeader;
    // context.pickerList = this.data;
    // context.selectField = this._selectField;
    // context.selectFieldStyle = this._selectFieldStyle;

    const options = {
      providers: [{ provide: SkySelectFieldContext, useValue: context }],
      ariaDescribedBy: 'docs-modal-content'
    };

    const modalInstance = this.modalService.open(SkySelectFieldFormComponent, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'save') {
        console.log('emit save:', result.data);
      }
    });
  }

  // @Input()
  // public set selectField(value: SkySelectField) {
  //   this._selectField = value;
  // }

  // @Input()
  // public set selectFieldClear(value: boolean) {
  //   this._selectFieldClear = true;
  // }

  // @Input()
  // public set selectFieldIcon(value: string) {
  //   this._selectFieldIcon = value;
  // }

  // @Input()
  // public set selectFieldPickerHeader(value: string) {
  //   this._selectFieldPickerHeader = value;
  // }

  // @Input()
  // public set selectFieldPickerList(value: SkySelectField) {
  //   this._selectFieldPickerList = value;
  // }

  // @Input()
  // public set selectFieldText(value: string) {
  //   this._selectFieldText = value;
  // }

  // @Input()
  // public set selectFieldStyle(value: string) {
  //   this._selectFieldStyle = value;
  // }

  // @Output()
  // public selectFieldChange = new EventEmitter<SkySelectField>();
  // public get selectField(): SkySelectField {
  //   return this._selectField;
  // }

  // public get selectFieldText() {
  //   return this._selectFieldText;
  // }

  // public get selectFieldIcon() {
  //   return this._selectFieldIcon;
  // }

  // public get tokenValues() {
  //   return this._tokens;
  // }

  // public set tokenValues(items: any) {
  //   this._selectField = items.map((item: any) => item.value);
  // }

  // public get tokenOverflow() {
  //   const text = SkyResources.getString('selectfield_summary_text');
  //   const summary = text.replace('{0}', this._selectField.length.toString());
  //   return [{ value: { name: summary } }];
  // }

  // public set tokenOverflow(items) {
  //   if (items.length === 0) {
  //     this.clearSelect();
  //   }
  // }

  // public singleSelectForm: FormGroup;

  // private _tokens: SkyToken[];
  // private _selectField: SkySelectField = [];
  // private _selectFieldClear = false;
  // private _selectFieldIcon = 'fa-sort';
  // private _selectFieldPickerHeader: string;
  // private _selectFieldPickerList: SkySelectField = [];
  // private _selectFieldStyle = 'multiple';
  // private _selectFieldText = '';

  // constructor(
  //   private modalService: SkyModalService
  // ) { }

  // public ngOnInit() {
  //   // this.selectFieldChange.subscribe((item: SkySelectField) => {
  //   //   this.singleSelectLabel(item[0]);
  //   //   this.parseTokens(item);
  //   //   this._selectField = item;
  //   // });

  //   // this.singleSelectForm = new FormGroup({
  //   //   singleSelectInput: new FormControl('', Validators.required)
  //   // });

  //   // this.parseTokens(this._selectField);
  // }

  // public ngAfterContentInit() {
  //   // this.singleSelectLabel(this._selectField[0]);
  // }

  // public openFormModal() {
  //   console.log('open modal!');
  //   // const context = new SkySelectFieldContext();
  //   // context.pickerHeader = this._selectFieldPickerHeader;
  //   // context.pickerList = this._selectFieldPickerList;
  //   // context.selectField = this._selectField;
  //   // context.selectFieldStyle = this._selectFieldStyle;

  //   // const options: any = {
  //   //   providers: [{ provide: SkySelectFieldContext, useValue: context }],
  //   //   ariaDescribedBy: 'docs-modal-content'
  //   // };

  //   // const modalInstance = this.modal.open(SkySelectFieldFormComponent, options);
  //   // modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
  //   //   let data: SkySelectField = result.data;
  //   //   if (result.reason === 'save') {
  //   //     this.selectFieldChange.emit(data);
  //   //   }
  //   // });
  // }

  // public isSelectMultiple() {
  //   return this._selectFieldStyle === 'multiple' ? true : false;
  // }

  // public isClearable() {
  //   return this._selectFieldClear && this.singleSelectForm.controls.singleSelectInput.value ? true : false;
  // }

  // public clearSelect() {
  //   this.selectFieldChange.emit([]);
  // }

  // public parseTokens(tokens: SkySelectField) {
  //   this._tokens = tokens.map(token => ({ value: token }));
  // }

  // private singleSelectLabel(selectedItem: SkySelectFieldListItemsType) {
  //   if (!this.isSelectMultiple()) {
  //     this.singleSelectForm.controls.singleSelectInput.setValue(selectedItem !== undefined ? selectedItem.label : '');
  //   }
  // }
}
