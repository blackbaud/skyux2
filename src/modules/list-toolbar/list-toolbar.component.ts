import {
  Component, ContentChildren, QueryList, ViewChild, TemplateRef, Input,
  OnInit, AfterContentInit, ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';
import { ListToolbarState, ListToolbarStateDispatcher, ListToolbarStateModel } from './state';
import { ListToolbarItemModel } from './state/items/item.model';
import { ListToolbarItemsLoadAction } from './state/items/actions';
import { SkyListToolbarItemComponent } from './list-toolbar-item.component';
import { ListState, ListStateDispatcher } from '../list/state';
import {
  ListSortSetAvailableAction, ListSortSetGlobalAction, ListSortSetFieldSelectorsAction
} from '../list/state/sort/actions';
import { ListSearchSetSearchTextAction } from '../list/state/search/actions';
import { SkyListComponent } from '../list/list.component';
import { SkyListToolbarSortComponent } from './list-toolbar-sort.component';
import { ListSortLabelModel } from '../list/state/sort/label.model';
import { getValue } from 'microedge-rxstate/helpers';
import { ListSearchSetFunctionsAction } from '../list/state/search/actions';
import { ListViewsSetActiveAction } from '../list/state/views/actions';
import {
  ListToolbarConfigSetFilterEnabledAction, ListToolbarConfigSetSearchEnabledAction,
  ListToolbarConfigSetSortSelectorEnabledAction, ListToolbarConfigSetViewSelectorEnabledAction
} from './state/config/actions';

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
  @Input() public type: string = 'standard';
  @Input() public placeholder: string = 'Find in this list';
  @Input() public searchEnabled: boolean | Observable<boolean>;
  @Input() public filterEnabled: boolean | Observable<boolean>;
  @Input() public viewSelectorEnabled: boolean | Observable<boolean>;
  @Input() public sortSelectorEnabled: boolean | Observable<boolean>;
  /* tslint:disable */
  @Input('searchText') private searchTextInput: string | Observable<string>;
  protected list: SkyListComponent;
  /* tslint:enable */

  @ContentChildren(SkyListToolbarItemComponent)
  private toolbarItems: QueryList<SkyListToolbarItemComponent>;
  @ContentChildren(SkyListToolbarSortComponent)
  private toolbarSorts: QueryList<SkyListToolbarSortComponent>;
  @ViewChild('search') private searchTemplate: TemplateRef<any>;
  @ViewChild('viewSelector') private viewSelectorTemplate: TemplateRef<any>;
  @ViewChild('sortSelector') private sortSelectorTemplate: TemplateRef<any>;

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher,
    private toolbarState: ListToolbarState,
    public toolbarDispatcher: ListToolbarStateDispatcher
  ) {
  }

  public onListInit(list: SkyListComponent) {
    this.list = list;
  }

  public ngOnInit() {
    getValue(this.searchTextInput, searchText => this.updateSearchText(searchText));
    getValue(this.searchEnabled, searchEnabled =>
      this.toolbarDispatcher.next(
        new ListToolbarConfigSetSearchEnabledAction(
          searchEnabled === undefined ? true : searchEnabled
        )
      )
    );
    getValue(this.filterEnabled, filterEnabled =>
      this.toolbarDispatcher.next(
        new ListToolbarConfigSetFilterEnabledAction(
          filterEnabled === undefined ? true : filterEnabled
        )
      )
    );
    getValue(this.viewSelectorEnabled, viewSelectorEnabled =>
      this.toolbarDispatcher.next(
        new ListToolbarConfigSetViewSelectorEnabledAction(
          viewSelectorEnabled === undefined ? true : viewSelectorEnabled
        )
      )
    );
    getValue(this.sortSelectorEnabled, sortSelectorEnabled =>
      this.toolbarDispatcher.next(
        new ListToolbarConfigSetSortSelectorEnabledAction(
          sortSelectorEnabled === undefined ? true : sortSelectorEnabled
        )
      )
    );

    this.toolbarDispatcher.next(new ListToolbarItemsLoadAction([
      this.type !== 'search' ?
        new ListToolbarItemModel({ template: this.searchTemplate, location: 'center' }) :
        undefined,
      new ListToolbarItemModel({ template: this.sortSelectorTemplate, location: 'right' }),
      new ListToolbarItemModel({ template: this.viewSelectorTemplate, location: 'right' })
    ].filter(s => s !== undefined)));
  }

  public ngAfterContentInit() {
    this.toolbarItems.forEach(toolbarItem => this.toolbarDispatcher.next(
      new ListToolbarItemsLoadAction(
        [new ListToolbarItemModel(toolbarItem)],
        toolbarItem.index
      )
    ));

    let sortModels = this.toolbarSorts.map(sort =>
      new ListSortLabelModel(
        { text: sort.label, fieldSelector: sort.field, fieldType: sort.type, global: true }
      )
    );
    this.dispatcher.next(new ListSortSetGlobalAction(sortModels));
  }

  get view() {
    return this.state.map(s => s.views.active).distinctUntilChanged();
  }

  get searchText() {
    return this.state.map(s => s.search.searchText).distinctUntilChanged();
  }

  get leftTemplates() {
    return Observable.combineLatest(
      this.toolbarState.map(s => s.items).distinctUntilChanged(),
      this.view,
      (items, viewName) => items.items.filter(
        i => i.location === 'left' && (i.viewName === undefined || i.viewName === viewName)
      )
    );
  }

  get centerTemplates() {
    return Observable.combineLatest(
      this.toolbarState.map(s => s.items).distinctUntilChanged(),
      this.view,
      (items, view) => items.items.filter(
        i => i.location === 'center' && (i.view === undefined || i.view === view)
      )
    );
  }

  get rightTemplates() {
    return Observable.combineLatest(
      this.toolbarState.map(s => s.items).distinctUntilChanged(),
      this.view.distinctUntilChanged(),
      (items, view) => items.items.filter(
        i => i.location === 'right' && (i.view === undefined || i.view === view)
      )
    );
  }

  public setActiveView(view: any): void {
    this.dispatcher.next(new ListSearchSetFunctionsAction([]));
    this.dispatcher.next(new ListSortSetAvailableAction([]));
    this.dispatcher.next(new ListViewsSetActiveAction(view.id));
  }

  public setSort(sort: any, descending: any): void {
    this.dispatcher.next(
      new ListSortSetFieldSelectorsAction([`${sort.fieldSelector}:${descending ? 'DESC' : 'ASC'}`])
    );
  }

  private updateSearchText(searchText: string) {
    this.dispatcher.next(new ListSearchSetSearchTextAction(searchText));
  }

  private get isSearchEnabled() {
    return this.toolbarState.map(s => s.config)
      .distinctUntilChanged()
      .map(c => c.searchEnabled);
  }

  private get isFilterEnabled() {
    return this.toolbarState.map(s => s.config)
      .distinctUntilChanged()
      .map(c => c.filterEnabled);
  }

  private get isViewSelectorEnabled() {
    return this.toolbarState.map(s => s.config)
      .distinctUntilChanged()
      .map(c => c.viewSelectorEnabled);
  }

  private get isSortSelectorEnabled() {
    return this.toolbarState.map(s => s.config)
      .distinctUntilChanged()
      .map(c => c.sortSelectorEnabled);
  }

  private get views() {
    return this.state.map(s => s.views.views);
  }

  private get sortSelectors() {
    return Observable.combineLatest(
      this.state.map(s => s.sort.available).distinctUntilChanged(),
      this.state.map(s => s.sort.global).distinctUntilChanged(),
      this.state.map(s => s.sort.fieldSelectors).distinctUntilChanged(),
      (available: Array<any>, global: Array<any>, fieldSelectors: Array<any>) => {
        let sorts = global.filter(
          g => available.filter(a => a.fieldSelector === g.fieldSelector).length === 0
        );

        return [...sorts, ...available].map(a => {
          let fs = fieldSelectors.filter(f => f.fieldSelector === a.fieldSelector);
          let descending = false;
          let selected = false;
          if (fs.length > 0) {
            descending = fs[0].descending;
            selected = true;
          }

          return {
            sort: a,
            selected: selected && !descending,
            selectedDesc: selected && descending
          };
        });
      });
  }
}
