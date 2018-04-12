import {
  Component,
  OnInit
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'sky-list-view-checklist-demo',
  templateUrl: './list-view-checklist-demo.component.html'
})
export class SkyListViewChecklistDemoComponent implements OnInit {
  public items = Observable.of([
    { id: '1', column1: 101, column2: 'Apple', column3: 'Anne eats apples', category: 'a' },
    { id: '2', column1: 202, column2: 'Banana', column3: 'Ben eats bananas', category: 'a' },
    { id: '3', column1: 303, column2: 'Pear', column3: 'Patty eats pears', category: 'a' },
    { id: '4', column1: 404, column2: 'Grape', column3: 'George eats grapes', category: 'c' },
    { id: '5', column1: 505, column2: 'Banana', column3: 'Becky eats bananas', category: 'a' },
    { id: '6', column1: 606, column2: 'Lemon', column3: 'Larry eats lemons', category: 'b' },
    { id: '7', column1: 707, column2: 'Strawberry', column3: 'Sally eats strawberries', category: 'b' }
  ]);

  public selectedItems: any[] = [];
  public selectMode = 'multiple';
  public categories: string[];

  public ngOnInit() {
    this.getCategories();
  }

  public filterByCategory(item: any, category: string) {
    return (item.data.category === category);
  }

  public getCategories() {
    this.items.take(1).subscribe((items: any[]) => {
      this.categories = items
        .map((item: any) => item.category)
        .filter((search, index, category) => {
          return (search && category.indexOf(search) === index);
        });
    });
  }

  public selectedItemsChange(selectedMap: Map<string, boolean>) {
    this.items.take(1).subscribe((items) => {
      this.selectedItems = items.filter((item) => {
        return selectedMap.get(item.id);
      });
    });
  }
}
