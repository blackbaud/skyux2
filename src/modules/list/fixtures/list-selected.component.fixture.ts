import { Component, ViewChild, Inject } from '@angular/core';
import { SkyListComponent } from '../list.component';
import { BehaviorSubject } from 'rxjs';
import { SkyListToolbarComponent } from '../../list-toolbar';
import { ListItemModel } from '../state';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list-selected.component.fixture.html')
})
export class ListSelectedTestComponent {
  @ViewChild(SkyListComponent)
  public list: SkyListComponent;

  public selectedItems: ListItemModel[];

  public selectedIds: Array<string> = ['1', '2'];

  constructor(@Inject('items') public items: any) {
  }

  public selectedChangeFunction(selectedItems: ListItemModel[]) {
    this.selectedItems = selectedItems;
  }

}
