import {
  Injectable,
  OnDestroy
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SkySortService implements OnDestroy {
  public selectedItem = new BehaviorSubject('');

  public ngOnDestroy() {
    this.selectedItem.complete();
  }

  public selectItem(sortItem: string) {
    this.selectedItem.next(sortItem);
  }
}
