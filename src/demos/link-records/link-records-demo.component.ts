import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import {
  SKY_LINK_RECORDS_STATUSES,
  SkyLinkRecordsComponent,
  SkyLinkRecordsMatchModel
} from '@blackbaud/skyux/dist/core';

const getWindow = () => {
  return window;
};

@Component({
  selector: 'sky-link-records-demo',
  templateUrl: './link-records-demo.component.html'
})
export class SkyLinkRecordsDemoComponent {
  @ViewChild(SkyLinkRecordsComponent) public item: SkyLinkRecordsComponent;
  public window: any;

  public matchFields: Array<any> = [{key: 'description'}, {key: 'name'}];

  public newItem: any = { id: '99', address: 999, name: 'Lime', description: 'Laura eats limes.' };

  public items: Observable<any> = Observable.of([
    { id: '1', address: 101, name: 'Apple', description: 'Anne eats apples' },
    { id: '2', address: 202, name: 'Banana', description: 'Ben eats bananas' },
    { id: '3', address: 303, name: 'Pear', description: 'Patty eats pears' },
    { id: '4', address: 404, name: 'Grape', description: 'George eats grapes' },
    { id: '5', address: 505, name: 'Banana', description: 'Becky eats bananas' },
    { id: '6', address: 606, name: 'Lemon', description: 'Larry eats lemons' },
    { id: '7', address: 707, name: 'Kiwi', description: 'Kim eats kiwis.' },
    { id: '8', address: 808, name: 'Strawberry', description: 'Sally eats strawberries' }
  ]);

  public matches: Observable<Array<SkyLinkRecordsMatchModel>> = Observable.of([
    new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Edit,
      item: { id: '11', address: 111, name: 'Big Apple', description: 'George and his apples' }
    }),
    new SkyLinkRecordsMatchModel({
      key: '2',
      status: undefined,
      item: undefined
    }),
    new SkyLinkRecordsMatchModel({
      key: '3',
      status: SKY_LINK_RECORDS_STATUSES.NoMatch,
      item: undefined
    }),
    new SkyLinkRecordsMatchModel({
      key: '5',
      status: SKY_LINK_RECORDS_STATUSES.Suggested,
      item: { id: '55', address: 555, name: 'Huge Banana', description: 'Barry loves bananas.' }
    }),
    new SkyLinkRecordsMatchModel({
      key: '6',
      status: SKY_LINK_RECORDS_STATUSES.Selected,
      item: { id: '66', address: 666, name: 'Lovely Lemons', description: 'Lisa loves lemons.' }
    }),
    new SkyLinkRecordsMatchModel({
      key: '7',
      status: SKY_LINK_RECORDS_STATUSES.Created,
      item: undefined
    }),
    new SkyLinkRecordsMatchModel({
      key: '8',
      status: SKY_LINK_RECORDS_STATUSES.Linked,
      item: {
        id: '88',
        address: 888,
        name: 'Strawberry Shortcake',
        description: 'Steve loves strawberries'
      }
    })
  ]);

  constructor() {
    this.window = getWindow();
  }

  public showResults() {
    this.item.results.take(1).subscribe((r: any) => this.window.alert(JSON.stringify(r)));
  }
}
