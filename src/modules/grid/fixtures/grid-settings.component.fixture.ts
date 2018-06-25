import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { SkyGridComponent } from '../grid.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './grid-settings.component.fixture.html'
})
export class GridSettingsTestComponent implements OnInit {
  @ViewChild(SkyGridComponent)
  public grid: SkyGridComponent;

  private settingsKey: string = '';

  public items: any[] = [
    { id: '1', column1: 101, column2: 'Apple', column3: 'Anne eats apples', composite: 'Comp A' },
    { id: '2', column1: 202, column2: 'Banana', column3: 'Ben eats bananas', composite: 'Comp B' },
    { id: '3', column1: 303, column2: 'Pear', column3: 'Patty eats pears', composite: 'Comp C' },
    { id: '4', column1: 404, column2: 'Grape', column3: 'George eats grapes', composite: 'Comp D' },
    { id: '5', column1: 505, column2: 'Banana', column3: 'Becky eats bananas',
      composite: 'Comp E' },
    { id: '6', column1: 606, column2: 'Lemon', column3: 'Larry eats lemons', composite: 'Comp F' },
    { id: '7', column1: 707, column2: 'Strawberry', column3: 'Sally eats strawberries',
      composite: 'Comp G' }
  ];

  public ngOnInit() {

  }

  public setKey(key: string) {
    this.settingsKey = key;
  }
}
