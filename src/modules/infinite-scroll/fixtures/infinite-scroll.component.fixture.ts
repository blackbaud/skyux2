import { Component } from '@angular/core';

@Component({
    selector: 'sky-test-cmp',
    templateUrl: './infinite-scroll.component.fixture.html'
})
export class InfiniteScrollTestComponent {
    public hasMore: boolean = true;
    public items: object[] = [];

    public constructor() {
        this.loadMore();
    }

    public loadMore() {
        let num: number = this.items.length;
        for (let i: number = num; i < num + 20; i++) {
            this.items.push({name: 'test object: #' + i});
        }
        if (this.items.length > 100) {
            this.hasMore = false;
        }
    }
}
