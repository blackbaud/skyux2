import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input
} from '@angular/core';

import {
  ListViewComponent
} from '../list/list-view.component';

import {
  // ListItemModel,
  // ListSortFieldSelectorModel,
  // ListSearchModel,
  // ListStateDispatcher,
  ListState
} from '../list/state';

@Component({
  selector: 'sky-list-view-action-button',
  templateUrl: './list-view-action-button.component.html',
  styleUrls: ['./list-view-action-button.component.scss'],
  providers: [
    /* tslint:disable:no-forward-ref */
    {
      provide: ListViewComponent,
      useExisting: forwardRef(() => SkyListViewActionButtonComponent)
    }
    /* tslint:enable */
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListViewActionButtonComponent extends ListViewComponent {
  @Input()
  public items: any[];

  constructor(
    state: ListState
    // private dispatcher: ListStateDispatcher,
    // public gridState: GridState,
    // public gridDispatcher: GridStateDispatcher
  ) {
    super(state, 'Action Button View');
  }
}
