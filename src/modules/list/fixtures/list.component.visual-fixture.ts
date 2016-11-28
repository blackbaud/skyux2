import { Component, NgModule, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { SkyModule, SkyListComponent } from '../../../../src/core';
import {
  ListState,
  ListStateDispatcher
} from '../../../../src/modules/list/state';
import { ListFilterDataModel } from '../state/filters/filter-data.model';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './list.component.visual-fixture.html'
})
export class AppComponent {
  public bs: BehaviorSubject<any>;
  public items: Observable<any>;
  @ViewChild(SkyListComponent) public list: SkyListComponent;

  constructor(private state: ListState, private dispatcher: ListStateDispatcher) {
    /* tslint:disable */
    let itemsArray = [
      { id: '1', column1: '30', column2: 'Apple', column3: 1 },
      { id: '2', column1: '01', column2: 'Banana', column3: 3 },
      { id: '3', column1: '11', column2: 'Banana', column3: 11 },
      { id: '4', column1: '12', column2: 'Carrot', column3: 12 },
      { id: '5', column1: '12', column2: 'Edamame', column3: 12 },
      { id: '6', column1: null, column2: null, column3: 20 },
      { id: '7', column1: '22', column2: 'Grape', column3: 21 }
    ];
    /* tslint:enable */

    this.bs = new BehaviorSubject<Array<any>>(itemsArray);
    this.items = this.bs.asObservable();
  }

  public get options() {
    let bs = new BehaviorSubject<Array<any>>(['banana', 'apple']);
    return bs.asObservable();
  }

  public itemSearch(item: any, searchText: string) {
    return item.column2.toLowerCase().indexOf(searchText) !== -1 ?
      item.column2.toLowerCase() : -1;
  }

  public filterOnStatus(item: any, filter: ListFilterDataModel) {
    /* tslint:disable */
    return item.data.column2 !== null ?
      item.data.column2.toLowerCase().indexOf(filter.value) !== -1 : false;
    /* tslint:enable */
  }
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SkyModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    ListState,
    ListStateDispatcher
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
