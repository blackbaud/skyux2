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
  selector: 'sky-list-filter-button',
  templateUrl: './list-filter-button.component.html'
})
export class SkyListFilterButtonComponent implements AfterViewInit {

  @ViewChild('filterButton')
  private filterButtonTemplate: TemplateRef<any>;

  constructor(
    private dispatcher: ListStateDispatcher
  ) {}

  public ngAfterViewInit() {
    this.dispatcher.toolbarAddItems([
      new ListToolbarItemModel({
        template: this.filterButtonTemplate,
        location: 'right'
      })
    ],
    0);
  }
}
