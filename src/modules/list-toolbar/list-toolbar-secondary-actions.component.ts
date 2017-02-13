import {
  Component,
  TemplateRef,
  ViewChild,
  OnInit
} from '@angular/core';

import {
  ListStateDispatcher
} from '../list/state';

@Component({
  selector: 'sky-list-toolbar-secondary-actions',
  templateUrl: './list-toolbar-secondary-actions.component.html'
})
export class SkyListToolbarSecondaryActions implements OnInit{

  @ViewChild('secondaryActions')
  private secondaryActionsTemplate: TemplateRef<any>;

  constructor(
    private dispatcher: ListStateDispatcher
  ) {
  }

  public ngOnInit() {

  }
}
