import { Component, Input, ChangeDetectionStrategy, forwardRef, OnInit } from '@angular/core';
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
  template: require('./list-paging.component.html'),
  styles: [require('./list-paging.component.scss')],
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
    dispatcher: ListStateDispatcher
  ) {
    super(state, dispatcher);
  }

  public ngOnInit() {
    Observable.combineLatest(
      this.state.map(s => s.items.count).distinctUntilChanged(),
      this.state.map(s => s.paging.itemsPerPage).distinctUntilChanged(),
      this.state.map(s => s.paging.maxDisplayedPages).distinctUntilChanged(),
      this.state.map(s => s.paging.pageNumber).distinctUntilChanged(),
      (itemCount, itemsPerPage, maxDisplayedPages, pageNumber) => {
        if (itemCount === 0) {
          this.dispatcher.next(new ListPagingSetDisplayedPagesAction([]));
          this.dispatcher.next(new ListPagingSetPageCountAction(0));
          return;
        }

        let pageCount = Math.floor(itemCount / itemsPerPage);
        /* istanbul ignore else */
        if (pageCount * itemsPerPage < itemCount) {
          pageCount += 1;
        }

        if (pageNumber > pageCount) {
          return this.dispatcher.next(
            new ListPagingSetPageNumberAction(pageCount)
          );
        }

        let pageBounds = Math.floor((maxDisplayedPages - 1) / 2);
        let lowerBound = pageNumber - pageBounds - 1;
        let upperBound = pageNumber + pageBounds - 1;

        if (pageCount < maxDisplayedPages) {
          lowerBound = 0;
          upperBound = pageCount - 1;
        } else {
          if (upperBound > pageCount - 1) {
            upperBound = pageCount - 1;

            /* istanbul ignore else */
            if (upperBound - lowerBound < maxDisplayedPages) {
              lowerBound = upperBound - maxDisplayedPages + 1;
            }
          } else if (lowerBound < 0) {
            lowerBound = 0;
            upperBound = maxDisplayedPages - 1;
          }
        }

        let displayedPageNumbers: Array<number> = [];
        for (let i = lowerBound; i <= upperBound; i++) {
          displayedPageNumbers.push(i + 1);
        }

        this.dispatcher.next(
          new ListPagingSetDisplayedPagesAction(displayedPageNumbers)
        );
        this.dispatcher.next(new ListPagingSetPageCountAction(pageCount));
      })
      .subscribe();

      // subscribe to or use inputs
      getValue(this.pageSize, (pageSize: number) =>
        this.dispatcher.next(
          new ListPagingSetItemsPerPageAction(Number(pageSize))
        )
      );
      getValue(this.maxPages, (maxPages: number) =>
        this.dispatcher.next(
          new ListPagingSetMaxPagesAction(Number(maxPages))
        )
      );
      getValue(this.pageNumber, (pageNumber: number) => this.setPage(Number(pageNumber)));
  }

  get currentPageNumber() {
    return this.state.map(s => s.paging.pageNumber);
  }

  get displayedPages() {
    return this.state.map(s => s.paging.displayedPages);
  }

  get pageCount() {
    return this.state.map(s => s.paging.pageCount);
  }

  public setPage(pageNumber: number): void {
    if (pageNumber < 1) {
      return;
    }

    this.state.map(s => s.paging.pageCount)
      .filter(x => x > 0)
      .take(1)
      .subscribe(pageCount => {
        if (pageNumber > pageCount) {
          return;
        }

        this.dispatcher.next(new ListPagingSetPageNumberAction(pageNumber));
      });
  }

  public nextPage(): void {
    this.state.map(s => s.paging.pageNumber)
      .take(1)
      .subscribe(pageNumber => this.setPage(pageNumber + 1));
  }

  public previousPage(): void {
    this.state.map(s => s.paging.pageNumber)
      .take(1)
      .subscribe(pageNumber => this.setPage(pageNumber - 1));
  }
}
