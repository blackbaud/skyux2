import {
  Component, ContentChildren, QueryList, ViewChild, TemplateRef, Input,
  OnInit, AfterContentInit, ChangeDetectionStrategy
} from '@angular/core';
import {
  ListToolbarConfigSetFilterEnabledAction, ListToolbarConfigSetSearchEnabledAction,
  ListToolbarConfigSetSortSelectorEnabledAction, ListToolbarConfigSetViewSelectorEnabledAction
} from './state/config/actions';
import { Observable } from 'rxjs';
import { ListToolbarState, ListToolbarStateDispatcher, ListToolbarStateModel } from './state';
import { ListToolbarModel } from '../list/state/toolbar/toolbar.model';
import { ListToolbarItemModel } from '../list/state/toolbar/toolbar-item.model';
import { SkyListToolbarItemComponent } from './list-toolbar-item.component';
import { ListState, ListStateDispatcher } from '../list/state';
import { SkyListToolbarSortComponent } from './list-toolbar-sort.component';
import { ListSortLabelModel } from '../list/state/sort/label.model';
import { getValue } from 'microedge-rxstate/dist/helpers';

@Component({
  selector: 'sky-list-toolbar',
  template: require('./list-toolbar.component.html'),
  styles: [require('./list-toolbar.component.scss')],
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

  public ngOnInit() {
    this.dispatcher.toolbarExists(true);
    getValue(this.searchTextInput, (searchText: string) => this.updateSearchText(searchText));
    getValue(this.searchEnabled, (searchEnabled: any) =>
      this.toolbarDispatcher.next(
        new ListToolbarConfigSetSearchEnabledAction(
          searchEnabled === undefined ? true : searchEnabled
        )
      )
    );
    getValue(this.filterEnabled, (filterEnabled: any) =>
      this.toolbarDispatcher.next(
        new ListToolbarConfigSetFilterEnabledAction(
          filterEnabled === undefined ? true : filterEnabled
        )
      )
    );
    getValue(this.viewSelectorEnabled, (viewSelectorEnabled: any) =>
      this.toolbarDispatcher.next(
        new ListToolbarConfigSetViewSelectorEnabledAction(
          viewSelectorEnabled === undefined ? true : viewSelectorEnabled
        )
      )
    );
    getValue(this.sortSelectorEnabled, (sortSelectorEnabled: any) =>
      this.toolbarDispatcher.next(
        new ListToolbarConfigSetSortSelectorEnabledAction(
          sortSelectorEnabled === undefined ? true : sortSelectorEnabled
        )
      )
    );

    this.dispatcher.toolbarAddItems([
      this.type !== 'search' ?
        new ListToolbarItemModel({
          id: 'search',
          template: this.searchTemplate,
          location: 'center'
        }) :
        undefined,
      new ListToolbarItemModel({
        id: 'sort-selector',
        template: this.sortSelectorTemplate,
        location: 'right'
      }),
      new ListToolbarItemModel({
        id: 'view-selector',
        template: this.viewSelectorTemplate,
        location: 'right'
      })
    ].filter(s => s !== undefined));
  }

  public ngAfterContentInit() {
    this.toolbarItems.forEach(toolbarItem =>
      this.dispatcher.toolbarAddItems(
        [new ListToolbarItemModel(toolbarItem)],
        toolbarItem.index
      )
    );

    let sortModels = this.toolbarSorts.map(sort =>
      new ListSortLabelModel(
        {
          text: sort.label,
          fieldSelector: sort.field,
          fieldType: sort.type,
          global: true
        }
      )
    );

    this.dispatcher.sortSetGlobal(sortModels);
  }

  get view() {
    return this.state.map(s => s.views.active).distinctUntilChanged();
  }

  get searchText() {
    return this.state.map(s => s.search.searchText).distinctUntilChanged();
  }

  get leftTemplates() {
    return Observable.combineLatest(
      this.state.map(s => s.toolbar).distinctUntilChanged(),
      this.view,
      (toolbar: ListToolbarModel, view: string) => toolbar.items.filter(
        (i: ListToolbarItemModel) =>
          i.location === 'left' && (i.view === undefined || i.view === view)
      )
    );
  }

  get centerTemplates() {
    return Observable.combineLatest(
      this.state.map(s => s.toolbar).distinctUntilChanged(),
      this.view,
      (toolbar: ListToolbarModel, view: string) => toolbar.items.filter(
        (i: ListToolbarItemModel) =>
          i.location === 'center' && (i.view === undefined || i.view === view)
      )
    );
  }

  get rightTemplates() {
    return Observable.combineLatest(
      this.state.map(s => s.toolbar).distinctUntilChanged(),
      this.view.distinctUntilChanged(),
      (toolbar: ListToolbarModel, view: string) => {
        return toolbar.items.filter(
        (i: ListToolbarItemModel) =>
          i.location === 'right' && (i.view === undefined || i.view === view)
      );
      });
  }

  public setActiveView(view: any): void {
    this.dispatcher.searchSetFunctions([]);
    this.dispatcher.sortSetAvailable([]);
    this.dispatcher.viewsSetActive(view.id);
  }

  public setSort(sort: any, descending: any): void {
    this.dispatcher.sortSetFieldSelectors(
      [`${sort.fieldSelector}:${descending ? 'DESC' : 'ASC'}`]
    );
  }

  private updateSearchText(searchText: string) {
    this.dispatcher.searchSetText(searchText);
  }

  private get isSearchEnabled() {
    return this.toolbarState.map(s => s.config)
      .distinctUntilChanged()
      .map(c => c.searchEnabled);
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
