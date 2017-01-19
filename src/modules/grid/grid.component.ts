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

@Component({
  selector: 'sky-grid',
  template: require('./grid.component.html'),
  styles: [require('./grid.component.scss')],
  viewProviders: [ DragulaService ],
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

  constructor(private dragulaService: DragulaService, private ref: ChangeDetectorRef) {}

  public ngAfterContentInit() {
    if (this.columnComponents.length !== 0 || this.columns !== undefined) {
      if (this.columnComponents.length > 0) {
        this.columns = this.columnComponents.map(columnComponent => {
          return new SkyGridColumnModel(columnComponent.template, columnComponent);
        });
      }

      this.transformData();

      this.setDisplayedColumns(true);

      /* tslint:disable */
      /* istanbul ignore next */
      this.dragulaService.drag.subscribe(([, el]: any) =>
        el.classList.add('sky-grid-header-dragging')
      );

      /* istanbul ignore next */
      this.dragulaService.dragend.subscribe(([, el]: any) =>
        el.classList.remove('sky-grid-header-dragging')
      );

      /* istanbul ignore next */
      this.dragulaService.drop.subscribe(([,, container]: any) => {
        let columnIds: string[] = [];
        let nodes = container.getElementsByTagName('th');
        for (let i = 0; i < nodes.length; i++) {
          let el = nodes[i];
          let id = el.getAttribute('sky-cmp-id');
          columnIds.push(id);
        }

        // update selected columnIds
        this.selectedColumnIds = columnIds;
        this.selectedColumnChange.emit(columnIds);

        // set new displayed columns
        this.displayedColumns = this.selectedColumnIds.map(
          columnId => this.columns.filter(column => column.id === columnId)[0]
        );

        // mark for check because we are using ChangeDetectionStrategy.onPush
        this.ref.markForCheck();

      });

      /* istanbul ignore next */
      this.dragulaService.setOptions('sky-grid-heading', {
        moves: (el: any) => !el.classList.contains('sky-grid-header-locked'),
        accepts: ([,,, sibling]: any) => sibling === undefined || !sibling.classList.contains('sky-grid-header-locked')
      });
      /* tslint:enable */
    }

  }

  // Do an ngOnChanges where changes to selectedColumnIds and data are watched
  public ngOnChanges(changes: SimpleChanges) {
    if ((changes['selectedColumnIds'] || changes['columns']) && this.columns) {
      this.setDisplayedColumns();
    }

    if (changes['data'] && this.data) {
      this.transformData();
    }
  }

  private setDisplayedColumns(initialLoad: boolean = false) {
    if (this.selectedColumnIds !== undefined) {
      // setup displayed columns
      this.displayedColumns = this.selectedColumnIds.map(
        columnId => this.columns.filter(column => column.id === columnId)[0]
      );
    } else if (initialLoad) {
      this.displayedColumns = this.columns.filter(column => {
        return !column.hidden;
      });
    } else {
      this.displayedColumns = this.columns;
    }
  }

  private transformData() {
    // Transform data into object with id and data properties
    if (this.data.length > 0 && (!this.data[0].id || !this.data[0].data)) {
      this.items = this.data.map(item => new ListItemModel(item.id, item));
    } else {
      this.items = this.data;
    }
  }
}
