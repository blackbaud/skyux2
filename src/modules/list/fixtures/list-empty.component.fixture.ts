import { Component, ViewChild, Inject } from '@angular/core';
import { SkyListComponent } from '../list.component';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SkyListInMemoryDataProvider } from '../../list-data-provider-in-memory';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list-empty.component.fixture.html')
})
export class ListEmptyTestComponent {
  @ViewChild(SkyListComponent) public list: SkyListComponent;
  public itemsCount: number = 2;

  constructor(
    @Inject('items') public items: any,
    public dataProvider: SkyListInMemoryDataProvider
  ) {
  }

  public get options(): Observable<any[]> {
    const bs = new BehaviorSubject<any[]>(['banana', 'apple']);
    const obs = bs.asObservable();
    bs.complete();
    return obs;
  }
}
