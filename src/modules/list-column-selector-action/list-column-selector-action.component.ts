import {
  Component,
  Input,
  Optional,
  AfterContentInit,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  ListState, ListStateDispatcher, ListToolbarItemModel
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
import { SkyListSecondaryActionsComponent } from '../list-secondary-actions/';
import { SkyMediaBreakpoints, SkyMediaQueryService } from '../media-queries';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sky-list-column-selector-action',
  templateUrl: './list-column-selector-action.component.html'
})
export class SkyListColumnSelectorActionComponent implements AfterContentInit, OnInit, OnDestroy {
  @Input()
  public gridView: SkyListViewGridComponent;
  public currentBreakpoint: SkyMediaBreakpoints;

  @ViewChild('columnChooser')
  private columnChooserTemplate: TemplateRef<any>;

  private mediaQuerySubscription: Subscription;

  constructor(
    public listState: ListState,
    @Optional() public secondaryActions: SkyListSecondaryActionsComponent,
    private dispatcher: ListStateDispatcher,
    private modalService: SkyModalService,
    private mediaQueries: SkyMediaQueryService,
    private changeRef: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    this.mediaQuerySubscription = this.mediaQueries.subscribe((newBreakpoint: SkyMediaBreakpoints) => {
      this.currentBreakpoint = newBreakpoint;
      this.changeRef.detectChanges();
    });
  }

  public ngAfterContentInit() {
    if (!this.secondaryActions) {
      let columnChooserItem = new ListToolbarItemModel(
        {
          id: 'column-chooser',
          template: this.columnChooserTemplate,
          location: 'left'
        }
      );
      this.dispatcher.toolbarAddItems([columnChooserItem], 2);
    }
  }

  public ngOnDestroy() {
    if (this.mediaQuerySubscription) {
      this.mediaQuerySubscription.unsubscribe();
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

  public isSmallScreen() {
    return this.currentBreakpoint === SkyMediaBreakpoints.xs;
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
