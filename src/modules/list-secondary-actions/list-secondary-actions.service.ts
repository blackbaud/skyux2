import {
  Injectable,
  OnDestroy
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SkyListSecondaryActionsService implements OnDestroy {
  public secondaryActionsCount = 0;
  public secondaryActionsSubject = new BehaviorSubject<number>(0);

  public ngOnDestroy() {
    this.secondaryActionsSubject.complete();
  }

  public addSecondaryAction() {
    this.secondaryActionsCount++;
    this.secondaryActionsSubject.next(this.secondaryActionsCount);
  }

  public removeSecondaryAction() {
    this.secondaryActionsCount--;
    this.secondaryActionsSubject.next(this.secondaryActionsCount);
  }
}
