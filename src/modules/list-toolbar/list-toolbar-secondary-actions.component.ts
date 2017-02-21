import {
  Component,
  TemplateRef,
  ViewChild,
  AfterContentInit,
  ContentChildren,
  QueryList
} from '@angular/core';

import {
  ListStateDispatcher,
  ListToolbarItemModel
} from '../list/state';

import {
  SkyListToolbarSecondaryActionComponent
} from './list-toolbar-secondary-action.component';

@Component({
  selector: 'sky-list-toolbar-secondary-actions',
  templateUrl: './list-toolbar-secondary-actions.component.html',
  styleUrls: ['./list-toolbar-secondary-actions.component.scss']
})
export class SkyListToolbarSecondaryActionsComponent implements AfterContentInit {

  public dropdownHidden: boolean = false;

  @ViewChild('secondaryActions')
  private secondaryActionsTemplate: TemplateRef<any>;

  @ContentChildren(SkyListToolbarSecondaryActionComponent)
  private secondaryActions: QueryList<SkyListToolbarSecondaryActionComponent>;

  constructor(
    private dispatcher: ListStateDispatcher
  ) {
  }

  public ngAfterContentInit() {
    let secondaryActionItem = new ListToolbarItemModel(
      {
        id: 'secondary-actions',
        template: this.secondaryActionsTemplate,
        location: 'right',
        index: -1
      }
    )
    this.dispatcher.toolbarAddItems([
      secondaryActionItem
    ]);

    this.dropdownHidden = this.secondaryActions.length < 1;
    this.secondaryActions.changes.subscribe(() => {
      this.dropdownHidden = this.secondaryActions.length < 1;
    });
  }
}
