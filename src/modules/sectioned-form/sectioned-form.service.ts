import {
  Injectable,
  OnDestroy
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SkySectionedFormService implements OnDestroy {
  public requiredChange = new BehaviorSubject(undefined);
  public invalidChange = new BehaviorSubject(undefined);

  public ngOnDestroy() {
    this.requiredChange.complete();
    this.invalidChange.complete();
  }

  public requiredFieldChanged(required: boolean) {
    this.requiredChange.next(required);
  }

  public invalidFieldChanged(invalid: boolean) {
    this.invalidChange.next(invalid);
  }
}
