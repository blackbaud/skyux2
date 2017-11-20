import {
  Component,
  Input,
  OnDestroy,
  Output,
  ContentChildren,
  QueryList,
  ChangeDetectionStrategy,
  AfterContentInit,
  ChangeDetectorRef,
  SimpleChanges,
  EventEmitter,
  OnChanges
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

import {
  ListItemModel,
  ListSortFieldSelectorModel
} from '../list/state';

import { SkyGridColumnComponent } from './grid-column.component';
import { SkyGridColumnModel } from './grid-column.model';
import { SkyGridAdapterService } from './grid-adapter.service';

@Component({
  selector: 'sky-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  viewProviders: [ DragulaService ],
  providers: [
    SkyGridAdapterService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyGridComponent implements AfterContentInit, OnChanges, OnDestroy {
  @Input()
  public selectedColumnIds: Array<string>;

  @Input()
  public fit: string = 'width';

  @Input()
  public width: number;

  @Input()
  public height: number;

  @Input()
  public data: Array<any>;

  @Input()
  public columns: Array<SkyGridColumnModel>;

  @Input()
  public hasToolbar: boolean = false;

  @Input()
  public sortField: ListSortFieldSelectorModel;

  @Output()
  public selectedColumnIdsChange = new EventEmitter<Array<string>>();

  @Output()
  public sortFieldChange = new EventEmitter<ListSortFieldSelectorModel>();

  public items: Array<any>;
  public displayedColumns: Array<SkyGridColumnModel>;
  public currentSortField: BehaviorSubject<ListSortFieldSelectorModel>;

  @ContentChildren(SkyGridColumnComponent, { descendants: true })
  private columnComponents: QueryList<SkyGridColumnComponent>;

  private subscriptions: Subscription[] = [];

  constructor(
    private dragulaService: DragulaService,
    private ref: ChangeDetectorRef,
    private gridAdapter: SkyGridAdapterService
  ) {
    this.displayedColumns = new Array<SkyGridColumnModel>();
    this.items = new Array<any>();
    this.currentSortField = new BehaviorSubject<ListSortFieldSelectorModel>({
      fieldSelector: '',
      descending: false
    });
  }

  public ngAfterContentInit() {
    if (this.columnComponents.length !== 0 || this.columns !== undefined) {
      /* istanbul ignore else */
      /* sanity check */
      if (this.columnComponents.length > 0) {
        this.getColumnsFromComponent();
      }

      this.transformData();
      this.setDisplayedColumns(true);
    }

    // Watch for added/removed columns:
    this.subscriptions.push(
      this.columnComponents.changes.subscribe(() => this.updateColumns())
    );

    // Watch for column heading changes:
    this.columnComponents.forEach((comp: SkyGridColumnComponent) => {
      this.subscriptions.push(
        comp.headingChanges.subscribe(() => this.updateColumns())
      );
    });

    this.gridAdapter.initializeDragAndDrop(
      this.dragulaService,
      (selectedColumnIds: Array<string>) => {
        this.onHeaderDrop(selectedColumnIds);
      }
    );
  }

  // Do an ngOnChanges where changes to selectedColumnIds and data are watched
  public ngOnChanges(changes: SimpleChanges) {
    if (changes['columns'] && this.columns) {
      this.setDisplayedColumns(true);
    } else if (changes['selectedColumnIds'] && this.columns) {
      this.setDisplayedColumns();
    }

    if (changes['data'] && this.data) {
      this.transformData();
    }

    if (changes['sortField']) {
      this.setSortHeaders();
    }
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public sortByColumn(column: SkyGridColumnModel) {
    if (column.isSortable) {
      this.currentSortField
      .take(1)
      .map(field => {
        let selector = {
          fieldSelector: column.field,
          descending: true
        };

        if (field && field.fieldSelector === column.field && field.descending) {
          selector = {
            fieldSelector: column.field,
            descending: false
          };
        }
        this.sortFieldChange.emit(selector);
        this.currentSortField.next(selector);
      })
      .subscribe();
    }
  }

  public getSortDirection(columnField: string): Observable<string> {
    return this.currentSortField
      .distinctUntilChanged()
      .map(field => {
        return field.fieldSelector === columnField ?
          (field.descending ? 'desc' : 'asc') : undefined;
      });
  }

  private onHeaderDrop(newColumnIds: Array<string>) {
    // update selected columnIds
    this.selectedColumnIds = newColumnIds;
    this.selectedColumnIdsChange.emit(newColumnIds);

    // set new displayed columns
    this.displayedColumns = this.selectedColumnIds.map(
      columnId => this.columns.filter(column => column.id === columnId)[0]
    );

    // mark for check because we are using ChangeDetectionStrategy.onPush
    this.ref.markForCheck();
  }

  private setDisplayedColumns(respectHidden: boolean = false) {
    if (this.selectedColumnIds !== undefined) {
      // setup displayed columns
      this.displayedColumns = this.selectedColumnIds.map(
        columnId => this.columns.filter(column => column.id === columnId)[0]
      );
    } else if (respectHidden) {
      this.displayedColumns = this.columns.filter(column => {
        return !column.hidden;
      });
    } else {
      this.displayedColumns = this.columns;
    }
  }

  private transformData() {
    // Transform data into object with id and data properties
    if (this.data.length > 0 && this.data[0].id && !this.data[0].data) {
      this.items = this.data.map(item => new ListItemModel(item.id, item));
    } else {
      this.items = this.data;
    }
  }

  private setSortHeaders() {
    this.currentSortField.next(this.sortField || { fieldSelector: '', descending: false });
  }

  private getColumnsFromComponent() {
    this.columns = this.columnComponents.map(columnComponent => {
      return new SkyGridColumnModel(columnComponent.template, columnComponent);
    });
  }

  private updateColumns() {
    this.getColumnsFromComponent();
    this.setDisplayedColumns(true);
    this.ref.markForCheck();
  }
}
