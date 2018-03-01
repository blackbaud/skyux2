
import {
  Component
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
  SkyFlyoutInstance,
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

  public flyout: SkyFlyoutInstance<SkyFlyoutDemoInternalComponent>;

  constructor(
    private flyoutService: SkyFlyoutService
  ) { }

  public openRecord(record: FlyoutDemoContext) {
    this.flyout = this.flyoutService.open(SkyFlyoutDemoInternalComponent, {
      providers: [{
        provide: FlyoutDemoContext,
        useValue: record
      }],
      ariaDescribedBy: 'my-describedby-id',
      ariaLabelledBy: 'my-labelledby-id',
      ariaRole: 'modal'
    });

    this.flyout.closed.subscribe(() => {
      this.flyout = undefined;
    });
  }

  public closeFlyout() {
    this.flyout.close();
  }

  public removeFlyout() {
    this.flyoutService.close();
    this.flyout = undefined;
  }

  public isRecordOpen(record: FlyoutDemoContext): boolean {
    return (
      this.flyout &&
      this.flyout.componentInstance.context.id === record.id
    );
  }
}
