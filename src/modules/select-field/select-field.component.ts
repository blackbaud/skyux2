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
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SkyModalService, SkyModalCloseArgs } from '../modal';

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
    this._selectFieldClear = value;
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

  public singleSelectForm: FormGroup;

  // temporary poly-fill for sky-tokens
  public tokens: BehaviorSubject<SkySelectFieldListItems[]>;

  public get tokensValues() {
    return this.tokens.getValue().map(item => ({ value: item }));
  }
  constructor(private modal: SkyModalService) {

    this.singleSelectForm = new FormGroup({
      singleSelectInput: new FormControl('', Validators.required)
    });
  }

  private _selectField: SkySelectFieldListItems[];
  private _selectFieldClear: boolean;
  private _selectFieldIcon: string = 'fa-sort';
  private _selectFieldPickerHeader: string;
  private _selectFieldPickerList: Array<SkySelectFieldListItems> = [];
  private _selectFieldStyle: string = 'multiple';
  private _selectFieldText: string;

  public ngAfterContentInit() {
    this.tokens = new BehaviorSubject(this._selectField);

    this.tokens.subscribe(items => {
      if (!this.isSelectMultiple()) { this.singleSelectLabel(items[0]); }
    });

  }

  public openFormModel() {
    const context = new SkySelectFieldContext();
    context.pickerHeader = this._selectFieldPickerHeader;
    context.pickerList = this._selectFieldPickerList;
    context.selectFieldClear = this._selectFieldClear;
    context.selectFieldIcon = this._selectFieldIcon;
    context.selectFieldStyle = this._selectFieldStyle;
    context.selectFieldText = this._selectFieldText;
    context.selectField = this._selectField;

    const options: any = {
      providers: [{ provide: SkySelectFieldContext, useValue: context }],
      ariaDescribedBy: 'docs-modal-content'
    };

    const modalInstance = this.modal.open(SkySelectFieldFormComponent, options);
    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      let data: SkySelectFieldOutput = result.data;
      if (result.reason === 'save') {
        let uniqueLabels = data
          .filter((search, index, row) => search && row.find(item => item.label === search.label).id === search.id);
        this.tokens.next(uniqueLabels);
        this.selectFieldChange.emit(data);
      }
    });
  }

  public isSelectMultiple() {
    return this._selectFieldStyle === 'multiple' ? true : false;
  }
  public clearSelectSingle() {
    this.tokens.next([]);
  }

  private singleSelectLabel(selectedItem: SkySelectFieldListItems) {
    this.singleSelectForm.controls.singleSelectInput.setValue(selectedItem ? selectedItem.label : '');
  }
}
