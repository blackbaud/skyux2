import {
  Component,
  OnInit
} from '@angular/core';

import {
  ListState,
  ListStateDispatcher,
  ListItemsLoadAction,
  ListItemModel
} from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'sky-list-paging-demo',
  templateUrl: './list-paging-demo.component.html',
  providers: [
    ListState,
    ListStateDispatcher
  ]
})
export class SkyListPagingDemoComponent implements OnInit {
  constructor(
    private dispatcher: ListStateDispatcher
  ) { }

  public ngOnInit() {
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
