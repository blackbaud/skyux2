import {
  Component, Input, ContentChildren, QueryList, ChangeDetectionStrategy, AfterContentInit
} from '@angular/core';
import { ListViewChecklistItemModel } from './state/items/item.model';
import { SkyCheckboxComponent } from '../checkbox';

@Component({
  selector: 'sky-list-view-checklist-item',
  template: '<ng-content></ng-content>',
  styleUrls: ['./list-view-checklist-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListViewChecklistItemComponent implements AfterContentInit {
  @Input() public item: ListViewChecklistItemModel;
  @ContentChildren(SkyCheckboxComponent) public checkboxComponents: QueryList<SkyCheckboxComponent>;

  public ngAfterContentInit() {
    // fix because checkbox doesn't always start as checked, on init, when it should
    this.checkboxComponents.forEach(cmp => cmp.checked = this.item.selected);
  }
}
