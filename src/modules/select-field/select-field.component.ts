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
  public skySelectFieldInput: SkySelectFieldComponent;

  @Input()
  public selectFieldStyle: string;

  @Input()
  public selectFieldIcon: string;

  @Input()
  public selectFieldClear: boolean;

  @Input()
  public selectFieldText: string;

  @Input()
  public selectFieldPickerHeader: string;

  @Input()
  public selectFieldPickerList: Array<SkySelectFieldListItems>;

  @Input()
  public selectFieldInitialItemsSelected: SkySelectFieldListItems[];

  @Output()
  public selectFieldOutput: EventEmitter<SkySelectFieldOutput> =
    new EventEmitter<SkySelectFieldOutput>();

  public singleSelectForm: FormGroup;

  // temporary poly-fill for sky-tokens
  public tokens: BehaviorSubject<SkySelectFieldListItems[]>;
  constructor(private modal: SkyModalService) {

    this.singleSelectForm = new FormGroup({
      singleSelectInput: new FormControl('', Validators.required)
    });
  }
  public ngAfterContentInit() {
    this.tokens = new BehaviorSubject(this.selectFieldInitialItemsSelected);

    this.tokens.subscribe(items => {
      if (!this.isSelectMultiple()) { this.singleSelectLabel(items[0]); }
      this.selectFieldOutput.emit(items);
    });

  }

  public openFormModel() {
    const context = new SkySelectFieldContext();
    context.pickerList = this.selectFieldPickerList || context.pickerList;
    context.pickerHeader = this.selectFieldPickerHeader || context.pickerHeader;
    context.selectFieldInitialItemsSelected = this.selectFieldInitialItemsSelected || context.selectFieldInitialItemsSelected;
    context.selectFieldStyle = this.selectFieldStyle || context.selectFieldStyle;
    context.selectFieldText = this.selectFieldText || context.selectFieldText;
    context.selectFieldIcon = this.selectFieldIcon || context.selectFieldIcon;
    context.selectFieldClear = this.selectFieldClear || context.selectFieldClear;

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
      }
    });
  }

  public isSelectMultiple() {
    return this.selectFieldStyle === 'multiple' ? true : false;
  }
  public clearSelectSingle() {
    this.tokens.next([]);
  }

  private singleSelectLabel(selectedItem: SkySelectFieldListItems) {
    this.singleSelectForm.controls.singleSelectInput.setValue(selectedItem ? selectedItem.label : '');
  }
}
