import {
  Component,
  Input,
  ViewChild
} from '@angular/core';

import {
  SkyWaitComponent
} from '..';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './wait.component.fixture.html'
})
export class SkyWaitTestComponent {
  @Input()
  public isWaiting: boolean;

  @Input()
  public isFullPage: boolean;

  @Input()
  public isNonBlocking: boolean;

  @ViewChild(SkyWaitComponent)
  public waitComponent: SkyWaitComponent;
}
