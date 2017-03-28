import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  ViewChild,
  TemplateRef,
  AfterContentInit,
  AfterViewInit
} from '@angular/core';

import { SkyListFilterInlineComponent } from './list-filter-inline.component';

import {
  ListState,
  ListStateDispatcher
} from '../list/state';

import {
  ListFilterModel,
  ListToolbarItemModel,
  ListFilterDataModel
} from '../list/state';

import {
  Observable
} from 'rxjs/Observable';

@Component({
  selector: 'sky-list-filters-inline',
  templateUrl: './list-filters-inline.component.html'
})
export class SkyListFiltersInlineComponent implements AfterContentInit, AfterViewInit {

  @ContentChildren(SkyListFilterInlineComponent)
  private filters: QueryList<SkyListFilterInlineComponent>;

  @ViewChild('filterButton')
  private filterButtonTemplate: TemplateRef<any>;

  private inlineBarExpanded: boolean = false;

  private inlineFilters: Array<ListFilterModel> = [];

  private isFiltered: Observable<boolean>;

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher
  ) {}

  public ngAfterContentInit() {
    this.inlineFilters = this.filters.map(filter => {

      return new ListFilterModel({
        name: filter.name,
        filterFunction: filter.filterFunction,
        template: filter.template,
        value: filter.value
      });
    });

    this.inlineFilters.forEach(filter => {
      filter.onChange.subscribe((value: any) => {
        this.applyFilters();
      });
    });

    this.dispatcher.filtersLoad(this.inlineFilters);

    this.isFiltered = this.state.map(s => {
      return s.filters
        .filter(f => f.value !== '' && f.value !== undefined).length > 0;
    });
  }

  public applyFilters() {
    this.dispatcher.filtersUpdate(this.inlineFilters);
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

}
