import {
  Injectable
} from '@angular/core';

@Injectable()
export class SkySortService {
  private sortItems: Array<any> = [];

  public addItem(sortItem: any) {
    this.sortItems.push(sortItem);
  }

  public selectItem(sortItem: any) {
    let item: any;
    for (let i = 0; i < this.sortItems.length; i++) {
      item = this.sortItems[i];
      if (sortItem === item) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    }
  }
}
