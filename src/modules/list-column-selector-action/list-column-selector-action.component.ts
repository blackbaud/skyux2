import {
  Component,
  Input
 } from '@angular/core';
import {
  ListState
} from '../list/state';
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

@Component({
  selector: 'sky-list-column-selector-action',
  templateUrl: './list-column-selector-action.component.html'
})
export class SkyListColumnSelectorActionComponent {
  @Input()
  public gridView: SkyListViewGridComponent;

  constructor(
    public listState: ListState,
    private modalService: SkyModalService
  ) {}

  get isInGridView(): Observable<boolean> {
    return this.listState.map(s => s.views.active).map((activeView) => {
      return this.gridView && (activeView === this.gridView.id) ;
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

      let modalInstance = this.modalService.open(
        SkyColumnSelectorComponent,
        [
          {
            provide: SkyColumnSelectorContext,
            useValue: {
              columns: columns,
              selectedColumnIds: selectedColumnIds
            }
          }
        ]
      );

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
            true)
          );
        }
      });
    }
  }
}
