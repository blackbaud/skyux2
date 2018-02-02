
import {
  Component
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import {
  SkyFlyoutInstance,
  SkyFlyoutService
} from '../../modules/flyout';

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

  private flyout: SkyFlyoutInstance;

  constructor(
    private flyoutService: SkyFlyoutService
  ) { }

  public createFlyout() {
    this.flyout = this.flyoutService.create(SkyFlyoutDemoInternalComponent, {
      providers: [],
      ariaDescribedBy: 'my-describedby-id',
      ariaLabelledBy: 'my-labelledby-id',
      ariaRole: 'modal'
    });

    this.flyout.closed.subscribe(() => {
      console.log('Flyout closed!');
    });

    this.flyout.opened.subscribe(() => {
      console.log('Flyout opened!');
    });
  }

  public openRecord(record: any) {
    if (!this.flyout) {
      this.createFlyout();
    }

    this.flyout.open();

    // Update the flyout with the appropriate record:
    this.flyout.componentInstance.record = record;
  }
}
