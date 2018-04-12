import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import {
  SkyListViewChecklistComponent
} from '../list-view-checklist';

import {
  SkyModalInstance
} from '../modal';

import { SkySelectFieldPickerContext } from './select-field-picker-context';

@Component({
  selector: 'sky-select-field-picker',
  templateUrl: './select-field-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkySelectFieldPickerComponent implements OnInit {
  public categories: string[];
  public data: Observable<any>;

  public readonly defaultCategory = 'any';
  public selectedCategory = this.defaultCategory;
  public selectedIds: any[] = [];

  @ViewChild(SkyListViewChecklistComponent)
  private listViewChecklist: SkyListViewChecklistComponent;

  constructor(
    private context: SkySelectFieldPickerContext,
    private instance: SkyModalInstance
  ) { }

  public ngOnInit() {
    this.data = this.context.data;

    if (this.context.selectMode === 'multiple' && this.context.selectedValue) {
      this.selectedIds = this.context.selectedValue.map((item: any) => item.id);
    }

    this.assignCategories();
  }

  public save() {
    this.latestData.subscribe((items: any) => {
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
    return (category === this.defaultCategory || item.data.category === category);
  }

  public onCategoryChange(change: any, filter: any) {
    // Reset the selected values when the category changes.
    this.listViewChecklist.clearSelections();
    filter.changed(change);
  }

  public onSelectedIdsChange(selectedMap: Map<string, boolean>) {
    this.latestData.subscribe((items: any[]) => {
      this.selectedIds = items.filter((item: any) => selectedMap.get(item.id))
        .map((item: any) => item.id);
    });
  }

  private assignCategories() {
    this.latestData.subscribe((items: any[]) => {
      const allCategories = items.map((item: any) => item.category);
      // Remove duplicate category names:
      this.categories = allCategories.filter((category: string, i: number, categories: string[]) => {
        return (category && categories.indexOf(category) === i);
      });
    });
  }

  private get latestData(): Observable<any> {
    return this.data.take(1);
  }
}
