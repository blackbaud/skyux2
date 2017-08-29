import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { STATUSES } from '../link-records-statuses';
import { LinkRecordsMatchModel } from '../state/matches/match.model';

@Component({
  selector: 'sky-link-records-item-title-content-children',
  templateUrl: './link-records-item-title.component.content-children.fixture.html'
})
export class SkyLinkRecordsItemTitleContentChildrenTestComponent {
  public matchFields: Array<string> = ['description', 'name'];

  public items: Observable<any> = Observable.of([
    {id: '1', address: 101, name: 'Apple', description: 'Anne eats apples'}
  ]);

  public matches: Observable<Array<LinkRecordsMatchModel>> = Observable.of([
    new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.Edit,
      item: {id: '11', address: 111, name: 'Big Apple', description: 'George and his apples'}
    })
  ]);
}
