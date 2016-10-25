import {
  Component, Input, TemplateRef, ViewChild,  forwardRef, NgZone, ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';
import { ListViewComponent } from '../list/list-view.component';
import { AsyncList } from 'microedge-rxstate/core';
import { ListItemModel } from '../list/state/items/item.model';
import { ListState, ListStateDispatcher } from '../list/state';
import { ListItemsSetItemSelectedAction } from '../list/state/items/actions';
import { ListSearchSetFunctionsAction } from '../list/state/search/actions';
import { ChecklistState, ChecklistStateDispatcher, ChecklistStateModel } from './state';
import { ListViewChecklistItemsLoadAction } from './state/items/actions';
import { ListViewChecklistItemModel } from './state/items/item.model';
import { ListToolbarItemsLoadAction } from '../list-toolbar/state/items/actions';
import { ListToolbarItemModel } from '../list-toolbar/state/items/item.model';
import { Observable } from 'rxjs';
import { getData } from '../list/helpers';

@Component({
  selector: 'sky-list-view-checklist',
  templateUrl: './list-view-checklist.component.html',
  styleUrls: ['./list-view-checklist.component.scss'],
  providers: [
    /* tslint:disable */
    { provide: ListViewComponent, useExisting: forwardRef(() => SkyListViewChecklistComponent)},
    /* tslint:enable */
    ChecklistState,
    ChecklistStateDispatcher,
    ChecklistStateModel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListViewChecklistComponent extends ListViewComponent implements AfterViewInit {
  @Input() set name(value: string) { this.viewName = value; }

  /* tslint:disable */
  @Input('search')
  private searchFunction: (data: any, searchText: string) => boolean = this.search();
  @Input('category') private categoryFieldSelector: string = 'category';
  @Input('label') private labelFieldSelector: string = 'label';
  @Input('description') private descriptionFieldSelector: string = 'description';
  @ViewChild('selectAllTemplate') private selectAllTemplate: TemplateRef<any>;
  @ViewChild('clearSelectionsTemplate') private clearSelectionsTemplate: TemplateRef<any>;
  /* tslint:enable */

  constructor(
    state: ListState,
    private dispatcher: ListStateDispatcher,
    private checklistState: ChecklistState,
    private checklistDispatcher: ChecklistStateDispatcher,
    private zone: NgZone
  ) {
    super(state, 'Checklist View');

    let lastLastUpdate: any;
    Observable.combineLatest(
      this.state.map(s => s.items.lastUpdate).distinctUntilChanged(),
      this.state.map(s => s.displayedItems).distinctUntilChanged(),
      (lastUpdate: any, displayedItems: AsyncList<ListItemModel>) => {
        let dataChanged = lastLastUpdate === undefined || lastUpdate !== lastLastUpdate;
        lastLastUpdate = lastUpdate;
        let items = displayedItems.items.map(item => {
          return new ListViewChecklistItemModel(item.id, item.selected, {
            label:
              this.labelFieldSelector ? getData(item.data, this.labelFieldSelector) :
              undefined,
            description:
              this.descriptionFieldSelector ? getData(item.data, this.descriptionFieldSelector) :
              undefined,
            category:
              this.categoryFieldSelector ? getData(item.data, this.categoryFieldSelector) :
              undefined
          });
        });

        this.checklistDispatcher.next(
          new ListViewChecklistItemsLoadAction(items, true, dataChanged, displayedItems.count)
        );
      }
    )
    .subscribe();
  }

  public onViewActive() {
    if (this.searchFunction !== undefined) {
      this.dispatcher.next(new ListSearchSetFunctionsAction([this.searchFunction]));
    }
  }

  public ngAfterViewInit() {
    if (this.list !== undefined && this.list.toolbarDispatcher !== undefined) {
      setTimeout(() => this.list.toolbarDispatcher.next(new ListToolbarItemsLoadAction([
        new ListToolbarItemModel(
          { template: this.selectAllTemplate, location: 'right', index: 500, view: this.id }
        ),
        new ListToolbarItemModel(
          { template: this.clearSelectionsTemplate, location: 'right', index: 500, view: this.id }
        )
      ])));
    }
  }

  get items() {
    return this.checklistState.map(s => s.items.items);
  }

  public search() {
    return (data: any, searchText: string) => {
      if (this.labelFieldSelector !== undefined) {
        let label = getData(data, this.labelFieldSelector);
        if (label !== undefined && label.toString().toLowerCase().indexOf(searchText) !== -1) {
          return true;
        }
      }

      if (this.descriptionFieldSelector !== undefined) {
        let description = getData(data, this.descriptionFieldSelector);
        if (
          description !== undefined &&
          description.toString().toLowerCase().indexOf(searchText) !== -1
        ) {
          return true;
        }
      }

      if (this.categoryFieldSelector !== undefined) {
        let category = getData(data, this.categoryFieldSelector);
        if (
          category !== undefined &&
          category.toString().toLowerCase().indexOf(searchText) !== -1
        ) {
          return true;
        }
      }
    };
  }

  public setItemSelection(item: any, selected: boolean) {
    this.dispatcher.next(new ListItemsSetItemSelectedAction(item.id, selected));
  }
}
