import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SKY_LINK_RECORDS_STATUSES } from '../link-records-statuses';
import { SkyLinkRecordsMatchModel } from '../state/matches/match.model';

@Component({
  selector: 'sky-link-records-item-content-fixture-input-template',
  templateUrl: './link-records-item-content.component.input-template.fixture.html'
})
export class SkyLinkRecordsItemContentInputTemplateTestComponent {
  public matchFields: Array<string> = ['description', 'name'];

  public items: Observable<any> = Observable.of([
    {id: '1', address: 101, name: 'Apple', description: 'Anne eats apples'}
  ]);

  public matches: Observable<Array<SkyLinkRecordsMatchModel>> = Observable.of([
    new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Created,
      item: {id: '11', address: 111, name: 'Big Apple', description: 'George and his apples'}
    })
  ]);
}
