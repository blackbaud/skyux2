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

import { SkyListFilterInlineItemComponent } from './list-filter-inline-item.component';

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
  selector: 'sky-list-filter-inline',
  templateUrl: './list-filter-inline.component.html'
})
export class SkyListFilterInlineComponent implements AfterContentInit, AfterViewInit {

  @Input()
  filtersActive: boolean = false;

  @ContentChildren(SkyListFilterInlineItemComponent)
  private filters: QueryList<SkyListFilterInlineItemComponent>;

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
      console.log('default', filter.defaultValue);
      return new ListFilterModel({
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

    this.dispatcher.filtersLoad(this.inlineFilters);

    this.isFiltered = this.state.map(s => {
      return s.filters
    }).distinctUntilChanged()
    .map((filters) => {
      let activeFilters = filters
        .filter((f) => {
          console.log('value', f.value, 'default', f.defaultValue);
          return f.value !== '' &&
            f.value !== undefined &&
            f.value !== false &&
            f.value !== f.defaultValue;
        });
      return activeFilters.length > 0;
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
