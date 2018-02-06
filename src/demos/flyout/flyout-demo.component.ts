
import {
  Component
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import {
  SkyFlyoutService
} from '../../modules/flyout';

import { FlyoutDemoContext } from './flyout-demo-context';
import { SkyFlyoutDemoInternalComponent } from './flyout-demo-internal.component';

@Component({
  selector: 'sky-flyout-demo',
  templateUrl: './flyout-demo.component.html'
})
export class SkyFlyoutDemoComponent {
  public users = Observable.of([
    { id: '1', name: 'Sally' },
    { id: '2', name: 'John' },
    { id: '3', name: 'David' },
    { id: '4', name: 'Janet' }
  ]);

  constructor(
    private flyoutService: SkyFlyoutService
  ) { }

  public openRecord(record: FlyoutDemoContext) {
    const flyout = this.flyoutService.open(SkyFlyoutDemoInternalComponent, {
      providers: [{
        provide: FlyoutDemoContext,
        useValue: record
      }],
      ariaDescribedBy: 'my-describedby-id',
      ariaLabelledBy: 'my-labelledby-id',
      ariaRole: 'modal'
    });

    flyout.closed.subscribe(() => {
      console.log('Flyout closed!');
    });
  }
}
