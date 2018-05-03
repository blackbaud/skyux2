import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

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
  public data: SomeItem[] = [];
  public hasMore = true;

  constructor() {
    this.addData();
  }

  public addData() {
    let newList: SomeItem[] = [];
    for (let i = 0; i < 5; i++) {
      newList.push({
        id: this.idCount,
        name: 'Item #' + this.idCount,
        description: 'A description for ' + this.idCount
      });
      this.idCount++;
    }
    this.data = this.data.concat(newList);
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
