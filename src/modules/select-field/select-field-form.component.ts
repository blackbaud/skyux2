import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SkyModalInstance } from '../modal';
import { SkySelectFieldContext } from './select-field-context';
import { SkySelectFieldListItems } from './select-field.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'sky-select-field-form',
  styleUrls: ['./select-field-form.component.scss'],
  templateUrl: 'select-field-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkySelectFieldFormComponent {
  public allItems: BehaviorSubject<SkySelectFieldListItems[]> = new BehaviorSubject(this.context.pickerList);
  public filteredItems: Subject<SkySelectFieldListItems[]> = this.allItems;
  public selectedCategory: string;
  public selectedIds: string[] = [];

  constructor(
    public context: SkySelectFieldContext,
    public instance: SkyModalInstance
  ) { this.setSelectedIds(); }

  public save() {
    this.instance.save(this.selectedItems);
  }
  public close() {
    this.instance.close(this.selectedItems);
  }
  public clearSelection() {
    this.selectedItemsCategory('');
    this.selectedItemsChange(undefined);
  }
  public get pickerHeader() {
    return this.context.pickerHeader;
  }
  public get pickerContentItems() {
    return this.context.pickerList;
  }
  public get selectFieldStyle() {
    return this.context.selectFieldStyle;
  }
  public get selectedItems() {
    return this.context.selectField;
  }
  public set selectedItems(items) {
    this.context.selectField = items;
  }
  public setSelectedIds() {
    this.selectedIds = this.selectedItems.map(item => item.id);
  }

  // -- Category polyfill until /skyux2/issues/377 -- //
  public get pickerItemsCategories() {
    // return unique categories.
    return this.pickerContentItems
      .map(item => item.category)
      .filter((search, index, category) => search && category.indexOf(search) === index);
  }
  // -- Category polyfill until /skyux2/issues/377 -- //
  public selectedItemsCategory(category: string) {
    this.selectedCategory = category;
    let filteredItems = this.pickerContentItems.filter(item => item.category === category);
    this.filteredItems.next(category === '' ? this.pickerContentItems : filteredItems);
  }

  public isSelectMultiple() {
    return this.selectFieldStyle === 'multiple' ? true : false;
  }

  public selectedItemsChange(selectedMap: Map<string, boolean>) {

    this.allItems.subscribe(items => {
      if (selectedMap === undefined) {
        this.selectedItems = [];
      } else {
        this.selectedItems = items.filter(item => selectedMap.get(item.id));
      }

      if (!this.isSelectMultiple()) { this.save(); }
    });
  }

}
