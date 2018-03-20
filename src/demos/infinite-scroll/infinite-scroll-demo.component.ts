import { Component } from '@angular/core';

export interface SomeItem {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'sky-infinite-scroll-demo',
  templateUrl: './infinite-scroll-demo.component.html'
})
export class SkyInfiniteScrollDemoComponent {
  public idCount: number = 1;
  public data: SomeItem[] = [];
  public hasMore: boolean = true;

  constructor() {
    this.addData();
  }

  public addData() {
    if (!this.hasMore) {
      return;
    }
    let newList: SomeItem[] = [];
    for (let i = 0; i < 5; i++) {
      newList.push({
        id: this.idCount,
        name: 'Title ' + this.idCount,
        description: 'A description for ' + this.idCount
      });
      this.idCount++;
    }
    this.data = this.data.concat(newList);
  }

  public loadFn() {
    console.log('Event emitted.');
    return setTimeout(() => {
      this.addData();
      if (this.idCount > 90) {
        this.hasMore = false;
      }
    }, 4000);
  }
}
