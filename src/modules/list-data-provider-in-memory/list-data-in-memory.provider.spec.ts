import { SkyListInMemoryDataProvider } from '.';
import { ListDataRequestModel } from '../list';
import { Observable } from 'rxjs/Observable';
import {
  fakeAsync,
  tick
} from '@angular/core/testing';

describe('in memory data provider', () => {
  let items: Observable<Array<any>>;

  beforeEach(() => {
    items = Observable.of([
      { id: '1', column1: 101, column2: 'Apple', column3: 'Anne eats apples' },
      { id: '2', column1: 202, column2: 'Banana', column3: 'Ben eats bananas' },
      { id: '3', column1: 303, column2: 'Pear', column3: 'Patty eats pears' },
      { id: '4', column1: 404, column2: 'Grape', column3: 'George eats grapes' },
      { id: '5', column1: 505, column2: 'Banana', column3: 'Becky eats bananas' },
      { id: '6', column1: 606, column2: 'Lemon', column3: 'Larry eats lemons' },
      { id: '7', column1: 707, column2: 'Strawberry', column3: 'Sally eats strawberries' }
    ]);
  });

  it('should handle searching with no results, clearing search, and then having a paging change',
    fakeAsync(() => {

    function searchFunction(data: any, searchText: string) {
      return data.column2.indexOf(searchText) > -1;
    }

    let provider = new SkyListInMemoryDataProvider(items);

    let searchObject = {
        searchText: 'z',
        functions: [searchFunction]
      };

    let request = new ListDataRequestModel({
      search: searchObject,
      pageSize: 5,
      pageNumber: 1
    });

    tick();

    provider.get(request).take(1).subscribe((result) => {
      expect(result.items.length).toBe(0);
      expect(result.count).toBe(0);
    });

    tick();

    searchObject = {
      searchText: '',
      functions: [searchFunction]
    };
    request = new ListDataRequestModel({
      search: searchObject,
      pageSize: 5,
      pageNumber: 1
    });

    tick();

    provider.get(request).take(1).subscribe((result) => {
      expect(result.items.length).toBe(5);
      expect(result.count).toBe(7);
    });

    tick();

    request = new ListDataRequestModel({
      search: searchObject,
      pageSize: 5,
      pageNumber: 2
    });

    tick();

    provider.get(request).take(1).subscribe((result) => {
      expect(result.items.length).toBe(2);
      expect(result.count).toBe(7);
    });

    tick();
  }));

  describe('sorting', () => {
    it('should handle an ascending sort', fakeAsync(() => {
      let provider = new SkyListInMemoryDataProvider(items);

      let request = new ListDataRequestModel({
        sort: {
          fieldSelectors: [
            {
              fieldSelector: 'column2',
              descending: false
            }
          ]
        },
        pageSize: 5,
        pageNumber: 1
      });

      tick();

      provider.get(request).take(1).subscribe((result) => {
        expect(result.count).toBe(7);
        expect(result.items[2].data.column2).toEqual('Banana');

      });

      tick();

    }));

    it('should handle a descending sort', fakeAsync(() => {
      let provider = new SkyListInMemoryDataProvider(items);

      let request = new ListDataRequestModel({
        sort: {
          fieldSelectors: [
            {
              fieldSelector: 'column2',
              descending: true
            }
          ]
        },
        pageSize: 5,
        pageNumber: 1
      });

      tick();

      provider.get(request).take(1).subscribe((result) => {
        expect(result.count).toBe(7);
        expect(result.items[0].data.column2).toEqual('Strawberry');

      });

      tick();
    }));

    it('should handle sorting with null values', fakeAsync(() => {
      /* tslint:disable */
      items = Observable.of([
        { id: '1', column1: 101, column2: null, column3: 'Anne eats apples' },
        { id: '2', column1: 202, column2: 'Banana', column3: 'Ben eats bananas' },
        { id: '3', column1: 303, column2: 'Pear', column3: 'Patty eats pears' },
        { id: '4', column1: 404, column2: null, column3: 'George eats grapes' },
        { id: '5', column1: 505, column2: 'Banana', column3: 'Becky eats bananas' },
        { id: '6', column1: 606, column2: 'Lemon', column3: 'Larry eats lemons' },
        { id: '7', column1: 707, column2: 'Strawberry', column3: 'Sally eats strawberries' }
      ]);
      /* tslint:enable */

      let provider = new SkyListInMemoryDataProvider(items);

      let request = new ListDataRequestModel({
        sort: {
          fieldSelectors: [
            {
              fieldSelector: 'column2',
              descending: false
            }
          ]
        },
        pageSize: 5,
        pageNumber: 1
      });

      tick();

      provider.get(request).take(1).subscribe((result) => {
        expect(result.count).toBe(7);
        expect(result.items[0].data.column2).toEqual('Banana');

      });

      tick();
    }));

    it('should handle sorting with nonstring values', fakeAsync(() => {
       items = Observable.of([
        { id: '1', column1: 101, column2: new Date('2/1/2016'), column3: 'Anne eats apples' },
        { id: '2', column1: 202, column2: new Date('1/1/2016'), column3: 'Ben eats bananas' },
        { id: '3', column1: 303, column2: new Date('6/1/2016'), column3: 'Patty eats pears' },
        { id: '4', column1: 404, column2: new Date('7/1/2016'), column3: 'George eats grapes' },
        { id: '5', column1: 505, column2: new Date('4/1/2016'), column3: 'Becky eats bananas' },
        { id: '6', column1: 606, column2: new Date('3/1/2016'), column3: 'Larry eats lemons' },
        { id: '7', column1: 707, column2: new Date('2/1/2016'), column3: 'Sally eats strawberries' }
      ]);

      let provider = new SkyListInMemoryDataProvider(items);

      let request = new ListDataRequestModel({
        sort: {
          fieldSelectors: [
            {
              fieldSelector: 'column2',
              descending: false
            }
          ]
        },
        pageSize: 5,
        pageNumber: 1
      });

      tick();

      provider.get(request).take(1).subscribe((result) => {
        expect(result.count).toBe(7);
        expect(result.items[0].id).toEqual('2');

      });

      tick();
    }));

    it('should handle searching and then sorting', () => {

    });
  });
});
