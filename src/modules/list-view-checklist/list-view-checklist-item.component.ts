import {
  Component, Input, ChangeDetectionStrategy
} from '@angular/core';
import { ListViewChecklistItemModel } from './state/items/item.model';

@Component({
  selector: 'sky-list-view-checklist-item',
  template: '<ng-content></ng-content>',
  styles: [require('./list-view-checklist-item.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListViewChecklistItemComponent {
  @Input() public item: ListViewChecklistItemModel;
}
