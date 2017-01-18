import {
  Component,
  Input,
  TemplateRef,
  ContentChildren,
  QueryList,
   ViewChild,
  forwardRef,
  ChangeDetectionStrategy,
  AfterContentInit,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { getValue } from 'microedge-rxstate/dist/helpers';

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
export class SkyGridComponent implements AfterContentInit {

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

  @ContentChildren(SkyGridColumnComponent)
  private columnComponents: QueryList<SkyGridColumnComponent>;

  public columns: SkyGridColumnModel[];

  public displayedColumns: SkyGridColumnModel[];

  public items: Array<any>;

  constructor(private dragulaService: DragulaService, private ref: ChangeDetectorRef) {}

  public ngAfterContentInit() {
    if (this.columnComponents.length === 0) {
      throw new Error('Grid requires at least one sky-grid-column to render.');
    }

    this.columns = this.columnComponents.map(columnComponent => {
      return new SkyGridColumnModel(columnComponent.template, columnComponent);
    });

    this.items = this.data.map(item => new ListItemModel(item.id, item));

    if (this.selectedColumnIds !== undefined) {
      //setup displayed columns
      this.displayedColumns = this.columns.filter(column => {
        return this.selectedColumnIds.indexOf(column.id || column.field) !== -1;
      });
    } else {
      this.displayedColumns = this.columns;
    }

    //Deal with hidden columns

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

      //setup displayed columns based on reordered columnIds
      this.displayedColumns = columnIds.map(
        columnId => this.columns.filter(column => column.id === columnId)[0]
      );

      this.ref.markForCheck();
    });

    /* istanbul ignore next */
    let bag = this.dragulaService.find('heading');
    if (bag !== undefined) {
      this.dragulaService.destroy('heading');
    }

    this.dragulaService.setOptions('heading', {
      moves: (el: any) => !el.classList.contains('sky-grid-header-locked'),
      accepts: ([,,, sibling]: any) => sibling === undefined || !sibling.classList.contains('sky-grid-header-locked')
    });
    /* tslint:enable */
  }

  // Do an ngOnChanges where changes to selectedColumnIds are watched
}
