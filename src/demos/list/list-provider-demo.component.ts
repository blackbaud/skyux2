import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  ListDataProvider,
  ListDataRequestModel,
  ListDataResponseModel,
  ListItemModel
} from '@blackbaud/skyux/dist/core';

export class DemoListProvider extends ListDataProvider {

  public items: Observable<Array<ListItemModel>>;
  public remoteCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    super();

    this.items = Observable.of([
      {
        id: '1',
        data: {
          column1: 101, column2: 'Apple', column3: 'Anne eats apples'
        }
      },
      {
        id: '2',
        data: {
          column1: 202, column2: 'Banana', column3: 'Ben eats bananas'
        }
      },
      {
        id: '3',
        data: {
          column1: 303, column2: 'Pear', column3: 'Patty eats pears'
        }
      },
      {
        id: '4',
        data: {
          column1: 404, column2: 'Grape', column3: 'George eats grapes'
        }
      },
      {
        id: '5',
        data: {
          column1: 505, column2: 'Banana', column3: 'Becky eats bananas'
        }
      },
      {
        id: '6',
        data: {
          column1: 606, column2: 'Lemon', column3: 'Larry eats lemons'
        }
      },
      {
        id: '7',
        data: {
          column1: 707, column2: 'Strawberry', column3: 'Sally eats strawberries'
        }
      }
    ]);
  }

  public get(request: ListDataRequestModel): Observable<ListDataResponseModel> {
    /*
      In get() you get data based on a given ListDataRequestModel.
      You can fetch data remotely here and return an Observable<ListDataResponseModel>.
    */
    return this.fakeHttpRequest(request);
  }

  public count(): Observable<number> {
    return this.remoteCount;
  }

  private fakeHttpRequest(request: ListDataRequestModel): Observable<ListDataResponseModel> {
    return this.items.map((items: Array<ListItemModel>) => {
      let searchedList = items;

      if (request.search.searchText) {
        let searchText = request.search.searchText.toLowerCase();

        searchedList = items.filter((item) => {
          return item.data.column2.toLowerCase().indexOf(searchText) > -1 ||
            item.data.column3.toLowerCase().indexOf(searchText) > -1;
        });
      }

      let itemStart = (request.pageNumber - 1) * request.pageSize;
      let pagedResult = searchedList.slice(itemStart, itemStart + request.pageSize);

      this.remoteCount.next(searchedList.length);

      return new ListDataResponseModel({
        count: searchedList.length,
        items: pagedResult
      });
    });
  }
}

@Component({
  selector: 'sky-list-provider-demo',
  templateUrl: './list-provider-demo.component.html'
})
export class SkyListProviderDemoComponent {
  public listDataProvider: DemoListProvider = new DemoListProvider();
}
