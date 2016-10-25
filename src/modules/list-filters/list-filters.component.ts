import {
    Component, Input, ContentChildren, QueryList, ViewChild, TemplateRef,
    AfterContentInit, AfterViewInit
} from '@angular/core';
import { SkyModalService } from '../modal';
import { SkyListFilterComponent } from './list-filter.component';
import { SkyListComponent } from '../list';
import { ListState, ListStateDispatcher } from '../list/state';
import { ListFiltersLoadAction, ListFiltersUpdateAction } from '../list/state/filters/actions';
import { ListToolbarItemsLoadAction } from '../list-toolbar/state/items/actions';
import { ListToolbarItemModel } from '../list-toolbar/state/items/item.model';
import { ListFilterModel } from '../list/state/filters/filter.model';
import { SkyListFiltersModalComponent } from './list-filters-modal.component';

@Component({
  selector: 'sky-list-filters',
  templateUrl: './list-filters.component.html',
  styleUrls: ['./list-filters.component.scss']
})
export class SkyListFiltersComponent implements AfterContentInit, AfterViewInit {
  @Input() public modalTitle: string = 'Filters';
  @ContentChildren(SkyListFilterComponent) private filters: QueryList<SkyListFilterComponent>;
  @ViewChild('filterButton') private filterButtonTemplate: TemplateRef<any>;
  private list: SkyListComponent;
  private hasToolbar: boolean;
  private inlineBarExpanded: boolean = false;

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher,
    private modalService: SkyModalService
  ) {
  }

  public onListInit(list: SkyListComponent) {
    this.list = list;
    this.hasToolbar = list.hasToolbar;
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

    this.dispatcher.next(new ListFiltersLoadAction(filterModels));
  }

  public ngAfterViewInit() {
    if (
      this.list !== undefined &&
      this.list.toolbarDispatcher !== undefined &&
      this.filters.length > 0
    ) {
      setTimeout(() => this.list.toolbarDispatcher.next(new ListToolbarItemsLoadAction([
        new ListToolbarItemModel({ template: this.filterButtonTemplate, location: 'right' })
      ])));
    }
  }

  public applyFilters() {
    this.state.map(s => s.filters)
      .take(1)
      .subscribe(filters => this.dispatcher.next(new ListFiltersUpdateAction(filters)));
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

  public clearFilter(filter: any) {
    filter.value = '';
    this.state.map(s => s.filters)
      .take(1)
      .subscribe(filters => {
        this.dispatcher.next(new ListFiltersUpdateAction(filters));
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
        /* tslint:disable */
        s.filter(f => f.filterModel.value != '' && f.filterModel.value != null)
        /* tslint:enable */
      )
      .map(f => f.map(x => x.filterModel));
  }

  get filtered() {
    return this.state.map(s =>
        /* tslint:disable */
        s.filters.filter(f => f.filterModel.value != '' && f.filterModel.value != null).length > 0
        /* tslint:enable */
      );
  }
}
