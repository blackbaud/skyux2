import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'link-records-visual',
  templateUrl: './link-records-visual.component.html'
})
export class LinkRecordsVisualComponent {
  public matchFields: Array<any> = [{key: 'description'}, {key: 'name'}];

  public newItem: any = { id: '99', address: 999, name: 'Lime', description: 'Laura eats limes.' };

  public items: Observable<any> = Observable.of([
    { id: '1', address: 101, name: 'Apple', description: 'Anne eats apples' }
  ]);

  public matches: Observable<Array<any>> = Observable.of([
    {
      key: '1',
      status: 'suggested',
      item: { id: '11', address: 111, name: 'Big Apple', description: 'George and his apples' }
    }
  ]);

  public matches2: Observable<Array<any>> = Observable.of([
    {
      key: '1',
      status: 'no_match',
      item: undefined
    }
  ]);
}
