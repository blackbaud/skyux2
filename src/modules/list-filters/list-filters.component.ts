/*import {
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

// This should probably be inline filters
@Component({
  selector: 'sky-list-filters',
  templateUrl: './list-filters.component.html',
  styleUrls: ['./list-filters.component.scss']
})
export class SkyListFiltersComponent implements AfterContentInit, AfterViewInit {

  @ContentChildren(SkyListFilterComponent)
  private filters: QueryList<SkyListFilterComponent>;

  @ViewChild('filterButton')
  private filterButtonTemplate: TemplateRef<any>;

  private inlineBarExpanded: boolean = false;

  private inlineFilters: Observable<ListFilterModel[]>;

  private modalFilters: Observable<ListFilterModel[]>;

  private activeModalFilters: Observable<ListFilterDataModel[]>;

  private isFiltered: Observable<boolean>;

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher,
    private modalService: SkyModalService
  ) {}

  public ngAfterContentInit() {
    let filterModels = this.filters.map(filter => {
      return new ListFilterModel(filter, filter.view !== undefined ? filter.view.id : undefined);
    });

    filterModels.forEach(filter => {
      filter.type === 'inline' ?
        filter.filterModel.onChange.subscribe(() => this.applyFilters()) :
        undefined
    });

    this.dispatcher.filtersLoad(filterModels);

    this.inlineFilters = this.state.map((s) => {
      return s.filters.filter(f => f.type === 'inline');
    }).distinctUntilChanged();

    this.modalFilters = this.state.map((s) => {
      return s.filters.filter(f => f.type !== 'inline');
    }).distinctUntilChanged();

    this.activeModalFilters = this.modalFilters.map((s) => {
      return s.filter(f => f.filterModel.value !== '' && f.filterModel.value !== undefined);
    })
    .map(f => f.map(filter => filter.filterModel));

    this.isFiltered = this.state.map(s => {
      return s.filters
        .filter(f => f.filterModel.value !== '' && f.filterModel.value !== undefined).length > 0;
    });
  }

  public ngAfterViewInit() {
    this.dispatcher.toolbarAddItems([
      new ListToolbarItemModel({ template: this.filterButtonTemplate, location: 'right'})
    ]);
  }

  public filterButtonClick() {
    this.inlineFilters
      .take(1)
      .subscribe(filters => {
        if (filters.length > 0) {
          this.inlineBarExpanded = !this.inlineBarExpanded;
        }
      });
  }

  public clearFilter(filterId: string) {
    this.state.map(s => s.filters)
      .take(1)
      .subscribe(filters => {
        let updatedFilters: ListFilterModel[] = [];
        filters.forEach((filter) => {
          let model = new ListFilterModel(filter, filter.view);
          model.filterModel = new ListFilterDataModel(filter.filterModel);
          model.filterModel.value = (model.filterModel.id === filterId) ? '' :
            model.filterModel.value;
          updatedFilters.push(model);
        });

        this.dispatcher.filtersUpdate(updatedFilters);
      });
  }
}*/
