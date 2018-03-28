import {
  Component,
  TemplateRef,
  ViewChild,
  AfterContentInit
} from '@angular/core';

import {
  ListStateDispatcher,
  ListToolbarItemModel
} from '../list/state';

import {
  SkyListSecondaryActionsService
} from './list-secondary-actions.service';

@Component({
  selector: 'sky-list-secondary-actions',
  templateUrl: './list-secondary-actions.component.html',
  styleUrls: ['./list-secondary-actions.component.scss'],
  providers: [
    SkyListSecondaryActionsService
  ]
})
export class SkyListSecondaryActionsComponent implements AfterContentInit {

  public dropdownHidden: boolean = false;

  @ViewChild('secondaryActions')
  private secondaryActionsTemplate: TemplateRef<any>;

  constructor(
    private dispatcher: ListStateDispatcher,
    private actionService: SkyListSecondaryActionsService
  ) {
  }

  public ngAfterContentInit() {
    let secondaryActionItem = new ListToolbarItemModel(
      {
        id: 'secondary-actions',
        template: this.secondaryActionsTemplate,
        location: 'right'
      }
    );
    this.dispatcher.toolbarAddItems([
      secondaryActionItem
    ],
    -1);

    this.actionService.secondaryActionsSubject.subscribe((count) => {
      this.dropdownHidden = count < 1;
    });
  }
}
