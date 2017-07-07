import {
  Component,
  ContentChildren,
  QueryList,
  ViewChild,
  TemplateRef,
  Input,
  OnInit,
  AfterContentInit,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  ListToolbarConfigSetSearchEnabledAction,
  ListToolbarConfigSetSortSelectorEnabledAction
} from './state/config/actions';
import { Observable } from 'rxjs/Observable';
import {
  ListToolbarState,
  ListToolbarStateDispatcher,
  ListToolbarStateModel
} from './state';

import {
  ListToolbarModel,
  ListToolbarItemModel,
  ListToolbarSetTypeAction,
  ListState,
  ListStateDispatcher,
  ListSortLabelModel,
  ListSortFieldSelectorModel,
  ListFilterModel,
  ListPagingSetPageNumberAction
} from '../list/state';

import { SkyListToolbarItemComponent } from './list-toolbar-item.component';

import { SkyListToolbarSortComponent } from './list-toolbar-sort.component';

import {
  SkyListFilterSummaryComponent,
  SkyListFilterInlineComponent
} from '../list-filters';

import { getValue } from 'microedge-rxstate/dist/helpers';

import { SkySearchComponent } from '../search';

@Component({
  selector: 'sky-list-toolbar',
  templateUrl: './list-toolbar.component.html',
  styleUrls: ['./list-toolbar.component.scss'],
  providers: [
    ListToolbarState,
    ListToolbarStateDispatcher,
    ListToolbarStateModel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListToolbarComponent implements OnInit, AfterContentInit {
  @Input()
  public placeholder: string;
  @Input()
  public searchEnabled: boolean | Observable<boolean>;

  @ViewChild('searchComponent')
  public searchComponent: SkySearchComponent;

  @Input()
  public sortSelectorEnabled: boolean | Observable<boolean>;

  @Input()
  public toolbarType: string = 'standard';

  @Input()
  public searchText: string | Observable<string>;

  public sortSelectors: Observable<Array<any>>;

  public searchTextInput: Observable<string>;

  public view: Observable<string>;

  public leftTemplates: Observable<any>;

  public centerTemplates: Observable<any>;

  public rightTemplates: Observable<any>;

  public type: Observable<string>;

  public isSearchEnabled: Observable<boolean>;

  public isSortSelectorEnabled: Observable<boolean>;

  public appliedFilters: Observable<Array<ListFilterModel>>;

  public hasAppliedFilters: Observable<boolean>;

  public showFilterSummary: boolean;

  public hasInlineFilters: boolean;

  public inlineFilterBarExpanded: boolean = false;

  public hasAdditionalToolbarSection: Observable<boolean>;

  @ContentChildren(SkyListToolbarItemComponent)
  private toolbarItems: QueryList<SkyListToolbarItemComponent>;

  @ContentChildren(SkyListToolbarSortComponent)
  private toolbarSorts: QueryList<SkyListToolbarSortComponent>;

  @ContentChildren(SkyListFilterSummaryComponent)
  private filterSummary: QueryList<SkyListFilterSummaryComponent>;

  @ContentChildren(SkyListFilterInlineComponent)
  private inlineFilter: QueryList<SkyListFilterInlineComponent>;

  @ViewChild('search')
  private searchTemplate: TemplateRef<any>;

  @ViewChild('sortSelector')
  private sortSelectorTemplate: TemplateRef<any>;

  @ViewChild('inlineFilterButton')
  private inlineFilterButtonTemplate: TemplateRef<any>;

  private hasSortSelectors: boolean = false;

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher,
    private toolbarState: ListToolbarState,
    public toolbarDispatcher: ListToolbarStateDispatcher
  ) {
  }

  public ngOnInit() {
    this.dispatcher.toolbarExists(true);
    getValue(this.searchText, (searchText: string) => this.updateSearchText(searchText));

    getValue(this.searchEnabled, (searchEnabled: boolean) =>
      this.toolbarDispatcher.next(
        new ListToolbarConfigSetSearchEnabledAction(
          searchEnabled === undefined ? true : searchEnabled
        )
      )
    );

    getValue(this.toolbarType, (type: string) => {
      this.dispatcher.next(new ListToolbarSetTypeAction(this.toolbarType));

    });

    getValue(this.sortSelectorEnabled, (sortSelectorEnabled: any) =>
      this.toolbarDispatcher.next(
        new ListToolbarConfigSetSortSelectorEnabledAction(
          sortSelectorEnabled === undefined ? true : sortSelectorEnabled
        )
      )
     );

    this.sortSelectors = this.getSortSelectors();

    // Initialize the sort toolbar item if necessary
    this.sortSelectors.distinctUntilChanged().subscribe((currentSort) => {

      if (currentSort.length > 0 && !this.hasSortSelectors) {
        this.hasSortSelectors = true;
        this.dispatcher.toolbarAddItems([
          new ListToolbarItemModel({
            id: 'sort-selector',
            template: this.sortSelectorTemplate,
            location: 'right'
          })
        ], 0);
      } else if (currentSort.length < 1 && this.hasSortSelectors) {
        this.hasSortSelectors = false;
        this.dispatcher.toolbarRemoveItems([
          'sort-selector'
        ]);
      }
    });

    this.searchTextInput = this.state.map(s => s.search.searchText).distinctUntilChanged();

    this.view = this.state.map(s => s.views.active).distinctUntilChanged();

    this.leftTemplates = this.getLeftTemplates();

    this.centerTemplates = this.getCenterTemplates();

    this.rightTemplates = this.getRightTemplates();

    this.type = this.state.map((state) => state.toolbar.type).distinctUntilChanged();

    this.type.subscribe((toolbarType) => {
      if (toolbarType === 'search') {
        this.dispatcher.toolbarRemoveItems(['search']);
      } else {
        this.dispatcher.toolbarAddItems([
          new ListToolbarItemModel({
            id: 'search',
            template: this.searchTemplate,
            location: 'center'
          })
        ]);
      }
    });

    this.isSearchEnabled = this.toolbarState.map(s => s.config)
      .distinctUntilChanged().map(c => c.searchEnabled);

    this.isSortSelectorEnabled = this.toolbarState.map(s => s.config)
      .distinctUntilChanged().map(c => c.sortSelectorEnabled);

    this.hasAppliedFilters = this.state.map(s => {
      return s.filters;
    })
    .distinctUntilChanged()
    .map((filters) => {
      let activeFilters = filters.filter((f) => {
          return f.value !== '' &&
            f.value !== undefined &&
            f.value !== false &&
            f.value !== f.defaultValue;
        });
      return activeFilters.length > 0;
    });

    this.hasAdditionalToolbarSection = this.state.map((current) => {
      return current.toolbar.items.length > 0;
    });
  }

  public ngAfterContentInit() {
    this.toolbarItems.forEach((toolbarItem) => {
      this.dispatcher.toolbarAddItems(
        [new ListToolbarItemModel(toolbarItem)],
        toolbarItem.index
      );
    });

    let sortModels = this.toolbarSorts.map(sort =>
      new ListSortLabelModel(
        {
          text: sort.label,
          fieldSelector: sort.field,
          fieldType: sort.type,
          global: true,
          descending: sort.descending
        }
      )
    );

    this.dispatcher.sortSetGlobal(sortModels);

    this.showFilterSummary = this.filterSummary.length > 0;
    this.hasInlineFilters = this.inlineFilter.length > 0;
    if (this.hasInlineFilters) {
       this.dispatcher.toolbarAddItems([
        new ListToolbarItemModel({ template: this.inlineFilterButtonTemplate, location: 'right'})
      ],
      0);
    }
  }

  public setSort(sort: ListSortLabelModel): void {
    this.dispatcher.sortSetFieldSelectors(
      [{fieldSelector: sort.fieldSelector, descending: sort.descending}]
    );
  }

  public inlineFilterButtonClick() {
    this.inlineFilterBarExpanded = !this.inlineFilterBarExpanded;
  }

  public updateSearchText(searchText: string) {
    this.state.take(1).subscribe((currentState) => {
      this.dispatcher.searchSetText(searchText);
      if (currentState.paging.pageNumber && currentState.paging.pageNumber !== 1) {
        this.dispatcher.next(
          new ListPagingSetPageNumberAction(Number(1))
        );
      }
    });

  }

  private itemIsInView(itemView: string, activeView: string) {
    return (itemView === undefined || itemView === activeView);
  }

  private getSortSelectors() {
    return Observable.combineLatest(
      this.state.map(s => s.sort.available).distinctUntilChanged(),
      this.state.map(s => s.sort.global).distinctUntilChanged(),
      this.state.map(s => s.sort.fieldSelectors).distinctUntilChanged(),
      (
        available: Array<ListSortLabelModel>,
        global: Array<ListSortLabelModel>,
        fieldSelectors: Array<ListSortFieldSelectorModel>
      ) => {

        // Get sorts that are in the global that are not in the available
        let sorts = global.filter(
          g => available.filter(a => a.fieldSelector === g.fieldSelector).length === 0
        );

        let resultSortSelectors = [...sorts, ...available].map(sortLabels => {
          let fs = fieldSelectors.filter(f => {
            return f.fieldSelector === sortLabels.fieldSelector
              && f.descending === sortLabels.descending;
          });
          let selected = false;
          if (fs.length > 0) {
            selected = true;
          }

          return {
            sort: sortLabels,
            selected: selected
          };
        });

        return resultSortSelectors;
      });
  }

  private getLeftTemplates() {
    return Observable.combineLatest(
      this.state.map(s => s.toolbar).distinctUntilChanged(),
      this.view,
      (toolbar: ListToolbarModel, view: string) => toolbar.items.filter(
        (i: ListToolbarItemModel) =>
          i.location === 'left' && this.itemIsInView(i.view, view)
      )
    );
  }

  private getCenterTemplates() {
    return Observable.combineLatest(
      this.state.map(s => s.toolbar).distinctUntilChanged(),
      this.view,
      (toolbar: ListToolbarModel, view: string) => toolbar.items.filter(
        (i: ListToolbarItemModel) => {
          return i.location === 'center' && this.itemIsInView(i.view, view);
        }
      )
    );
  }

  private getRightTemplates() {
    return Observable.combineLatest(
      this.state.map(s => s.toolbar).distinctUntilChanged(),
      this.view.distinctUntilChanged(),
      (toolbar: ListToolbarModel, view: string) => {
        return toolbar.items.filter(
        (i: ListToolbarItemModel) =>
          i.location === 'right' && this.itemIsInView(i.view, view)
        );
      });
  }

}
