import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';

@Injectable()
export class SkyListSecondaryActionsService {
  public secondaryActionsCount = 0;
  public secondaryActionsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public addSecondaryAction() {
    this.secondaryActionsCount++;
    this.secondaryActionsSubject.next(this.secondaryActionsCount);
  }

  public removeSecondaryAction() {
    this.secondaryActionsCount--;
    this.secondaryActionsSubject.next(this.secondaryActionsCount);
  }
}
