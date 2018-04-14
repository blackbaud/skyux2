import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormGroup, FormControl, Validators }
  from '@angular/forms';

import { SkySelectFieldContext } from './select-field-context';
import { SkySelectFieldFormComponent } from './select-field-form.component';
import { SkySelectField, SkySelectFieldListItemsType } from './types';
import { SkyResources } from '../resources/resources';
import { SkyModalService, SkyModalCloseArgs } from '../modal';
import { SkyToken } from '../tokens';

@Component({
  selector: 'sky-select-field',
  styleUrls: ['./select-field.component.scss'],
  templateUrl: 'select-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkySelectFieldComponent implements AfterContentInit, OnInit {

  @Input()
  public set selectField(value: SkySelectField) {
    this._selectField = value;
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
    return this._tokens;
  }

  public set tokenValues(items: any) {
    this._selectField = items.map((item: any) => item.value);
  }

  public get tokenOverflow() {
    const text = SkyResources.getString('selectfield_summary_text');
    const summary = text.replace('{0}', this._selectField.length.toString());
    return [{ value: { name: summary } }];
  }

  public set tokenOverflow(items) {
    if (items.length === 0) {
      this.clearSelect();
    }
  }

  public singleSelectForm: FormGroup;

  private _tokens:  SkyToken[];
  private _selectField: SkySelectField = [];
  private _selectFieldClear: boolean = false;
  private _selectFieldIcon: string = 'fa-sort';
  private _selectFieldPickerHeader: string;
  private _selectFieldPickerList: SkySelectField = [];
  private _selectFieldStyle: string = 'multiple';
  private _selectFieldText: string = '';

  constructor(private modal: SkyModalService) { }

  public ngOnInit() {
    this.selectFieldChange.subscribe((item: SkySelectField) => {
      this.singleSelectLabel(item[0]);
      this.parseTokens(item);
      this._selectField = item;
      });
    this.singleSelectForm = new FormGroup({
      singleSelectInput: new FormControl('', Validators.required)
    });
    this.parseTokens(this._selectField);
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
  public parseTokens(tokens: SkySelectField) {
    this._tokens = tokens.map(token => ({ value: token }));
  }
  private singleSelectLabel(selectedItem: SkySelectFieldListItemsType) {
    if (!this.isSelectMultiple()) {
      this.singleSelectForm.controls.singleSelectInput.setValue(selectedItem !== undefined ? selectedItem.label : '');
    }
  }
}
