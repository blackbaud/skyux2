import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyListSecondaryActionsComponent
} from '../';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list-secondary-actions.component.fixture.html')
})
export class ListSecondaryActionsTestComponent {

  public showOption: boolean = true;

  @ViewChild(SkyListSecondaryActionsComponent)
  public secondaryActions: SkyListSecondaryActionsComponent;
}
