import {
  Component, Input, TemplateRef, ContentChildren, QueryList, ViewChild,
  forwardRef, ChangeDetectionStrategy, AfterContentInit, AfterViewInit
} from '@angular/core';
import { ListViewComponent } from '../list/list-view.component';
import { ListState } from '../list/state';
import { GridState, GridStateDispatcher, GridStateModel } from './state';
import { SkyListViewGridColumnComponent } from './list-view-grid-column.component';
import { SkyListViewGridColumnSelectorComponent } from './list-view-grid-column-selector.component';
import { ListStateDispatcher } from '../list/state';
import { ListViewGridColumnModel } from './state/columns/column.model';
import { ListViewGridColumnsLoadAction } from './state/columns/actions';
import { ListViewDisplayedGridColumnsLoadAction } from './state/displayed-columns/actions';
import { Observable } from 'rxjs';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { SkyModalService } from '../modal';
import { getValue } from 'microedge-rxstate/dist/helpers';
import { getData } from '../list/helpers';

@Component({
  selector: 'sky-list-view-grid',
  template: require('./list-view-grid.component.html'),
  styles: [require('./list-view-grid.component.scss')],
  providers: [
    /* tslint:disable */
    { provide: ListViewComponent, useExisting: forwardRef(() => SkyListViewGridComponent)},
    /* tslint:enable */
    GridState,
    GridStateDispatcher,
    GridStateModel
  ],
  viewProviders: [ DragulaService ],
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

  @ContentChildren(SkyListViewGridColumnComponent)
  private columnComponents: QueryList<SkyListViewGridColumnComponent>;

  constructor(
    state: ListState,
    private dispatcher: ListStateDispatcher,
    private gridState: GridState,
    private gridDispatcher: GridStateDispatcher,
    private modalService: SkyModalService,
    private dragulaService: DragulaService
  ) {
    super(state, 'Grid View');
  }

  public ngAfterContentInit() {
    if (this.columnComponents.length === 0) {
      throw new Error('Grid view requires at least one sky-list-view-grid-column to render.');
    }

    let columnModels = this.columnComponents.map(columnComponent => {
      return new ListViewGridColumnModel(columnComponent.template, columnComponent);
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
                columns.filter(x => hiddenColumns.indexOf(x.id || x.field) === -1)
              )
            );
          });
        } else if (this.displayedColumns) {
          getValue(this.displayedColumns, (displayedColumns: string[]) => {
            this.gridDispatcher.next(
              new ListViewDisplayedGridColumnsLoadAction(
                columns.filter(x => displayedColumns.indexOf(x.id || x.field) !== -1)
              )
            );
          });
        } else {
          this.gridDispatcher.next(
            new ListViewDisplayedGridColumnsLoadAction(columns.filter(x => !x.hidden))
          );
        }
      });

    this.gridDispatcher.next(new ListViewGridColumnsLoadAction(columnModels, true));

    /* tslint:disable */
    /* istanbul ignore next */
    this.dragulaService.drag.subscribe(([, el]: any) =>
      el.classList.add('dragging')
    );

    /* istanbul ignore next */
    this.dragulaService.dragend.subscribe(([, el]: any) =>
      el.classList.remove('dragging')
    );

    /* istanbul ignore next */
    this.dragulaService.drop.subscribe(([,, container]: any) => {
      let columnIds: string[] = [];
      let nodes = container.getElementsByTagName('th');
      for (let i = 0; i < nodes.length; i++) {
        let el = nodes[i];
        let id = el.getAttribute('cmp-id');
        columnIds.push(id);
      }

      this.gridState.map(s => s.columns.items)
        .take(1)
        .subscribe(columns => {
          let displayedColumns = columnIds.map(
            columnId => columns.filter(c => c.id === columnId)[0]
          );
          this.gridDispatcher.next(
            new ListViewDisplayedGridColumnsLoadAction(displayedColumns, true)
          );
        });
    });

    /* istanbul ignore next */
    this.dragulaService.setOptions('heading', {
      moves: (el: any) => !el.classList.contains('locked'),
      accepts: ([,,, sibling]: any) => sibling === undefined || !sibling.classList.contains('locked')
    });
    /* tslint:enable */
  }

  get items() {
    return Observable.combineLatest(
      this.state.map(s => s.items.items).distinctUntilChanged(),
      (items) => items
    );
  }

  get columns() {
    return this.gridState.map(s => s.displayedColumns.items)
      .distinctUntilChanged();
  }

  private get loading() {
    return this.state.map(s => s.items.loading)
      .distinctUntilChanged();
  }
}
