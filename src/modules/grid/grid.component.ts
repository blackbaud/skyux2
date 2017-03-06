import {
  Component,
  Input,
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
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { SkyGridColumnComponent } from './grid-column.component';
import { SkyGridColumnModel } from './grid-column.model';
import { ListItemModel } from '../list/state';
import { SkyGridAdapterService } from './grid-adapter.service';

import { ListSortFieldSelectorModel } from '../list/state';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
export class SkyGridComponent implements AfterContentInit, OnChanges {

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
  public sortFields: Array<ListSortFieldSelectorModel>;

  @Output()
  public selectedColumnIdsChange = new EventEmitter<Array<string>>();

  @Output()
  public sortFieldsChange = new EventEmitter<Array<ListSortFieldSelectorModel>>();

  public displayedColumns: Array<SkyGridColumnModel> = new Array<SkyGridColumnModel>();

  public items: Array<any> = new Array<any>();

  public currentSortField: BehaviorSubject<Array<ListSortFieldSelectorModel>>
    = new BehaviorSubject<Array<ListSortFieldSelectorModel>>([]);

  @ContentChildren(SkyGridColumnComponent, {descendants: true})
  private columnComponents: QueryList<SkyGridColumnComponent>;

  constructor(
    private dragulaService: DragulaService,
    private ref: ChangeDetectorRef,
    private gridAdapter: SkyGridAdapterService
  ) {}

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

    this.columnComponents.changes.subscribe((columnComponents) => {
      this.getColumnsFromComponent();
      this.setDisplayedColumns(true);
      this.ref.markForCheck();
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
    if (changes['selectedColumnIds'] && this.columns) {
      this.setDisplayedColumns();
    } else if (changes['columns'] && this.columns) {
      this.setDisplayedColumns(true);
    }

    if (changes['data'] && this.data) {
      this.transformData();
    }

    if (changes['sortFields']) {
      this.setSortHeaders();
    }
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

  public sortByColumn(column: SkyGridColumnModel) {
    if (column.isSortable) {
      this.currentSortField
      .map(s => s.filter(f => f.fieldSelector === column.field)[0])
      .take(1)
      .map(field => {
        let selectors = [{
          fieldSelector: column.field,
          descending: true
        }];

        if (field && field.descending) {
          selectors = [{
            fieldSelector: column.field,
            descending: false
          }];
        }
        this.sortFieldsChange.emit(selectors);
        this.currentSortField.next(selectors);
      })
      .subscribe();
    }
  }

  public getSortDirection(field: string) {
    return this.currentSortField
      .distinctUntilChanged()
      .map(sort => sort.filter(f => f.fieldSelector === field)[0])
      .map(field => field ? (field.descending ? 'desc' : 'asc') : undefined)
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
    this.currentSortField.next(this.sortFields || []);
  }

  private getColumnsFromComponent() {
     this.columns = this.columnComponents.map(columnComponent => {
        return new SkyGridColumnModel(columnComponent.template, columnComponent);
      });
  }
}
