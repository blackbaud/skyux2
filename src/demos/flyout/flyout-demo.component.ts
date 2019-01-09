
import {
  Component,
  ViewChild
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import {
  Subject
} from 'rxjs';

import {
  SkyFlyoutInstance,
  SkyFlyoutService
} from '../../core';

import {
  FlyoutDemoContext
} from './flyout-demo-context';

import {
  SkyFlyoutDemoInternalComponent
} from './flyout-demo-internal.component';

import {
  SkyListViewGridComponent
} from '../../modules/list-view-grid';

import {
  ListItemModel
} from '../../modules/list/state';

import {
  SkyFlyoutDemoInternalSimpleComponent
} from './flyout-demo-internal-simple.component';

import {
  SkyFlyoutConfig
} from '../../modules/flyout';

@Component({
  selector: 'sky-flyout-demo',
  templateUrl: './flyout-demo.component.html'
})
export class SkyFlyoutDemoComponent {

  public users = Observable.of([
    { id: '1', name: 'Troy Barnes', constituentCode: 'Alumnus', latestGift: 175, status: 'Paid' },
    { id: '2', name: 'Britta Perry', constituentCode: 'Friend', latestGift: 5, status: 'Past due' },
    { id: '3', name: 'Pierce Hawthorne', constituentCode: 'Board Member', latestGift: 1500, status: 'Paid' },
    { id: '4', name: 'Annie Edison', constituentCode: 'Alumnus', latestGift: 100, status: 'Paid' },
    { id: '5', name: 'Shirley Bennett', constituentCode: 'Board Member', latestGift: 250, status: 'Paid' },
    { id: '6', name: 'Jeff Winger', constituentCode: 'Friend', latestGift: 250, status: 'Paid' },
    { id: '7', name: 'Abed Nadir', constituentCode: 'Major Donor', latestGift: 100000, status: 'Paid' }
  ]);

  public flyout: SkyFlyoutInstance<any>;

  // FLYOUT ITERATOR STUFF
  public rowHighlightedId: string;
  @ViewChild(SkyListViewGridComponent)
  public listViewGridComponent: SkyListViewGridComponent;
  private listState: ListItemModel[];
  private openFlyoutStream = new Subject<boolean>();

  constructor(
    private flyoutService: SkyFlyoutService
  ) { }

  public onNameClick(record: FlyoutDemoContext) {
    this.openRecord(record);
  }

  public closeAndRemoveFlyout() {
    if (this.flyout && this.flyout.isOpen) {
      this.flyoutService.close();
    }
    this.flyout = undefined;
  }

  public openSimpleFlyout() {
    this.flyout = this.flyoutService.open(SkyFlyoutDemoInternalSimpleComponent);

    this.flyout.closed.subscribe(() => {
      this.flyout = undefined;
    });
  }

  public openFlyoutWithCutsomWidth() {
    let flyoutConfig: SkyFlyoutConfig = {
      defaultWidth: 350,
      maxWidth: 500,
      minWidth: 200
    };
    this.flyout = this.flyoutService.open(SkyFlyoutDemoInternalSimpleComponent, flyoutConfig);

    this.flyout.closed.subscribe(() => {
      this.flyout = undefined;
    });
  }

  public openFlyoutWithUrlPermalink() {
    let flyoutConfig: SkyFlyoutConfig = {
      permalink: {
        label: `Visit blackbaud.com`,
        url: 'http://www.blackbaud.com'
      }
    };
    this.flyout = this.flyoutService.open(SkyFlyoutDemoInternalSimpleComponent, flyoutConfig);

    this.flyout.closed.subscribe(() => {
      this.flyout = undefined;
    });
  }

  public openFlyoutWithRoutePermalink() {
    let flyoutConfig: SkyFlyoutConfig = {
      permalink: {
        label: 'View details',
        route: {
          commands: ['/'],
          extras: {
            fragment: 'helloWorld',
            queryParams: {
              myParam: 'true'
            }
          }
        }
      }
    };
    this.flyout = this.flyoutService.open(SkyFlyoutDemoInternalSimpleComponent, flyoutConfig);

    this.flyout.closed.subscribe(() => {
      this.flyout = undefined;
    });
  }

  public openFlyoutWithPrimaryAction() {
    let flyoutConfig: SkyFlyoutConfig = {
      primaryAction: {
        label: 'Invoke primary action',
        callback: () => {
          alert('Primary action invoked');
        },
        closeAfterInvoking: true
      }
    };
    this.flyout = this.flyoutService.open(SkyFlyoutDemoInternalSimpleComponent, flyoutConfig);

    this.flyout.closed.subscribe(() => {
      this.flyout = undefined;
    });
  }

  public openFlyoutWithIterators() {
    let flyoutConfig: SkyFlyoutConfig = {
      showIterator: true
    };
    this.flyout = this.flyoutService.open(SkyFlyoutDemoInternalSimpleComponent, flyoutConfig);

    this.flyout.iteratorNextButtonClick.subscribe(() => {
      alert('Next iterator button clicked!');
    });

    this.flyout.iteratorPreviousButtonClick.subscribe(() => {
      alert('Prvious iterator button clicked!');
    });

    this.flyout.closed.subscribe(() => {
      this.flyout = undefined;
    });
  }

  private openRecord(record: FlyoutDemoContext) {

    // Prevent highlight from being prematurely removed.
    this.openFlyoutStream.next(true);

    this.flyout = this.flyoutService.open(SkyFlyoutDemoInternalComponent, {
      providers: [{
        provide: FlyoutDemoContext,
        useValue: record
      }],
      ariaDescribedBy: 'my-describedby-id',
      ariaLabelledBy: 'my-labelledby-id',
      ariaRole: 'modal',
      defaultWidth: 500,
      maxWidth: 1000,
      minWidth: 200,
      permalink: {
        route: {
          commands: ['/users', record.id],
          extras: {
            fragment: 'foobar',
            queryParams: {
              envid: 'fooenvid'
            }
          }
        }
      },
      showIterator: true
    });

    this.flyout.closed.subscribe(() => {
      this.flyout = undefined;
    });

    this.initIterators(record, this.flyout);
  }

  private initIterators(record: any, flyout: SkyFlyoutInstance<any>) {
    this.rowHighlightedId = record.id;

    // Remove highlights when flyout is closed.
    flyout.closed
      .takeUntil(this.openFlyoutStream)
      .subscribe(() => {
        this.rowHighlightedId = undefined;
    });

    this.listViewGridComponent.items
      .takeUntil(this.openFlyoutStream)
      .subscribe(s => {
        this.listState = s;

        flyout.iteratorPreviousButtonDisabled = this.isFirstElementInArray(this.rowHighlightedId, this.listState);
        flyout.iteratorNextButtonDisabled = this.isLastElementInArray(this.rowHighlightedId, this.listState);
    });

    flyout.iteratorPreviousButtonClick
      .takeUntil(this.openFlyoutStream)
      .subscribe(() => {
        let previous = this.stepToItemInArray(this.listState, this.rowHighlightedId, -1);
        this.openRecord(previous.data);
    });

    flyout.iteratorNextButtonClick
      .takeUntil(this.openFlyoutStream)
      .subscribe(() => {
        let next = this.stepToItemInArray(this.listState, this.rowHighlightedId, 1);
        this.openRecord(next.data);
    });

    flyout.iteratorPreviousButtonDisabled = this.isFirstElementInArray(this.rowHighlightedId, this.listState);
    flyout.iteratorNextButtonDisabled = this.isLastElementInArray(this.rowHighlightedId, this.listState);
  }

  private stepToItemInArray(array: Array<any>, currentId: string, step: number) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === currentId) {
        return array[i + step];
      }
    }
  }

  private isFirstElementInArray(id: any, array: any[]) {
    let element = array.find(x => x.id === id);
    if (array[0] === element) {
      return true;
    }
    return false;
  }

  private isLastElementInArray(id: any, array: any[]) {
    let element = array.find(x => x.id === id);
    if (array[array.length - 1] === element) {
      return true;
    }
    return false;
  }
}
