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

@Component({
  selector: 'sky-grid',
  template: require('./grid.component.html'),
  styles: [require('./grid.component.scss')],
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

  @Output()
  public selectedColumnChange = new EventEmitter<Array<string>>();

  public displayedColumns: Array<SkyGridColumnModel> = new Array<SkyGridColumnModel>();

  public items: Array<any> = new Array<any>();

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
        this.columns = this.columnComponents.map(columnComponent => {
          return new SkyGridColumnModel(columnComponent.template, columnComponent);
        });
      }

      this.transformData();

      this.setDisplayedColumns(true);
    }
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
  }

  private onHeaderDrop(newColumnIds: Array<string>) {
     // update selected columnIds
      this.selectedColumnIds = newColumnIds;
      this.selectedColumnChange.emit(newColumnIds);

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
}
