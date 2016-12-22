import {
  Component,
  Input,
  ChangeDetectionStrategy,
  forwardRef,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { getValue } from 'microedge-rxstate/dist/helpers';
import { ListPagingComponent } from '../list/list-paging.component';
import { ListState, ListStateDispatcher } from '../list/state';
import {
  ListPagingSetMaxPagesAction,
  ListPagingSetItemsPerPageAction,
  ListPagingSetPageCountAction,
  ListPagingSetPageNumberAction,
  ListPagingSetDisplayedPagesAction
} from '../list/state/paging/actions';

@Component({
  selector: 'sky-list-paging',
  templateUrl: './list-paging.component.html',
  providers: [
    /* tslint:disable */
    { provide: ListPagingComponent, useExisting: forwardRef(() => SkyListPagingComponent)}
    /* tslint:enable */
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListPagingComponent extends ListPagingComponent implements OnInit {
  @Input() public pageSize: Observable<number> | number = 10;
  @Input() public maxPages: Observable<number> | number = 5;
  @Input() public pageNumber: Observable<number> | number = 1;

  constructor(
    state: ListState,
    dispatcher: ListStateDispatcher,
    private changeRef: ChangeDetectorRef
  ) {
    super(state, dispatcher);
  }

  public ngOnInit() {

      // subscribe to or use inputs
      getValue(this.pageSize, (pageSize: number) => {
        this.dispatcher.next(
          new ListPagingSetItemsPerPageAction(Number(pageSize))
        )
      });
      getValue(this.maxPages, (maxPages: number) =>
        this.dispatcher.next(
          new ListPagingSetMaxPagesAction(Number(maxPages))
        )
      );
      getValue(this.pageNumber, (pageNumber: number) =>
        this.dispatcher.next(
          new ListPagingSetPageNumberAction(Number(pageNumber))
        ));
  }

  get currentPageNumber() {
    return this.state.map(s => s.paging.pageNumber);
  }

  get maxDisplayedPages() {
    return this.state.map(s => s.paging.maxDisplayedPages);
  }

  get itemsPerPage() {
    return this.state.map(s => s.paging.itemsPerPage);
  }

  get itemCount() {
    return this.state.map(s => s.items.count);
  }

  public pageChange(currentPage: number) {
    this.dispatcher.next(
      new ListPagingSetPageNumberAction(Number(currentPage))
    );
  }

}
