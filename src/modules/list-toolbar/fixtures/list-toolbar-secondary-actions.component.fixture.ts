import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyListToolbarSecondaryActionsComponent
} from '../';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list-toolbar-secondary-actions.component.fixture.html')
})
export class ListToolbarSecondaryActionsTestComponent {

  public showOption: boolean = true;

  @ViewChild(SkyListToolbarSecondaryActionsComponent)
  public secondaryActions: SkyListToolbarSecondaryActionsComponent;
}
