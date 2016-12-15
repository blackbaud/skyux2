import {
    Component, Input, ContentChildren, QueryList, ViewChild, TemplateRef,
    AfterContentInit, AfterViewInit
} from '@angular/core';
import { SkyModalService } from '../modal';
import { SkyListFilterComponent } from './list-filter.component';
import { ListState, ListStateDispatcher } from '../list/state';
import { ListToolbarItemModel } from '../list/state/toolbar/toolbar-item.model';
import { ListFilterModel } from '../list/state/filters/filter.model';
import { ListFilterDataModel } from '../list/state/filters/filter-data.model';
import { SkyListFiltersModalComponent } from './list-filters-modal.component';

@Component({
  selector: 'sky-list-filters',
  template: require('./list-filters.component.html'),
  styles: [require('./list-filters.component.scss')]
})
export class SkyListFiltersComponent implements AfterContentInit, AfterViewInit {
  @Input() public modalTitle: string = 'Filters';
  @ContentChildren(SkyListFilterComponent) private filters: QueryList<SkyListFilterComponent>;
  @ViewChild('filterButton') private filterButtonTemplate: TemplateRef<any>;
  private inlineBarExpanded: boolean = false;

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher,
    private modalService: SkyModalService
  ) {
  }

  public ngAfterContentInit() {
    let filterModels = this.filters.map(cmp =>
      new ListFilterModel(cmp, cmp.view !== undefined ? cmp.view.id : undefined)
    );

    filterModels.forEach(f =>
      f.type === 'inline' ?
        f.filterModel.onChange.subscribe(() => this.applyFilters()) :
        undefined
      );

    this.dispatcher.filtersLoad(filterModels);
  }

  public ngAfterViewInit() {
    this.dispatcher.toolbarAddItems([
      new ListToolbarItemModel({ template: this.filterButtonTemplate, location: 'right' })
    ]);
  }

  public applyFilters() {
    this.state.map(s => s.filters)
      .take(1)
      .subscribe(filters => this.dispatcher.filtersUpdate(filters));
  }

  public openFiltersModal() {
    let providers = [
      { provide: ListState, useValue: this.state },
      { provide: ListStateDispatcher, useValue: this.dispatcher },
      { provide: String, useValue: this.modalTitle }
    ];

    this.modalService.open(SkyListFiltersModalComponent, providers);
  }

  public filterButtonClick() {
    this.inlineFilters
      .take(1)
      .subscribe(filters => {
        if (filters.length > 0) {
          this.inlineBarExpanded = !this.inlineBarExpanded;
        } else {
          this.openFiltersModal();
        }
      });
  }

  public clearFilter(filterId: string) {
    this.state.map(s => s.filters)
      .take(1)
      .subscribe(filters => {
        let updatedFilters: ListFilterModel[] = [];
        filters.forEach((f) => {
          let model = new ListFilterModel(f, f.view);
          model.filterModel = new ListFilterDataModel(f.filterModel);
          model.filterModel.value = (model.filterModel.id === filterId) ?
            '' : model.filterModel.value;
          updatedFilters.push(model);
        });

        this.dispatcher.filtersUpdate(updatedFilters);
      });
  }

  get inlineFilters() {
    return this.state.map(s => s.filters.filter(f => f.type === 'inline'))
      .distinctUntilChanged();
  }

  get modalFilters() {
    return this.state.map(s => s.filters.filter(f => f.type !== 'inline'))
      .distinctUntilChanged();
  }

  get activeModalFilters() {
    return this.modalFilters.map(s =>
        /* tslint:disable-next-line */
        s.filter(f => f.filterModel.value != '' && f.filterModel.value != null)
    )
      .map(f => f.map(x => x.filterModel));
  }

  get filtered() {
    return this.state.map(s =>
        /* tslint:disable-next-line */
        s.filters.filter(f => f.filterModel.value != '' && f.filterModel.value != null).length > 0
      );
  }
}
