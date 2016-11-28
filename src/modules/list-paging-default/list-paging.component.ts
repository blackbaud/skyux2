import {
  ListPagingConfigSetItemsPerPageAction, ListPagingConfigSetMaxPagesAction
} from './state/config/actions';
import {
  ListPagingCurrentSetDisplayedPagesAction, ListPagingCurrentSetPageNumberAction,
  ListPagingCurrentSetPageCountAction
} from './state/current/actions';
import { Component, Input, ChangeDetectionStrategy, forwardRef, OnInit } from '@angular/core';
import { getValue } from 'microedge-rxstate/dist/helpers';
import { ListPagingComponent } from '../list/list-paging.component';
import { ListStateDispatcher } from '../list/state';
import { PagingStateDispatcher, PagingState, PagingStateModel } from './state';
import { Observable } from 'rxjs';
import { ListState } from '../list/state';

@Component({
  selector: 'sky-list-paging',
  template: require('./list-paging.component.html'),
  styles: [require('./list-paging.component.scss')],
  providers: [
    /* tslint:disable */
    { provide: ListPagingComponent, useExisting: forwardRef(() => SkyListPagingComponent)},
    /* tslint:enable */
    PagingState,
    PagingStateModel,
    PagingStateDispatcher
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListPagingComponent extends ListPagingComponent implements OnInit {
  @Input() public pageSize: Observable<number> | number = 10;
  @Input() public maxPages: Observable<number> | number = 5;
  @Input() public pageNumber: Observable<number> | number = 1;

  constructor(
    state: ListState,
    private dispatcher: ListStateDispatcher,
    private pagingState: PagingState,
    private pagingStateDispatcher: PagingStateDispatcher
  ) {
    super(state);
  }

  public ngOnInit() {
    Observable.combineLatest(
      this.state.map(s => s.items).distinctUntilChanged(),
      this.pagingState.map(s => s.config).distinctUntilChanged(),
      this.pagingState.map(s => s.current.pageNumber).distinctUntilChanged(),
      (itemsList, config, pageNumber) => {
        let items = itemsList.items;
        let itemCount = items.length > itemsList.count ? items.length : itemsList.count;
        if (itemCount === 0) {
          this.dispatcher.itemsSetDisplayed([]);
          this.pagingStateDispatcher.next(new ListPagingCurrentSetDisplayedPagesAction([]));
          this.pagingStateDispatcher.next(new ListPagingCurrentSetPageCountAction(0));
          return;
        }

        let pageCount = Math.floor(itemCount / config.itemsPerPage);
        /* istanbul ignore else */
        if (pageCount * config.itemsPerPage < itemCount) {
          pageCount += 1;
        }

        if (pageNumber > pageCount) {
          return this.pagingStateDispatcher.next(
            new ListPagingCurrentSetPageNumberAction(pageCount)
          );
        }

        let pageBounds = Math.floor((config.maxDisplayedPages - 1) / 2);
        let lowerBound = pageNumber - pageBounds - 1;
        let upperBound = pageNumber + pageBounds - 1;

        if (pageCount < config.maxDisplayedPages) {
          lowerBound = 0;
          upperBound = pageCount - 1;
        } else {
          if (upperBound > pageCount - 1) {
            upperBound = pageCount - 1;

            /* istanbul ignore else */
            if (upperBound - lowerBound < config.maxDisplayedPages) {
              lowerBound = upperBound - config.maxDisplayedPages + 1;
            }
          } else if (lowerBound < 0) {
            lowerBound = 0;
            upperBound = config.maxDisplayedPages - 1;
          }
        }

        let displayedPageNumbers: Array<number> = [];
        for (let i = lowerBound; i <= upperBound; i++) {
          displayedPageNumbers.push(i + 1);
        }

        this.pagingStateDispatcher.next(
          new ListPagingCurrentSetDisplayedPagesAction(displayedPageNumbers)
        );
        this.pagingStateDispatcher.next(new ListPagingCurrentSetPageCountAction(pageCount));

        let itemStart = (pageNumber - 1) * config.itemsPerPage;
        let displayedItems = items.slice(itemStart, itemStart + config.itemsPerPage);
        this.dispatcher.itemsSetDisplayed(displayedItems, itemCount);
      })
      .subscribe();

      // subscribe to or use inputs
      getValue(this.pageSize, (pageSize: number) =>
        this.pagingStateDispatcher.next(
          new ListPagingConfigSetItemsPerPageAction(Number(pageSize))
        )
      );
      getValue(this.maxPages, (maxPages: number) =>
        this.pagingStateDispatcher.next(
          new ListPagingConfigSetMaxPagesAction(Number(maxPages))
        )
      );
      getValue(this.pageNumber, (pageNumber: number) => this.setPage(Number(pageNumber)));
  }

  get currentPageNumber() {
    return this.pagingState.map(s => s.current.pageNumber);
  }

  get displayedPages() {
    return this.pagingState.map(s => s.current.displayedPages);
  }

  get pageCount() {
    return this.pagingState.map(s => s.current.pageCount);
  }

  public setPage(pageNumber: number): void {
    if (pageNumber < 1) {
      return;
    }

    this.pagingState.map(s => s.current.pageCount)
      .filter(x => x > 0)
      .take(1)
      .subscribe(pageCount => {
        if (pageNumber > pageCount) {
          return;
        }

        this.pagingStateDispatcher.next(new ListPagingCurrentSetPageNumberAction(pageNumber));
      });
  }

  public nextPage(): void {
    this.pagingState.map(s => s.current.pageNumber)
      .take(1)
      .subscribe(pageNumber => this.setPage(pageNumber + 1));
  }

  public previousPage(): void {
    this.pagingState.map(s => s.current.pageNumber)
      .take(1)
      .subscribe(pageNumber => this.setPage(pageNumber - 1));
  }
}
