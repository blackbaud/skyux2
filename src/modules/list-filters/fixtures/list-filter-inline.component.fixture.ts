import {
  Component
} from '@angular/core';

import {
  ListFilterModel,
  ListItemModel
} from '../../list/state';

 @Component({
   selector: 'sky-test-cmp',
   templateUrl: './list-filter-inline.component.fixture.html'
 })
 export class ListFilterInlineTestComponent {
  public fruitTypeFilterFunction(item: ListItemModel, filterValue: any): boolean {
    return filterValue === 'any' || filterValue === item.data.type;
  }

  public hideOrangeFilterFunction(item: ListItemModel, filterValue: any): boolean {
    return !filterValue || (filterValue && item.data.color !== 'orange');
  }
 }
