import { Component, ViewChild, Inject } from '@angular/core';
import { SkyListComponent } from '../list.component';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SkyListToolbarComponent } from '../../list-toolbar';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list.component.fixture.html')
})
export class ListTestComponent {
  @ViewChild(SkyListComponent)
  public list: SkyListComponent;

  @ViewChild('toolbar')
  public toolbar: SkyListToolbarComponent;

  public sortFields: any;

  constructor(@Inject('items') public items: any) {
  }

  public get options(): Observable<any[]> {
    const bs = new BehaviorSubject<any[]>(['banana', 'apple']);
    const obs = bs.asObservable();
    bs.complete();
    return obs;
  }

}
