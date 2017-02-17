import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  forwardRef,
  ChangeDetectionStrategy,
  ViewChild,
  AfterContentInit
} from '@angular/core';
import { ListViewComponent } from '../list/list-view.component';
import { ListState } from '../list/state';
import {
  GridState,
  GridStateDispatcher,
  GridStateModel
} from './state';
import { ListStateDispatcher } from '../list/state';
import { ListViewGridColumnsLoadAction } from './state/columns/actions';
import { ListViewDisplayedGridColumnsLoadAction } from './state/displayed-columns/actions';
import { Observable } from 'rxjs';
import { getValue } from 'microedge-rxstate/dist/helpers';
import {
  SkyGridComponent,
  SkyGridColumnComponent,
  SkyGridColumnModel
} from '../grid';
import {
  ListItemModel
} from '../list/state';
import { getData } from '../list/helpers';

@Component({
  selector: 'sky-list-view-grid',
  templateUrl: './list-view-grid.component.html',
  providers: [
    /* tslint:disable */
    { provide: ListViewComponent, useExisting: forwardRef(() => SkyListViewGridComponent)},
    /* tslint:enable */
    GridState,
    GridStateDispatcher,
    GridStateModel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListViewGridComponent
  extends ListViewComponent implements AfterContentInit {

  @Input()
  public set name(value: string) {
    this.viewName = value;
  }

  @Input()
  public displayedColumns: Array<string> | Observable<Array<string>>;

  @Input()
  public hiddenColumns: Array<string> | Observable<Array<string>>;

  @Input()
  public fit: string = 'width';

  @Input()
  public width: number | Observable<number>;

  @Input()
  public height: number | Observable<number>;

  @ViewChild(SkyGridComponent)
  public gridComponent: SkyGridComponent;

  /* tslint:disable */
  @Input('search')
  private searchFunction: (data: any, searchText: string) => boolean;
  /* tslint:enable */

  @ContentChildren(SkyGridColumnComponent, {descendants: true})
  private columnComponents: QueryList<SkyGridColumnComponent>;

  constructor(
    state: ListState,
    private dispatcher: ListStateDispatcher,
    private gridState: GridState,
    private gridDispatcher: GridStateDispatcher
  ) {
    super(state, 'Grid View');
  }

  public ngAfterContentInit() {
    if (this.columnComponents.length === 0) {
      throw new Error('Grid view requires at least one sky-grid-column to render.');
    }

    let columnModels = this.columnComponents.map(columnComponent => {
      return new SkyGridColumnModel(columnComponent.template, columnComponent);
    });

    if (this.width && !(this.width instanceof Observable)) {
      this.width = Observable.of(this.width);
    }

    if (this.height && !(this.height instanceof Observable)) {
      this.height = Observable.of(this.height);
    }

    this.gridState.map(s => s.columns.items)
      .distinctUntilChanged()
      .subscribe(columns => {
        if (this.hiddenColumns) {
          getValue(this.hiddenColumns, (hiddenColumns: string[]) => {
            this.gridDispatcher.next(
              new ListViewDisplayedGridColumnsLoadAction(
                columns.filter(x => {
                  /* istanbul ignore next */
                  /* sanity check */
                  let id = x.id || x.field;
                  return hiddenColumns.indexOf(id) === -1;
                }),
                true
              )
            );
          });

        } else if (this.displayedColumns) {
          getValue(this.displayedColumns, (displayedColumns: string[]) => {
            this.gridDispatcher.next(
              new ListViewDisplayedGridColumnsLoadAction(
                columns.filter(x => displayedColumns.indexOf(x.id || x.field) !== -1),
                true
              )
            );
          });

        } else {
          this.gridDispatcher.next(
            new ListViewDisplayedGridColumnsLoadAction(columns.filter(x => !x.hidden), true)
          );
        }
      });

    this.gridDispatcher.next(new ListViewGridColumnsLoadAction(columnModels, true));

    this.handleColumnChange();
  }

  public columnIdsChanged(selectedColumnIds: Array<string>) {
    this.gridState.map(s => s.columns.items)
        .take(1)
        .subscribe(columns => {
          let displayedColumns = selectedColumnIds.map(
            columnId => columns.filter(c => c.id === columnId)[0]
          );
          this.gridDispatcher.next(
            new ListViewDisplayedGridColumnsLoadAction(displayedColumns, true)
          );
        });
  }

  public onViewActive() {
    let sub = this.gridState.map(s => s.displayedColumns.items)
      .distinctUntilChanged()
      .subscribe(displayedColumns => {
        let setFunctions =
          this.searchFunction !== undefined ? [this.searchFunction] :
            displayedColumns
              .map(column => (data: any, searchText: string) =>
                column.searchFunction(getData(data, column.field), searchText)
              )
              .filter(c => c !== undefined);

        this.dispatcher.searchSetFieldSelectors(displayedColumns.map(d => d.field));
        this.dispatcher.searchSetFunctions(setFunctions);
      });
    this.subscriptions.push(sub);
  }

  get items(): Observable<ListItemModel[]> {
    return Observable.combineLatest(
      this.state.map(s => s.items.items).distinctUntilChanged(),
      (items) => items
    );
  }

  get columns() {
    return this.gridState.map(s => s.columns.items)
      .distinctUntilChanged();
  }

  get selectedColumnIds() {
    return this.gridState.map(s => s.displayedColumns.items.map(column => {
      /* istanbul ignore next */
      /* sanity check */
      return column.id || column.field;
    })).distinctUntilChanged();
  }

  private get loading() {
    return this.state.map(s => s.items.loading)
      .distinctUntilChanged();
  }
  private handleColumnChange() {
     // watch for changes in column components
    this.columnComponents.changes.subscribe((columnComponents) => {
      let columnModels = this.columnComponents.map(column => {
        return new SkyGridColumnModel(column.template, column);
      });
      this.gridDispatcher.next(new ListViewGridColumnsLoadAction(columnModels, true));
    });
  }
}
