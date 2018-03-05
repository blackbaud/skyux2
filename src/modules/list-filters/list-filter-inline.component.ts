import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnDestroy,
  QueryList
} from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { SkyListFilterInlineItemComponent } from './list-filter-inline-item.component';

import {
  ListStateDispatcher
} from '../list/state';

import {
  ListFilterModel
} from '../list/state';

import {
  SkyListFilterInlineModel
} from './list-filter-inline.model';

@Component({
  selector: 'sky-list-filter-inline',
  templateUrl: './list-filter-inline.component.html'
})
export class SkyListFilterInlineComponent implements AfterContentInit, OnDestroy {
  public inlineFilters: Array<SkyListFilterInlineModel> = [];

  @ContentChildren(SkyListFilterInlineItemComponent)
  private filters: QueryList<SkyListFilterInlineItemComponent>;

  private ngUnsubscribe = new Subject();

  constructor(
    private dispatcher: ListStateDispatcher
  ) { }

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
      filter.onChange
        .takeUntil(this.ngUnsubscribe)
        .subscribe((value: any) => {
          this.applyFilters();
        });
    });

    this.dispatcher.filtersUpdate(this.getFilterModelFromInline(this.inlineFilters));
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
