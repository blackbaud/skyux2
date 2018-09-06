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
  OnChanges,
  HostListener,
  ElementRef,
  ViewChildren,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

import {
  ListItemModel,
  ListSortFieldSelectorModel
} from '../list/state';

import { SkyGridColumnComponent } from './grid-column.component';
import { SkyGridColumnModel } from './grid-column.model';
import { SkyGridAdapterService } from './grid-adapter.service';

import {
  SkyGridColumnHeadingModelChange,
  SkyGridColumnWidthModelChange
} from './types';

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
export class SkyGridComponent implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
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

  @Output()
  public columnWidthChange = new EventEmitter<Array<SkyGridColumnWidthModelChange>>();

  public items: Array<any>;
  public displayedColumns: Array<SkyGridColumnModel>;
  public currentSortField: BehaviorSubject<ListSortFieldSelectorModel>;

  @ContentChildren(SkyGridColumnComponent, { descendants: true })
  private columnComponents: QueryList<SkyGridColumnComponent>;

  private subscriptions: Subscription[] = [];

  @ViewChildren('gridCol')
  private columnHeaders: QueryList<ElementRef>;
  @ViewChildren('colSizeRange')
  private columnRangeRefs: QueryList<ElementRef>;
  @ViewChild('gridTable')
  private table: ElementRef;
  @ViewChild('resizeBar')
  private resizeBar: ElementRef;
  private tableWidth: number;
  private isDraggingResizeHandle: boolean = false;
  private activeColumn: HTMLElement;
  private lastResizableColumn: ElementRef;
  private startColumnWidth: number;
  private lastColStartWidth: number;
  private xPosStart: number;
  public minColWidth = 50;
  public maxColWidth = 9999; // This is an arbritrary number, as the input range picker won't work wihtout a value.
  public columnResizeStep = 10;
  public showResizeBar: boolean = false;

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
        comp.headingModelChanges
          .subscribe((change: SkyGridColumnHeadingModelChange) => {
            this.updateColumnHeading(change);
          })
      );
    });

    this.gridAdapter.initializeDragAndDrop(
      this.dragulaService,
      (selectedColumnIds: Array<string>) => {
        this.onHeaderDrop(selectedColumnIds);
      }
    );
  }

  public ngAfterViewInit() {
    if (this.fit === 'scroll') {
      this.initializeTableWidth();
      this.initColumnWidths();
    }

    this.lastResizableColumn = this.columnHeaders.last;
    this.lastColStartWidth = this.lastResizableColumn.nativeElement.offsetWidth;

    this.columnHeaders.forEach(col => {
      let width = col.nativeElement.offsetWidth;

      // TODO Find a way to do this without using ID.
      this.columns.find(modelCol => modelCol.id === col.nativeElement.getAttribute('sky-cmp-id')).width = Math.max(width, this.minColWidth);
    });

    this.updateMaxRange();
  }

  // Do an ngOnChanges where changes to selectedColumnIds and data are watched
  public ngOnChanges(changes: SimpleChanges) {
    if (changes['columns'] && this.columns) {
      this.setDisplayedColumns(true);
    } else if (changes['selectedColumnIds'] && this.columns) {
      this.setDisplayedColumns();
      if (changes['selectedColumnIds'].previousValue !== changes['selectedColumnIds'].currentValue) {
        this.selectedColumnIdsChange.emit(this.selectedColumnIds);
      }
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

  public onKeydown(event: KeyboardEvent, column: SkyGridColumnModel) {
    const key = event.key.toLowerCase();
    if (key === 'enter' || key === ' ') {
      this.sortByColumn(column);
    }
  }

  public sortByColumn(column: SkyGridColumnModel) {
    if (!this.isDraggingResizeHandle && column.isSortable) {
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

  public getAriaSortDirection(column: SkyGridColumnModel): Observable<string> {
    return this.currentSortField
      .distinctUntilChanged()
      .map(field => {
      return field.fieldSelector === column.field ?
        (field.descending ? 'descending' : 'ascending') : (column.isSortable ? 'none' : undefined);
    });
  }

  public updateColumnHeading(change: SkyGridColumnHeadingModelChange) {
    const foundColumnModel = this.columns.find((column: SkyGridColumnModel) => {
      return (
        change.id !== undefined && change.id === column.id ||
        change.field !== undefined && change.field === column.field
      );
    });

    /* istanbul ignore else */
    if (foundColumnModel) {
      foundColumnModel.heading = change.value;
      this.ref.markForCheck();
    }
  }

  public onMouseDownResizeCol(event: MouseEvent) {
    this.initializeResizeColumn(event);

    this.isDraggingResizeHandle = true;
    this.xPosStart = event.pageX;
    this.showResizeBar = true;

    // Show visual indicator of where mouse is dragging (resizeBar).
    this.ref.detectChanges();
    let resizeBarX = event.pageX - this.table.nativeElement.getBoundingClientRect().left;
    this.gridAdapter.setStyle(this.resizeBar.nativeElement, 'left', resizeBarX + 'px');

    event.preventDefault();
    event.stopPropagation();
  }

  public onKeydownResizeCol(event: KeyboardEvent) {
    this.initializeResizeColumn(event);
  }

  public onInputChangeResizeCol(event: Event) {
    const input = event.target as HTMLInputElement;
    let newValue = Number(input.value);
    let deltaX = newValue - this.startColumnWidth;
    this.resizeColumn(this.activeColumn, newValue, deltaX);
  }

  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(event: MouseEvent) {
    if (!this.isDraggingResizeHandle) {
      return;
    }

    let deltaX = event.pageX - this.xPosStart;
    let newColWidth = this.startColumnWidth + deltaX;

    if (newColWidth <= this.minColWidth) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    let rangeInput = this.activeColumn.querySelector('.sky-grid-column-input-aria-only') as HTMLInputElement;
    if (this.fit === 'width' && newColWidth > Number(rangeInput.max)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    let resizeBarX = event.pageX - this.table.nativeElement.getBoundingClientRect().left;
    this.gridAdapter.setStyle(this.resizeBar.nativeElement, 'left', resizeBarX + 'px');
  }

  @HostListener('document:click', ['$event'])
  public onResizeHandleRelease(event: MouseEvent) {
    if (this.isDraggingResizeHandle) {
      this.showResizeBar = false;
      let deltaX = event.pageX - this.xPosStart;
      let newColWidth = this.startColumnWidth + deltaX;
      this.resizeColumn(this.activeColumn, newColWidth, deltaX);

      this.isDraggingResizeHandle = false;
      this.activeColumn = undefined;
      this.tableWidth = this.table.nativeElement.offsetWidth;
      this.columnWidthChange.emit(this.getColumnWidthModelChange());
      this.udpateRangeValue();
      event.preventDefault();
      event.stopPropagation();
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

  private resizeColumn(activeCol: HTMLElement, newColWidth: number, deltaX: number) {
    // Prevent accidental shrinkage below minimum width.
    if (newColWidth <= this.minColWidth) {
      deltaX = deltaX + this.minColWidth - newColWidth;
      newColWidth = this.minColWidth;
    }

    // fit=width adds/removes width from the last column
    // fit=scroll adds/removes width from the table
    if (this.fit === 'width') {

      // Prevent accidental growth that would bump last column off screen.
      let rangeInput = this.activeColumn.querySelector('.sky-grid-column-input-aria-only') as HTMLInputElement;
      if (newColWidth > Number(rangeInput.max)) {
        newColWidth = Number(rangeInput.max);
        deltaX = Number(rangeInput.max) - this.startColumnWidth;
      }

      this.lastColStartWidth = this.lastResizableColumn.nativeElement.offsetWidth;
      let newLastColWidth = this.lastColStartWidth - deltaX;
      this.gridAdapter.setElementWidth(this.lastResizableColumn.nativeElement.closest('th'), newLastColWidth);
      this.gridAdapter.setElementWidth(activeCol, newColWidth);
    } else {
      this.gridAdapter.setElementWidth(this.table.nativeElement, this.tableWidth + deltaX);
      this.gridAdapter.setElementWidth(activeCol, newColWidth);
    }

    this.updateMaxRange();
    console.log(this.columns);
  }

  // Applies css styling to each column, based on their current width.
  private initColumnWidths() {
    this.columnHeaders.forEach(col => {
      let width = Math.max(col.nativeElement.offsetWidth, this.minColWidth);
      this.gridAdapter.setElementWidth(col.nativeElement, width);
    });
  }

  // Applies css width to the table, and removes min-width=100%.
  // This should only be used when fit=scroll.
  private initializeTableWidth() {
    this.tableWidth = this.table.nativeElement.offsetWidth;
    this.gridAdapter.setElementWidth(this.table.nativeElement, this.tableWidth);
    this.gridAdapter.setStyle(this.table.nativeElement, 'min-width', 'auto');
  }

  private getColumnWidthModelChange() {

    // TODO Update this to go off of the column model instead of the DOM.
    let columnWidthModelChange = new Array<SkyGridColumnWidthModelChange>();
    this.columnHeaders.forEach(col => {
      columnWidthModelChange.push({
        id: col.nativeElement.getAttribute('sky-cmp-id'),
        width: col.nativeElement.offsetWidth
      });
    });
    return columnWidthModelChange;
  }

  private updateMaxRange() {
    if (this.lastResizableColumn && this.columnRangeRefs) {
      let leftoverWidth = this.lastResizableColumn.nativeElement.offsetWidth - this.minColWidth;

      this.columnHeaders.forEach(th => {
        let rangeInput = th.nativeElement.querySelector('input[type=range]');
        let newMaxRange = Number(th.nativeElement.offsetWidth) + leftoverWidth;
        rangeInput.max = newMaxRange;
        rangeInput.setAttribute('aria-valuemax', newMaxRange);
      });
    }
  }

  private udpateRangeValue() {
    if (this.lastResizableColumn && this.columnRangeRefs) {
      this.columnHeaders.forEach(th => {
        let rangeInput = th.nativeElement.querySelector('input[type=range]');
        let newValue = th.nativeElement.offsetWidth;
        rangeInput.value = newValue;
        rangeInput.setAttribute('aria-valuenow', newValue);
      });
    }
  }

  private initializeResizeColumn(event: any) {
    const clickTarget = event.target as HTMLElement;
    this.activeColumn = clickTarget.closest('th');
    this.startColumnWidth = this.activeColumn.offsetWidth;
  }
}
