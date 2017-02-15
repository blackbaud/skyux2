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

@Component({
  selector: 'sky-list-toolbar-secondary-actions',
  templateUrl: './list-toolbar-secondary-actions.component.html'
})
export class SkyListToolbarSecondaryActionsComponent implements AfterContentInit{

  @ViewChild('secondaryActions')
  private secondaryActionsTemplate: TemplateRef<any>;

  constructor(
    private dispatcher: ListStateDispatcher
  ) {
  }

  public ngAfterContentInit() {
    let secondaryActionItem = new ListToolbarItemModel(
      {
        id: 'secondary-actions',
        template: this.secondaryActionsTemplate,
        location: 'center'
      }
    )
    this.dispatcher.toolbarAddItems([
      secondaryActionItem
    ]);
  }
}
