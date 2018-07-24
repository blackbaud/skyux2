import {
  Component,
  OnInit
} from '@angular/core';
import { BehaviorSubject } from '../../../node_modules/rxjs';

let nextId = 0;
let nextListId = 0;

@Component({
  selector: 'sky-infinite-scroll-demo',
  templateUrl: './infinite-scroll-demo.component.html',
  styleUrls: ['./infinite-scroll-demo.component.scss']
})
export class SkyInfiniteScrollDemoComponent implements OnInit {
  public data: any[] = [];
  public hasMore = true;

  public listItems = new BehaviorSubject<any[]>([]);
  public listHasMore = true;
  private _listItems: any[] = [];

  public ngOnInit(): void {
    this.addData();
    this.addListData();
  }

  public onScrollEnd(): void {
    if (this.hasMore) {
      this.addData();
    }
  }

  public onListScrollEnd(): void {
    if (this.listHasMore) {
      this.addListData();
    }
  }

  private addData(): void {
    this.mockRemote().then((result: any) => {
      this.data = this.data.concat(result.data);
      this.hasMore = result.hasMore;
    });
  }

  private addListData(): void {
    this.mockListRemote().then((result: any) => {
      this._listItems = this._listItems.concat(result.data);
      this.listItems.next(this._listItems);
      this.listHasMore = result.hasMore;
    });
  }

  private mockRemote(): Promise<any> {
    const data: any[] = [];

    for (let i = 0; i < 8; i++) {
      data.push({
        name: `Item #${++nextId}`
      });
    }

    // Simulate async request.
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve({
          data,
          hasMore: (nextId < 50)
        });
      }, 1000);
    });
  }

  private mockListRemote(): Promise<any> {
    const data: any[] = [];

    for (let i = 0; i < 8; i++) {
      data.push({
        name: `List item #${++nextListId}`
      });
    }

    // Simulate async request.
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve({
          data,
          hasMore: (nextListId < 50)
        });
      }, 1000);
    });
  }
}
