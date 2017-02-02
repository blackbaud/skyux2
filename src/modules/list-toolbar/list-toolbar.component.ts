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
import { ListToolbarModel } from '../list/state/toolbar/toolbar.model';
import { ListToolbarItemModel } from '../list/state/toolbar/toolbar-item.model';
import { SkyListToolbarItemComponent } from './list-toolbar-item.component';
import { ListState, ListStateDispatcher } from '../list/state';
import { getValue } from 'microedge-rxstate/dist/helpers';

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

  /* tslint:disable */
  @Input('searchText')
  private searchTextInput: string | Observable<string>;
  /* tslint:enable */

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
    getValue(this.searchTextInput, (searchText: string) => this.updateSearchText(searchText));
    getValue(this.searchEnabled, (searchEnabled: any) =>
      this.toolbarDispatcher.next(
        new ListToolbarConfigSetSearchEnabledAction(
          searchEnabled === undefined ? true : searchEnabled
        )
      )
    );

    this.dispatcher.toolbarAddItems([
      new ListToolbarItemModel({
        id: 'search',
        template: this.searchTemplate,
        location: 'center'
      })
    ]);
  }

  public ngAfterContentInit() {
    this.toolbarItems.forEach(toolbarItem =>
      this.dispatcher.toolbarAddItems(
        [new ListToolbarItemModel(toolbarItem)],
        toolbarItem.index
      )
    );
  }

  get searchText() {
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


  private updateSearchText(searchText: string) {
    this.dispatcher.searchSetText(searchText);
  }

  private get isSearchEnabled() {
    return this.toolbarState.map(s => s.config)
      .distinctUntilChanged()
      .map(c => c.searchEnabled);
  }
}

