import { Component, ViewChild, Inject } from '@angular/core';
import { SkyListComponent } from '../list.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list.component.fixture.html')
})
export class ListTestComponent {
  @ViewChild(SkyListComponent) public list: SkyListComponent;

  constructor(@Inject('items') public items: any) {
  }

  public get options() {
    let bs = new BehaviorSubject<Array<any>>(['banana', 'apple']);
    return bs.asObservable();
  }

}
