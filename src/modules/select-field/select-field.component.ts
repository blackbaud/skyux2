import {
  EventEmitter,
  Component,
  ChangeDetectionStrategy,
  Output,
  Input,
  AfterContentInit
} from '@angular/core';
import { FormGroup, FormControl, Validators }
  from '@angular/forms';

import { SkySelectFieldContext } from './select-field-context';
import { SkySelectFieldFormComponent } from './select-field-form.component';
import { SkySelectField, SkySelectFieldListItemsType } from './types';
import { SkyResources } from '../resources/resources';
import { SkyModalService, SkyModalCloseArgs } from '../modal';

@Component({
  selector: 'sky-select-field',
  styleUrls: ['./select-field.component.scss'],
  templateUrl: 'select-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkySelectFieldComponent implements AfterContentInit {

  @Input()
  public set selectField(value: SkySelectField) {
    this._selectField = value;
    this.selectFieldChange.emit(this._selectField);
  }

  @Input()
  public set selectFieldClear(value: boolean) {
    this._selectFieldClear = true;
  }

  @Input()
  public set selectFieldIcon(value: string) {
    this._selectFieldIcon = value;
  }

  @Input()
  public set selectFieldPickerHeader(value: string) {
    this._selectFieldPickerHeader = value;
  }

  @Input()
  public set selectFieldPickerList(value: SkySelectField) {
    this._selectFieldPickerList = value;
  }

  @Input()
  public set selectFieldText(value: string) {
    this._selectFieldText = value;
  }

  @Input()
  public set selectFieldStyle(value: string) {
    this._selectFieldStyle = value;
  }

  @Output()
  public selectFieldChange = new EventEmitter<SkySelectField>();
  public get selectField(): SkySelectField {
    return this._selectField;
  }

  public get selectFieldText() {
    return this._selectFieldText;
  }

  public get selectFieldIcon() {
    return this._selectFieldIcon;
  }

  public get tokenValues() {
    return this._tokenValues.map(item => ({ value: item }));
  }

  public set tokenValues(items: any) {
    this.selectFieldChange.emit(items.map((item: any) => item.value));
  }

  public get tokenOverflow() {
    let text = SkyResources.getString('selectfield_summary_text');
    let summary = text.replace('{0}', this._tokenValues.length.toString());
    return [{ value: { name: summary } }];
  }

  public set tokenOverflow(items) {
    if (items.length === 0) {
      this.clearSelect();
    }
  }

  public singleSelectForm: FormGroup;

  private _selectField: SkySelectField = [];
  private _selectFieldClear: boolean = false;
  private _selectFieldIcon: string = 'fa-sort';
  private _selectFieldPickerHeader: string;
  private _selectFieldPickerList: SkySelectField = [];
  private _selectFieldStyle: string = 'multiple';
  private _selectFieldText: string = '';
  private _tokenValues: SkySelectField = [];

  constructor(private modal: SkyModalService) {
    this.selectFieldChange.subscribe((item: SkySelectField) => {
      this.singleSelectLabel(item[0]);
      this._selectField = item;
      this._tokenValues = this._selectField;
    });
    this.singleSelectForm = new FormGroup({
      singleSelectInput: new FormControl('', Validators.required)
    });
  }

  public ngAfterContentInit() {
    this.singleSelectLabel(this._selectField[0]);
  }

  public openFormModal() {
    const context = new SkySelectFieldContext();
    context.pickerHeader = this._selectFieldPickerHeader;
    context.pickerList = this._selectFieldPickerList;
    context.selectField = this._selectField;
    context.selectFieldStyle = this._selectFieldStyle;

    const options: any = {
      providers: [{ provide: SkySelectFieldContext, useValue: context }],
      ariaDescribedBy: 'docs-modal-content'
    };

    const modalInstance = this.modal.open(SkySelectFieldFormComponent, options);
    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      let data: SkySelectField = result.data;
      if (result.reason === 'save') {
        this.selectFieldChange.emit(data);
      }
    });
  }

  public isSelectMultiple() {
    return this._selectFieldStyle === 'multiple' ? true : false;
  }
  public isClearable() {
    return this._selectFieldClear && this.singleSelectForm.controls.singleSelectInput.value ? true : false;
  }
  public clearSelect() {
    this.selectFieldChange.emit([]);
  }
  private singleSelectLabel(selectedItem: SkySelectFieldListItemsType) {
    if (!this.isSelectMultiple()) {
      this.singleSelectForm.controls.singleSelectInput.setValue(selectedItem !== undefined ? selectedItem.label : '');
    }
  }
}
