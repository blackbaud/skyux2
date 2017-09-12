import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  forwardRef,
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
  ListToolbarSetTypeAction
} from '../list/state/toolbar/actions';

import {
  Observable
} from 'rxjs/Observable';

import {
  getData
} from '../list/helpers';

import {
  ListSelectedSetItemSelectedAction,
  ListSelectedSetItemsSelectedAction
} from '../list/state/selected/actions';

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
  @Input()
  set name(value: string) {
    this.viewName = value;
  }

  @Input()
  public search: (data: any, searchText: string) => boolean = this.searchFunction();

  /* tslint:disable */
  @Input('label')
  public labelFieldSelector: string = 'label';
  /* tslint:enable */

  @Input()
  public description: string = 'description';

  @Input()
  public set selectMode(value: string) {
    this._selectMode = value;
    this.updateActions();
  }

  public get selectMode(): string {
    return this._selectMode;
  }

  @ViewChild('selectAllTemplate')
  private selectAllTemplate: TemplateRef<any>;

  @ViewChild('clearSelectionsTemplate')
  private clearSelectionsTemplate: TemplateRef<any>;

  private hasSelectToolbarItems = false;

  private _selectMode = 'multiple';

  constructor(
    state: ListState,
    private dispatcher: ListStateDispatcher,
    private checklistState: ChecklistState,
    private checklistDispatcher: ChecklistStateDispatcher
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
              this.labelFieldSelector ? getData(item.data, this.labelFieldSelector) : undefined,
            description:
              this.description ? getData(item.data, this.description) : undefined
          });
        });

        this.checklistDispatcher.next(
          new ListViewChecklistItemsLoadAction(newItems, true, dataChanged, items.count)
        );
      }
    )
    .subscribe();
  }

  public onViewActive() {
    if (this.search !== undefined) {
      this.dispatcher.searchSetFunctions([this.search]);
    }

    let fieldSelectors: Array<string> = [];
    if (this.labelFieldSelector) {
      fieldSelectors.push(this.labelFieldSelector);
    }

    if (this.description) {
      fieldSelectors.push(this.description);
    }

    this.dispatcher.searchSetFieldSelectors(fieldSelectors);

    this.dispatcher.next(new ListToolbarSetTypeAction('search'));
  }

  public ngAfterViewInit() {
    this.updateActions();
  }

  get items() {
    return this.checklistState.map(state => state.items.items);
  }

  public searchFunction() {
    return (data: any, searchText: string) => {
      if (this.labelFieldSelector !== undefined) {
        let label = getData(data, this.labelFieldSelector);
        /* tslint:disable:no-null-keyword */
        if (
          label !== undefined &&
          label !== null &&
          label.toString().toLowerCase().indexOf(searchText) !== -1
        ) {
          return true;
        }
        /* tslint:enable:no-null-keyword */
      }

      if (this.description !== undefined) {
        let description = getData(data, this.description);
        /* tslint:disable:no-null-keyword */
        if (
          description !== undefined &&
          description !== null &&
          description.toString().toLowerCase().indexOf(searchText) !== -1
        ) {
          return true;
        }
        /* tslint:enable:no-null-keyword */
      }

      return false;
    };
  }

  public itemSelected(id: string): Observable<boolean> {
    return this.state.map(state => state.selected.item.selectedIdMap.get(id));
  }

  public setItemSelection(item: ListItemModel, event: any) {
    this.dispatcher.next(new ListSelectedSetItemSelectedAction(item.id, event.checked));
  }

  public singleSelectRowClick(item: ListItemModel) {
    this.dispatcher.next(new ListSelectedSetItemsSelectedAction([item.id], true, true));
  }

  public clearSelections() {
    this.state.map(state => state.items.items)
      .take(1)
      .subscribe(items => {
        this.dispatcher
          .next(new ListSelectedSetItemsSelectedAction(items.map(item => item.id), false, false));
      });
  }

  public selectAll() {
    this.state.map(state => state.items.items)
      .take(1)
      .subscribe(items => {
        this.dispatcher
          .next(new ListSelectedSetItemsSelectedAction(items.map(item => item.id), true, false));
      });
  }

  private updateActions() {
    const selectAllId = 'select-all';
    const clearAllId = 'clear-all';

    switch (this.selectMode) {
      case 'single':
        this.dispatcher.toolbarRemoveItems([selectAllId, clearAllId]);
        this.hasSelectToolbarItems = false;
        break;
      default:
        if (!this.hasSelectToolbarItems) {
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

          this.hasSelectToolbarItems = true;
        }
        break;
    }
  }

}
