import {
  AfterContentInit,
  Component,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { SkyListSecondaryActionsService } from './list-secondary-actions.service';

@Component({
  selector: 'sky-list-secondary-action',
  templateUrl: './list-secondary-action.component.html'
})
export class SkyListSecondaryActionComponent implements AfterContentInit {
  @ViewChild('listSecondaryAction')
  private templateRef: TemplateRef<any>;

  constructor(
    private actionService: SkyListSecondaryActionsService
  ) { }

  public ngAfterContentInit() {
    this.actionService.addSecondaryAction({
      template: this.templateRef
    });
  }
}
