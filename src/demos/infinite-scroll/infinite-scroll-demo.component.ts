import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SomeItem {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'sky-infinite-scroll-demo',
  templateUrl: './infinite-scroll-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyInfiniteScrollDemoComponent {
  public idCount = 1;
  public hasMore = true;

  private _data: SomeItem[];
  public data: BehaviorSubject<SomeItem[]>;

  constructor() {
    this._data = [];
    this.data = new BehaviorSubject(this._data);
    this.addData();
  }

  public addData() {
    for (let i = 0; i < 5; i++) {
      this._data.push({
        id: this.idCount,
        name: 'Item #' + this.idCount,
        description: 'A description for ' + this.idCount
      });
      this.idCount++;
    }
    this.data.next(this._data);
  }

  public loadFn() {
    // Using setTimeout to simulate the delay of an async retrieval
    setTimeout(() => {
      if (this.hasMore) {
        this.addData();
        if (this.idCount > 90) {
          this.hasMore = false;
        }
      }
    }, 2000);
  }
}
