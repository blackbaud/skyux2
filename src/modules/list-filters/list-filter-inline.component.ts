import {
  Component,
  ContentChildren,
  QueryList,
  ViewChild,
  TemplateRef,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';

import { SkyListFilterInlineItemComponent } from './list-filter-inline-item.component';

import {
  ListState,
  ListStateDispatcher
} from '../list/state';

import {
  ListFilterModel,
  ListToolbarItemModel
} from '../list/state';

import {
  Observable
} from 'rxjs/Observable';

import {
  SkyListFilterInlineModel
} from './list-filter-inline.model';

@Component({
  selector: 'sky-list-filter-inline',
  templateUrl: './list-filter-inline.component.html'
})
export class SkyListFilterInlineComponent implements AfterContentInit {

  @ContentChildren(SkyListFilterInlineItemComponent)
  private filters: QueryList<SkyListFilterInlineItemComponent>;

  @ViewChild('filterButton')
  private filterButtonTemplate: TemplateRef<any>;

  private inlineBarExpanded: boolean = false;

  private inlineFilters: Array<SkyListFilterInlineModel> = [];

  private isFiltered: Observable<boolean>;

  constructor(
    private ref: ChangeDetectorRef,
    private state: ListState,
    private dispatcher: ListStateDispatcher
  ) {}

  public ngAfterContentInit() {
    this.inlineFilters = this.filters.map(filter => {
      return new SkyListFilterInlineModel({
        name: filter.name,
        filterFunction: filter.filterFunction,
        template: filter.template,
        value: filter.value,
        defaultValue: filter.defaultValue
      });
    });

    this.inlineFilters.forEach(filter => {
      filter.onChange.subscribe((value: any) => {
        this.applyFilters();
      });
    });

    this.dispatcher.filtersLoad(this.getFilterModelFromInline(this.inlineFilters));
  }

  public applyFilters() {
    this.dispatcher.filtersUpdate(this.getFilterModelFromInline(this.inlineFilters));
  }

  private getFilterModelFromInline(inlineFilters: Array<SkyListFilterInlineModel>) {
    return inlineFilters.map((filter) => {
      return new ListFilterModel({
        name: filter.name,
        value: filter.value,
        filterFunction: filter.filterFunction,
        defaultValue: filter.defaultValue
      });
    });
  }

}
