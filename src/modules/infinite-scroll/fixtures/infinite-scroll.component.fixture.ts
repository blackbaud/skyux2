import { Component } from '@angular/core';

@Component({
    selector: 'sky-test-cmp',
    templateUrl: './infinite-scroll.component.fixture.html'
})
export class InfiniteScrollTestComponent {
    public hasMore: boolean = true;
    public items: object[] = [];
    
    public constructor(){
        this.loadMore();
    }

    public loadMore() {
        for(let i: number = 0; i<5; i++){
            this.items.push({name: 'test object: #' + i})
        }
        if (this.items.length > 20) {
            this.hasMore = false;
        }
    }
}
