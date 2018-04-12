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

  public onCategoryChange(change: any, filter: any) {
    // Reset the selected values when the category changes.
    this.selectedIds = [];
    filter.changed(change);
  }
}
