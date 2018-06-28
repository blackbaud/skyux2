import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  ListState, ListStateDispatcher, ListToolbarItemModel
} from '../list/state';

import {
  SkyListSecondaryActionsComponent
} from '../list-secondary-actions';

import {
  SkyListViewGridComponent
} from '../list-view-grid';
import {
  GridStateModel
} from '../list-view-grid/state';
import {
  ListViewDisplayedGridColumnsLoadAction
} from '../list-view-grid/state/displayed-columns/actions';
import {
  SkyGridColumnModel
} from '../grid';
import {
  SkyModalService,
  SkyModalCloseArgs
} from '../modal';
import {
  SkyColumnSelectorContext,
  SkyColumnSelectorModel,
  SkyColumnSelectorComponent
} from '../column-selector';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/take';

@Component({
  selector: 'sky-list-column-selector-action',
  templateUrl: './list-column-selector-action.component.html',
  styleUrls: ['./list-column-selector-action.component.scss']
})
export class SkyListColumnSelectorActionComponent implements AfterContentInit {
  @Input()
  public gridView: SkyListViewGridComponent;

  @Input()
  public helpKey: string;

  @Output()
  public helpOpened = new EventEmitter<string>();

  @ViewChild('columnChooser')
  private columnChooserTemplate: TemplateRef<any>;

  constructor(
    public listState: ListState,
    private modalService: SkyModalService,
    private dispatcher: ListStateDispatcher,
    @Optional() public secondaryActions: SkyListSecondaryActionsComponent
  ) { }

  public ngAfterContentInit() {
    if (!this.secondaryActions) {
      let columnChooserItem = new ListToolbarItemModel(
        {
          id: 'column-chooser',
          template: this.columnChooserTemplate,
          location: 'left'
        }
      );

      this.dispatcher.toolbarAddItems(
        [
          columnChooserItem
        ],
        3
      );
    }
  }

  get isInGridView(): Observable<boolean> {
    return this.listState.map(s => s.views.active).map((activeView) => {
      return this.gridView && (activeView === this.gridView.id);
    }).distinctUntilChanged();
  }

  get isInGridViewAndSecondary(): Observable<boolean> {
    return this.listState.map(s => s.views.active).map((activeView) => {
      return this.secondaryActions && this.gridView && (activeView === this.gridView.id);
    }).distinctUntilChanged();
  }

  public openColumnSelector() {
    /* istanbul ignore else */
    /* sanity check */
    if (this.gridView) {
      let columns: Array<SkyColumnSelectorModel> = [];
      let selectedColumnIds: Array<string> = [];
      this.gridView.gridState.take(1).subscribe((state: GridStateModel) => {
        columns = state.columns.items
          .filter((item: SkyGridColumnModel) => {
            return !item.locked;
          })
          .map((item: SkyGridColumnModel) => {
            return {
              id: item.id,
              heading: item.heading,
              description: item.description
            };
          });
        selectedColumnIds = state.displayedColumns.items
          .filter((item: SkyGridColumnModel) => {
            return !item.locked;
          })
          .map((item: SkyGridColumnModel) => {
            return item.id;
          });
      });

      const modalInstance = this.modalService.open(
        SkyColumnSelectorComponent,
        {
          providers: [
            {
              provide: SkyColumnSelectorContext,
              useValue: {
                columns,
                selectedColumnIds
              }
            }
          ],
          helpKey: this.helpKey
        }
      );

      modalInstance.helpOpened
        .subscribe((helpKey: string) => {
          this.helpOpened.emit(helpKey);
          this.helpOpened.complete();
        });

      modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
        if (result.reason === 'save' && result.data) {
          let newSelectedIds = result.data;
          let newDisplayedColumns: Array<SkyGridColumnModel> = [];
          this.gridView.gridState.take(1)
            .subscribe((state: GridStateModel) => {
              newDisplayedColumns = state.columns.items.filter((item) => {
                return newSelectedIds.indexOf(item.id) > -1 || item.locked;
              });
            });
          this.gridView.gridDispatcher.next(
            new ListViewDisplayedGridColumnsLoadAction(
              newDisplayedColumns,
              true
            )
          );
        }
      });
    }
  }
}
