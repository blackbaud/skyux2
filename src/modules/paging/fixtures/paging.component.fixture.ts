import { Component, ViewChild } from '@angular/core';
import { SkyPagingComponent } from '../paging.component';

@Component({
  selector: 'sky-test-cmp',
  template: require('./paging.component.fixture.html')
})
export class PagingTestComponent {
  @ViewChild(SkyPagingComponent) public pagingComponent: SkyPagingComponent;

  public pageSize = 2;
  public maxPages = 3;
  public currentPage = 1;
  public itemCount = 8;
  public label: string;
  public currentPageChanged(currentPage: number) {
    this.currentPage = currentPage;
  }
}
