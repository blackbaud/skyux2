import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';

import { SkyModule } from '../../../src/core';
import { ListFilterDataModel } from '../../../src/modules/list/state/filters/filter-data.model';

import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './app.component.html'
})
class AppComponent {
  public items: Observable<any> = Observable.of([
    { id: '1', column1: 101, column2: 'Apple', column3: 'Anne eats apples' },
    { id: '2', column1: 202, column2: 'Banana', column3: 'Ben eats bananas' },
    { id: '3', column1: 303, column2: 'Pear', column3: 'Patty eats pears' },
    { id: '4', column1: 404, column2: 'Grape', column3: 'George eats grapes' },
    { id: '5', column1: 505, column2: 'Banana', column3: 'Becky eats bananas' },
    { id: '6', column1: 606, column2: 'Lemon', column3: 'Larry eats lemons' },
    { id: '7', column1: 707, column2: 'Strawberry', column3: 'Sally eats strawberries' }
  ]);

  public get optionsColumn2() {
    let bs = new BehaviorSubject<Array<any>>(['banana', 'apple']);
    return bs.asObservable();
  }

  public get optionsColumn1() {
    let bs = new BehaviorSubject<Array<any>>([101, 404, 606]);
    return bs.asObservable();
  }

  public filterOnColumn2(item: any, filter: ListFilterDataModel) {
    return item.data.column2 !== null ?
      item.data.column2.toLowerCase().indexOf(filter.value) !== -1 : false;
  }

  public filterOnColumn1(item: any, filter: ListFilterDataModel) {
    return item.data.column1 !== null ?
      item.data.column1 == filter.value : false;
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
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
