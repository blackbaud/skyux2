import { Component, ViewChild } from '@angular/core';
import { SkyListPagingComponent } from '../list-paging.component';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list-paging-default.component.fixture.html')
})
export class ListPagingDefaultTestComponent {
  @ViewChild(SkyListPagingComponent) public pagingComponent: SkyListPagingComponent;
}
