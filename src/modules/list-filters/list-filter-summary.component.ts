import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  ViewChild,
  TemplateRef,
  AfterContentInit,
  Output,
  EventEmitter
} from '@angular/core';

import { SkyModalService } from '../modal';

import { SkyListFilterComponent } from './list-filter.component';

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
  selector: 'sky-list-filter-summary',
  templateUrl: './list-filter-summary.component.html'
})
export class SkyListFilterSummaryComponent implements AfterContentInit {

  @Output()
  public summaryItemClick = new EventEmitter<ListFilterModel>();

  public appliedFilters: Observable<Array<ListFilterModel>>;

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher
  ) {}

  public ngAfterContentInit() {
    this.appliedFilters = this.state.map((state) => {
      return state.filters;
    });
  }

  public filterSummaryItemDismiss(index: number) {
    this.appliedFilters.take(1).subscribe((filters) => {
      filters.splice(index, 1);
      this.dispatcher.filtersUpdate(filters.slice());
    });
  }

  public filterSummaryItemClick(item: ListFilterModel) {
    this.summaryItemClick.emit(item);
  }
}
