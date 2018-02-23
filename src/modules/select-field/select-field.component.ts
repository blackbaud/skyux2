import {
  EventEmitter,
  Component,
  ChangeDetectionStrategy,
  Output,
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
  @Output()
  public selectFieldChanged: EventEmitter<SkySelectFieldOutput> =
    new EventEmitter<SkySelectFieldOutput>();

  public singleSelectForm: FormGroup;
  public selectFieldContext: SkySelectFieldContext;

  // temporary poly-fill for sky-tokens
  public tokens: BehaviorSubject<SkySelectFieldListItems[]>;
  constructor(private modal: SkyModalService) {

    this.singleSelectForm = new FormGroup({
      singleSelectInput: new FormControl('', Validators.required)
    });
  }
  public ngAfterContentInit() {
    this.tokens = new BehaviorSubject(this.initialSelectedItems);

    this.tokens.subscribe(items => {
      if (!this.isSelectMultiple()) { this.singleSelectLabel(items[0]); }
      this.selectFieldChanged.emit(items);
    });

  }

  public get selectFieldText() { return this.selectFieldContext.selectFieldText; }
  public get selectFieldStyle() { return this.selectFieldContext.selectFieldStyle; }
  public get initialSelectedItems() { return this.selectFieldContext.initialSelectedItems; }

  public openFormModel() {
    const context = this.selectFieldContext;
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
