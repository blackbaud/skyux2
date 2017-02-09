import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  forwardRef,
  NgZone,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';

import {
  ListViewComponent
} from '../list/list-view.component';

import {
  AsyncList
} from 'microedge-rxstate/dist';

import {
  ListItemModel
} from '../list/state/items/item.model';

import {
  ListState,
  ListStateDispatcher
} from '../list/state';

import {
  ChecklistState,
  ChecklistStateDispatcher,
  ChecklistStateModel
} from './state';

import {
  ListViewChecklistItemsLoadAction
} from './state/items/actions';

import {
  ListViewChecklistItemModel
} from './state/items/item.model';

import {
  ListToolbarItemModel
} from '../list/state/toolbar/toolbar-item.model';

import {
  Observable
} from 'rxjs';

import {
  getData
} from '../list/helpers';

import {
  ListSelectedSetItemSelectedAction,
  ListSelectedSetItemsSelectedAction
} from '../list/state/selected/actions';

@Component({
  selector: 'sky-list-view-checklist',
  templateUrl: './list-view.checklist.component.html',
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
  @Input()
  set name(value: string) {
    this.viewName = value;
  }

  @Input()
  public search: (data: any, searchText: string) => boolean = this.searchFunction();

  @Input()
  public category: string = 'category';

  @Input()
  public label: string = 'label';

  @Input()
  public description: string = 'description';

  @ViewChild('selectAllTemplate')
  private selectAllTemplate: TemplateRef<any>;

  @ViewChild('clearSelectionsTemplate')
  private clearSelectionsTemplate: TemplateRef<any>;

  constructor(
    state: ListState,
    private dispatcher: ListStateDispatcher,
    private checklistState: ChecklistState,
    private checklistDispatcher: ChecklistStateDispatcher,
    private zone: NgZone
  ) {
    super(state, 'Checklist View');

    let lastUpdate: any;
    Observable.combineLatest(
      this.state.map(s => s.items).distinctUntilChanged(),
      (items: AsyncList<ListItemModel>) => {
        let dataChanged = lastUpdate === undefined || items.lastUpdate !== lastUpdate;
        lastUpdate = items.lastUpdate;
        let newItems = items.items.map(item => {
          return new ListViewChecklistItemModel(item.id, {
            label:
              this.label ? getData(item.data, this.label) : undefined,
            description:
              this.description ? getData(item.data, this.description) : undefined,
            category:
              this.category ? getData(item.data, this.category) : undefined
          });
        });

        this.checklistDispatcher.next(
          new ListViewChecklistItemsLoadAction(newItems, true, dataChanged, items.count)
        )
      }
    )
    .subscribe();
  }

  public onViewActive() {
    if (this.search !== undefined) {
      this.dispatcher.searchSetFunctions([this.search]);
    }

    let fieldSelectors: Array<string> = [];
    if (this.label) {
      fieldSelectors.push(this.label);
    }

    if (this.description) {
      fieldSelectors.push(this.description);
    }

    if (this.category) {
      fieldSelectors.push(this.category);
    }

    this.dispatcher.searchSetFieldSelectors(fieldSelectors);
  }

  public ngAfterViewInit() {
    this.dispatcher.toolbarAddItems([
      new ListToolbarItemModel(
        {
          id: 'select-all',
          template: this.selectAllTemplate,
          location: 'right',
          index: 500,
          view: this.id
        }
      ),
      new ListToolbarItemModel(
        {
          id: 'clear-all',
          template: this.clearSelectionsTemplate,
          location: 'right',
          index: 500,
          view: this.id
        }
      )
    ]);
  }

  get items() {
    return this.checklistState.map(state => state.items.items);
  }

  public searchFunction() {
    return (data: any, searchText: string) => {
      if (this.label !== undefined) {
        let label = getData(data, this.label);
        if (label !== undefined && label.toString().toLowerCase().indexOf(searchText) !== -1) {
          return true;
        }

        if (this.description !== undefined) {
          let description = getData(data, this.description);
          if (
            description !== undefined &&
            description.toString().toLowerCase().indexOf(searchText) !== -1
          ) {
            return true;
          }
        }

        if (this.category !== undefined) {
          let category = getData(data, this.category);
          if (
            category !== undefined &&
            category.toString().toLowerCase().indexOf(searchText) !== -1
          ) {
            return true;
          }
        }
      }
    };
  }

  public itemSelected(id: string) {
    return this.state.map(state => state.selected.item[id]);
  }

  public setItemSelection(item: ListItemModel, event: any) {
    this.dispatcher.next(new ListSelectedSetItemSelectedAction(item.id, event.checked));
  }

  public clearSelections() {
    this.state.map(state => state.items.items)
      .take(1)
      .subscribe(items => {
        this.dispatcher
          .next(new ListSelectedSetItemsSelectedAction(items.map(item => item.id), false));
      })
  }

  public selectAll() {
    this.state.map(state => state.items.items)
      .take(1)
      .subscribe(items => {
        this.dispatcher
          .next(new ListSelectedSetItemsSelectedAction(items.map(item => item.id, true)));
      })
  }

}
