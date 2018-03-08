import {
  Component,
  ViewChild,
  Inject
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SkyListToolbarComponent } from '../../list-toolbar';

import { SkyListComponent } from '../list.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './list.component.fixture.html'
})
export class ListTestComponent {
  @ViewChild(SkyListComponent)
  public list: SkyListComponent;

  @ViewChild('toolbar')
  public toolbar: SkyListToolbarComponent;

  public sortFields: any;

  constructor(
    @Inject('items') public items: any
  ) { }

  public get options() {
    let bs = new BehaviorSubject<Array<any>>(['banana', 'apple']);
    return bs.asObservable();
  }
}
