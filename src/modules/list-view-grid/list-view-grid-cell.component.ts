import {
  Component, Input, ViewChild, ViewContainerRef, TemplateRef, OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { ListItemModel } from '../list/state/items/item.model';
import { ListState } from '../list/state';
import { getData } from '../list/helpers';

@Component({
  selector: 'sky-list-view-grid-cell',
  template: '<template #cell></template>',
  styles: [require('./list-view-grid-cell.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListViewGridCellComponent implements OnInit {
  @Input() public item: ListItemModel;
  @Input() public columnId: string;
  @Input() public isSelected: boolean;
  @Input() private template: TemplateRef<any>;
  @Input() private fieldSelector: string;
  @ViewChild('cell', { read: ViewContainerRef }) private container: ViewContainerRef;

  constructor(private state: ListState) {
  }

  public ngOnInit() {
    this.container.createEmbeddedView(this.template, this);
  }

  get row() {
    return this.item.data;
  }

  get value() {
    if (this.item.data && (this.fieldSelector || this.columnId)) {
      return getData(this.item.data, this.fieldSelector || this.columnId);
    }

    return undefined;
  }
}
