import {
  Component,
  ContentChildren,
  QueryList,
  ViewChild,
  TemplateRef,
  AfterContentInit,
  AfterViewInit
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
export class SkyListFilterInlineComponent implements AfterContentInit, AfterViewInit {

  @ContentChildren(SkyListFilterInlineItemComponent)
  private filters: QueryList<SkyListFilterInlineItemComponent>;

  @ViewChild('filterButton')
  private filterButtonTemplate: TemplateRef<any>;

  private inlineBarExpanded: boolean = false;

  private inlineFilters: Array<SkyListFilterInlineModel> = [];

  private isFiltered: Observable<boolean>;

  constructor(
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

    this.isFiltered = this.state.map(s => {
      return s.filters;
    })
    .distinctUntilChanged()
    .map((filters) => {
      let activeFilters = filters
        .filter((f) => {
          return f.value !== '' &&
            f.value !== undefined &&
            f.value !== false &&
            f.value !== f.defaultValue;
        });
      return activeFilters.length > 0;
    });
  }

  public applyFilters() {
    this.dispatcher.filtersUpdate(this.getFilterModelFromInline(this.inlineFilters));
  }

  public ngAfterViewInit() {
    this.dispatcher.toolbarAddItems([
      new ListToolbarItemModel({ template: this.filterButtonTemplate, location: 'right'})
    ],
    0);
  }

  public filterButtonClick() {
    if (this.inlineFilters.length > 0) {
      this.inlineBarExpanded = !this.inlineBarExpanded;
    }
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
