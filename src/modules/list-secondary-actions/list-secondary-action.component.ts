import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  SkyListSecondaryActionsService
} from './list-secondary-actions.service';

@Component({
  selector: 'sky-list-secondary-action',
  templateUrl: './list-secondary-action.component.html',
  styleUrls: ['./list-secondary-action.component.scss']
})
export class SkyListSecondaryActionComponent implements OnDestroy {
  constructor(private actionService: SkyListSecondaryActionsService) {
    this.actionService.addSecondaryAction();
  }

  public ngOnDestroy() {
    this.actionService.removeSecondaryAction();
  }
}
