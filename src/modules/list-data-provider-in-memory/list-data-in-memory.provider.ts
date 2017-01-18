import { Observable, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { ListDataProvider } from '../list/list-data.provider';
import { ListDataRequestModel } from '../list/list-data-request.model';
import { ListDataResponseModel } from '../list/list-data-response.model';
import { ListItemModel } from '../list/state/items/item.model';

export class SkyListInMemoryDataProvider extends ListDataProvider {
  private items: BehaviorSubject<Array<ListItemModel>> =
    new BehaviorSubject<Array<ListItemModel>>([]);
  private lastItems: ListItemModel[];

  constructor(
    data?: Observable<Array<any>>
  ) {
    super(data);

    if (data) {
      data.subscribe(items => {
        this.items.next(items.map(d =>
          new ListItemModel(d.id || moment().toDate().getTime().toString() , d)
        ));
      });
    }
  }

  public count(): Observable<number> {
    return this.items.map((items) => items.length);
  }

  public get(request: ListDataRequestModel): Observable<ListDataResponseModel> {
    return this.items.map((result: Array<ListItemModel>) => {
        let itemStart = (request.pageNumber - 1) * request.pageSize;
        let pagedResult = result.slice(itemStart, itemStart + request.pageSize);

        return new ListDataResponseModel({
          count: result.length,
          items: pagedResult
        });
    });
  }
}
