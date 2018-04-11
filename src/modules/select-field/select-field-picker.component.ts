import {
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
  selector: 'sky-select-field-picker',
  styleUrls: ['./select-field-picker.component.scss'],
  templateUrl: 'select-field-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkySelectFieldPickerComponent implements OnInit {
  public data: Observable<any[]>;
  public selectedIds: any[] = [];
  public selectedCategory = 'any';
  public categories: string[];

  constructor(
    private context: SkySelectFieldPickerContext,
    private instance: SkyModalInstance
  ) { }

  public ngOnInit() {
    this.data = this.context.data;
    if (this.context.selectMode === 'multiple') {
      this.selectedIds = this.context.selectedValue.map((item: any) => item.id);
    }
    this.getCategories();
  }

  public onSelectedIdsChange(selectedMap: Map<string, boolean>) {
    this.data.take(1).subscribe((items: any[]) => {
      this.selectedIds = items
        .filter((item: any) => selectedMap.get(item.id))
        .map((item: any) => item.id);
    });
  }

  public save() {
    this.data.take(1).subscribe((items: any) => {
      const results = items.filter((item: any) => {
        return (this.selectedIds.indexOf(item.id) > -1);
      });
      this.instance.save(results);
    });
  }

  public close() {
    this.instance.close();
  }

  public filterByCategory(item: any, category: string) {
    // TODO: find out a way to reset the selected values when the category selected changes.
    return (category === 'any' || item.data.category === category);
  }

  public getCategories() {
    this.data.take(1).subscribe((items: any[]) => {
      this.categories = items
        .map((item: any) => item.category)
        .filter((search, index, category) => {
          return (search && category.indexOf(search) === index);
        });
    });
  }

  // public get pickerItemsCategories() {
  //   return ['a', 'b', 'c'];
  // }

  // public selectedItemsCategory(category: string) {
  //   this.selectedCategory = category;
  //   this.data.take(1).subscribe((items: any) => {
  //     let filteredItems = items.filter((item: any) => item.category === category);
  //     this.data = Observable.of(filteredItems);
  //     this.changeDetector.markForCheck();
  //   });
  // }

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

  // public clearSelection() {
  //   this.selectedItemsCategory('');
  //   this.selectedItemsChange(undefined);
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
}
