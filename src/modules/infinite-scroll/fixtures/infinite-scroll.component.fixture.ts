import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  BehaviorSubject,
  Observable
} from 'rxjs';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './infinite-scroll.component.fixture.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollTestComponent {
  public _hasMore: BehaviorSubject<boolean>;
  public hasMore: Observable<boolean>;
  public items: object[] = [];

  public constructor() {
    this._hasMore = new BehaviorSubject(true);
    this.hasMore = this._hasMore.asObservable();
    this.loadMore();
  }

  public loadMore() {
    const num: number = this.items.length;
    for (let i: number = num; i < num + 20; i++) {
      this.items.push({name: 'test object: #' + i});
    }
    if (this.items.length > 100) {
      this._hasMore.next(false);
    }
  }
}
