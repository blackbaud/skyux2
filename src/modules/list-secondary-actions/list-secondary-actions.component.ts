import {
  AfterContentInit,
  Component,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  ListStateDispatcher,
  ListToolbarItemModel
} from '../list/state';

import { SkyListSecondaryActionsService } from './list-secondary-actions.service';
import { SkyListSecondaryAction } from './list-secondary-action';

@Component({
  selector: 'sky-list-secondary-actions',
  templateUrl: './list-secondary-actions.component.html',
  styleUrls: ['./list-secondary-actions.component.scss'],
  providers: [
    SkyListSecondaryActionsService
  ]
})
export class SkyListSecondaryActionsComponent implements AfterContentInit {
  public dropdownHidden = false;
  public actions = new BehaviorSubject<any[]>([]);

  @ViewChild('secondaryActions')
  private secondaryActionsTemplate: TemplateRef<any>;

  constructor(
    private dispatcher: ListStateDispatcher,
    private actionService: SkyListSecondaryActionsService
  ) { }

  public ngAfterContentInit() {
    const secondaryActionItem = new ListToolbarItemModel({
      id: 'secondary-actions',
      template: this.secondaryActionsTemplate,
      location: 'right'
    });

    this.dispatcher.toolbarAddItems([secondaryActionItem], -1);

    this.actionService.secondaryActionsSubject.subscribe((count: number) => {
      this.dropdownHidden = (count < 1);
    });

    this.actionService.actionsStream.subscribe((actions: SkyListSecondaryAction[]) => {
      this.actions.next(actions);
    });
  }
}
