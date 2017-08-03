import { Component } from '@angular/core';

import {
  ListStateDispatcher,
  ListItemsLoadAction,
  ListItemModel
} from '../../../core';

@Component({
  selector: 'sky-list-paging-demo',
  templateUrl: './list-paging-demo.component.html',
  providers: [
    ListStateDispatcher
  ]
})
export class SkyListPagingDemoComponent {
  constructor(
    private dispatcher: ListStateDispatcher
  ) {
    this.dispatcher.next(new ListItemsLoadAction([
      new ListItemModel('1'),
      new ListItemModel('2'),
      new ListItemModel('3'),
      new ListItemModel('4'),
      new ListItemModel('5'),
      new ListItemModel('6'),
      new ListItemModel('7')
    ], true));
  }
}
