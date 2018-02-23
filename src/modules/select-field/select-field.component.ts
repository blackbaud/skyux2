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

import { SkySelectFieldOutput } from './select-field.interface';
import { SkySelectFieldContext } from './select-field-context';
import { SkySelectFieldFormComponent } from './select-field-form.component';
import { SkySelectFieldListItems } from './select-field.interface';
import { SkyResources } from '../resources/resources';
import { SkyModalService, SkyModalCloseArgs } from '../modal';
import { SkyResourcesPipe } from '../resources';

@Component({
  selector: 'sky-select-field',
  styleUrls: ['./select-field.component.scss'],
  templateUrl: 'select-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkySelectFieldComponent implements AfterContentInit {

  @Input()
  public set selectField(value: SkySelectFieldListItems[]) {
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
  public set selectFieldPickerList(value: Array<SkySelectFieldListItems>) {
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
  public selectFieldChange = new EventEmitter<SkySelectFieldOutput>();
  public get selectField(): SkySelectFieldListItems[] {
    return this._selectField || [];
  }

  public get selectFieldText() {
    return this._selectFieldText;
  }

  public get selectFieldClear() {
    return this._selectFieldClear;
  }

  public get selectFieldIcon() {
    return this._selectFieldIcon;
  }

  public get tokenValues() {
    return this._tokenValues.map(item => ({ value: item }));
  }

  public set tokenValues(arg: any) {
    this.selectFieldChange.emit(arg.map((item: any) => item.value));
  }

  public get tokenOverflow() {
    let text = SkyResources.getString('selectfield_summary_text');
    let summary = text.replace('{0}', this._tokenValues.length.toString());
    return [{ value: { name: summary } }];
  }

  public set tokenOverflow(arg) {
    if (arg.length === 0) {
      this.clearSelect();
    }
  }


  public singleSelectForm: FormGroup;

  private _selectField: SkySelectFieldListItems[];
  private _selectFieldClear: boolean;
  private _selectFieldIcon: string = 'fa-sort';
  private _selectFieldPickerHeader: string;
  private _selectFieldPickerList: Array<SkySelectFieldListItems> = [];
  private _selectFieldStyle: string = 'multiple';
  private _selectFieldText: string;
  private _tokenValues: Array<SkySelectFieldListItems> = [];

  constructor(private modal: SkyModalService) {
    this.selectFieldChange.subscribe((item: SkySelectFieldOutput) => {
      this.singleSelectLabel(item[0]);
      this._tokenValues = this._selectField;
    });
    this.singleSelectForm = new FormGroup({
      singleSelectInput: new FormControl('', Validators.required)
    });
  }

  public ngAfterContentInit() {
    this.singleSelectLabel(this._selectField[0]);
  }

  public openFormModel() {
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
      let data: SkySelectFieldOutput = result.data;
      if (result.reason === 'save') {
        this.selectFieldChange.emit(data);
      }
    });
  }

  public isSelectMultiple() {
    return this._selectFieldStyle === 'multiple' ? true : false;
  }
  public isClearable() {
    return this.singleSelectForm.controls.singleSelectInput.value && this.selectFieldClear;
  }
  public clearSelect() {
    this.selectFieldChange.emit([]);
  }
  private singleSelectLabel(selectedItem: SkySelectFieldListItems) {
    if (!this.isSelectMultiple()) {
      this.singleSelectForm.controls.singleSelectInput.setValue(selectedItem ? selectedItem.label : '');
    }
  }
}
