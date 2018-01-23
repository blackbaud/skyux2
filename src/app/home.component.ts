import {
  Component
} from '@angular/core';

import {
  SkyDemoService
} from '../demo';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sky-demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class SkyDemoHomeComponent {
  public components: any;
  public selectedComponent: any;
  public items: Observable<Array<any>> = Observable.of([
    { id: '1', column1: 101, column2: 'Apple', column3: 'Anne eats apples' },
    { id: '2', column1: 202, column2: 'Banana', column3: 'Ben eats bananas' },
    { id: '3', column1: 303, column2: 'Pear', column3: 'Patty eats pears' },
    { id: '4', column1: 404, column2: 'Grape', column3: 'George eats grapes' },
    { id: '5', column1: 505, column2: 'Banana', column3: 'Becky eats bananas' },
    { id: '6', column1: 606, column2: 'Lemon', column3: 'Larry eats lemons' },
    { id: '7', column1: 707, column2: 'Strawberry', column3: 'Sally eats strawberries' }
  ]);

  constructor(
    private demoService: SkyDemoService
  ) {
    this.components = this.demoService.components;
  }

  public open(component: any) {
    this.selectedComponent = component;
  }
}
