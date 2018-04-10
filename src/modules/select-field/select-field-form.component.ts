import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import {
  SkyModalInstance
} from '../modal';

import { SkySelectFieldPickerContext } from './select-field-picker-context';

@Component({
  selector: 'sky-select-field-form',
  styleUrls: ['./select-field-form.component.scss'],
  templateUrl: 'select-field-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkySelectFieldFormComponent implements OnInit, AfterViewInit {
  public data: Observable<any[]>;
  public selectedIds: any[] = [];

  constructor(
    public context: SkySelectFieldPickerContext,
    public instance: SkyModalInstance
  ) {
    this.data = context.data;
    this.selectedIds = context.selectedItems.map((item: any) => item.id);
  }

  public ngOnInit() { }

  public ngAfterViewInit() { }

  public onSelectedIdsChange(selectedMap: Map<string, boolean>) {
    this.data.take(1).subscribe((items: any[]) => {
      this.selectedIds = items
        .filter((item: any) => selectedMap.get(item.id))
        .map((item: any) => item.id);
    });
  }

  public save() {
    console.log(this.selectedIds);
    let results: any[];
    this.data.take(1).subscribe((items: any) => {
      results = items.filter((item: any) => {
        return (this.selectedIds.indexOf(item.id) > -1);
      });
    });
    // const results = this.data.filter((item: any) => {
    //   return item
    // });
    this.instance.save(results);
  }

  public close() {}

  // public allItems = new BehaviorSubject<SkySelectField>(this.context.pickerList);
  // public filteredItems: Subject<SkySelectField> = this.allItems;
  // public selectedCategory: string;
  // public selectedIds: string[] = [];

  // constructor(
  //   public context: SkySelectFieldContext,
  //   public instance: SkyModalInstance,
  //   private renderer: Renderer2
  // ) {
  //   this.setSelectedIds();
  // }

  // public ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.renderer.selectRootElement('input.sky-search-input').focus();
  //   });
  // }

  // public save() {
  //   this.instance.save(this.selectedItems);
  // }

  // public close() {
  //   this.instance.close(this.selectedItems);
  // }

  // public clearSelection() {
  //   this.selectedItemsCategory('');
  //   this.selectedItemsChange(undefined);
  // }

  // public get pickerHeader() {
  //   return this.context.pickerHeader;
  // }

  // public get pickerContentItems() {
  //   return this.context.pickerList;
  // }

  // public get selectFieldStyle() {
  //   return this.context.selectFieldStyle;
  // }

  // public get selectedItems() {
  //   return this.context.selectField;
  // }

  // public set selectedItems(items) {
  //   this.context.selectField = items;
  // }

  // public setSelectedIds() {
  //   this.selectedIds = this.selectedItems.map(item => item.id);
  // }

  // // -- Category polyfill until /skyux2/issues/377 -- //
  // public get pickerItemsCategories() {
  //   // return unique categories.
  //   return this.pickerContentItems
  //     .map(item => item.category)
  //     .filter((search, index, category) => search && category.indexOf(search) === index);
  // }
  // // -- Category polyfill until /skyux2/issues/377 -- //

  // public selectedItemsCategory(category: string) {
  //   this.selectedCategory = category;
  //   let filteredItems = this.pickerContentItems.filter(item => item.category === category);
  //   this.filteredItems.next(category === '' ? this.pickerContentItems : filteredItems);
  // }

  // public isSelectMultiple() {
  //   return this.selectFieldStyle === 'multiple' ? true : false;
  // }

  // public selectedItemsChange(selectedMap: Map<string, boolean>) {
  //   this.allItems.subscribe(items => {
  //     this.selectedItems = selectedMap === undefined ? [] : items.filter(item => selectedMap.get(item.id));
  //     if (!this.isSelectMultiple()) { this.save(); }
  //   });
  // }
}
