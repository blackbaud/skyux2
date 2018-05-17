import {
  Component,
  OnInit
} from '@angular/core';

let nextId = 0;

@Component({
  selector: 'sky-infinite-scroll-demo',
  templateUrl: './infinite-scroll-demo.component.html',
  styleUrls: ['./infinite-scroll-demo.component.scss']
})
export class SkyInfiniteScrollDemoComponent implements OnInit {
  public data: any[] = [];
  public hasMore = true;

  public ngOnInit(): void {
    this.addData();
  }

  public onScrollEnd(): void {
    if (this.hasMore) {
      this.addData();
    }
  }

  private addData(): void {
    this.mockRemote().then((result: any) => {
      this.data = this.data.concat(result.data);
      this.hasMore = result.hasMore;
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
}
