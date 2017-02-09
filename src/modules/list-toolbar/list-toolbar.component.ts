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
  ListToolbarConfigSetSearchEnabledAction
} from './state/config/actions';
import { Observable } from 'rxjs';
import {
  ListToolbarState,
  ListToolbarStateDispatcher,
  ListToolbarStateModel
} from './state';
import {
  ListToolbarModel,
  ListToolbarItemModel,
  ListToolbarSetTypeAction
} from '../list/state';
import { SkyListToolbarItemComponent } from './list-toolbar-item.component';
import { ListState, ListStateDispatcher } from '../list/state';
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
  public toolbarType: string = 'standard';

  @Input()
  public searchText: string | Observable<string>;

  @ContentChildren(SkyListToolbarItemComponent)
  private toolbarItems: QueryList<SkyListToolbarItemComponent>;

  @ViewChild('search')
  private searchTemplate: TemplateRef<any>;

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
    this.dispatcher.toolbarAddItems([
      this.toolbarType !== 'search' ?
        new ListToolbarItemModel({
          id: 'search',
          template: this.searchTemplate,
          location: 'center'
       }) : undefined
    ].filter(item => item !== undefined));
  }

  public ngAfterContentInit() {
    this.toolbarItems.forEach(toolbarItem =>
      this.dispatcher.toolbarAddItems(
        [new ListToolbarItemModel(toolbarItem)],
        toolbarItem.index
      )
    );
  }

  get searchTextInput() {
    return this.state.map(s => s.search.searchText).distinctUntilChanged();
  }

  get view() {
    return this.state.map(s => s.views.active).distinctUntilChanged();
  }

  get leftTemplates() {
    return Observable.combineLatest(
      this.state.map(s => s.toolbar).distinctUntilChanged(),
      this.view,
      (toolbar: ListToolbarModel, view: string) => toolbar.items.filter(
        (i: ListToolbarItemModel) =>
          i.location === 'left' && this.itemIsInView(i.view, view)
      )
    );
  }

  get centerTemplates() {
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

  get rightTemplates() {
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

  private itemIsInView(itemView: string, activeView: string) {
    return (itemView === undefined || itemView === activeView);
  }

  private updateSearchText(searchText: string) {
    this.dispatcher.searchSetText(searchText);
  }

  get type() {
    return this.state.map((state) => {
      return state.toolbar.type
    }).distinctUntilChanged();
  }

  private get isSearchEnabled() {
    return this.toolbarState.map(s => s.config)
      .distinctUntilChanged()
      .map(c => c.searchEnabled);
  }
}
