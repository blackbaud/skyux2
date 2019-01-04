
import {
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
  Subject
} from 'rxjs';

import {
  SkyFlyoutInstance,
  SkyFlyoutService
} from '../../core';

import { FlyoutDemoContext } from './flyout-demo-context';
import { SkyFlyoutDemoInternalComponent } from './flyout-demo-internal.component';
import { ListItemModel, SkyListViewGridComponent } from '../../../dist/core';

@Component({
  selector: 'sky-flyout-demo',
  templateUrl: './flyout-demo.component.html'
})
export class SkyFlyoutDemoComponent implements AfterViewChecked {
  public users = Observable.of([
    { id: '1', name: 'Sally' },
    { id: '2', name: 'John' },
    { id: '3', name: 'David' },
    { id: '4', name: 'Janet' }
  ]);

  public flyout: SkyFlyoutInstance<SkyFlyoutDemoInternalComponent>;

  // FLYOUT ITERATOR STUFF
  public highlightedRowId: string;
  @ViewChild(SkyListViewGridComponent)
  public listViewGridComponent: SkyListViewGridComponent;
  private listState: ListItemModel[];
  private openFlyoutStream = new Subject<boolean>();

  constructor(
    private flyoutService: SkyFlyoutService
  ) { }

  public ngAfterViewChecked(): void {
    // TODO: unsubscribe on destroy
    this.listViewGridComponent.items.subscribe(s => {
      this.listState = s;
    });
  }

  public openRecord(record: FlyoutDemoContext) {

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
      showIterator: true // TODO: create different demo to showcase this separately.
    });

    this.flyout.closed.subscribe(() => {
      this.flyout = undefined;
    });

    this.initIterators(record, this.flyout);
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

  public openFlyoutWithUrlPermalink() {
    this.flyoutService.open(SkyFlyoutDemoInternalComponent, {
      providers: [{
        provide: FlyoutDemoContext,
        useValue: {
          id: '1',
          name: 'Jenkins'
        }
      }],
      permalink: {
        url: 'https://blackbaud.com'
      }
    });
  }

  public openFlyoutWithPrimaryAction() {
    this.flyoutService.open(SkyFlyoutDemoInternalComponent, {
      providers: [{
        provide: FlyoutDemoContext,
        useValue: {
          id: '2',
          name: 'Partridge'
        }
      }],
      primaryAction: {
        label: 'Invoke primary action',
        callback: () => {
          alert('Primary action invoked');
        },
        closeAfterInvoking: true
      }
    });
  }

  private initIterators(record: any, flyout: SkyFlyoutInstance<any>) {
    this.highlightedRowId = record.id;

    // Remove highlights when flyout is closed.
    flyout.closed
      .takeUntil(this.openFlyoutStream)
      .subscribe(() => {
        this.highlightedRowId = undefined;
    });

    flyout.iteratorPreviousButtonClick
      .takeUntil(this.openFlyoutStream)
      .subscribe(() => {
        let previous = this.stepToItemInArray(this.listState, this.highlightedRowId, -1);
        this.openRecord(previous.data);
    });

    flyout.iteratorNextButtonClick
      .takeUntil(this.openFlyoutStream)
      .subscribe(() => {
        let next = this.stepToItemInArray(this.listState, this.highlightedRowId, 1);
        this.openRecord(next.data);
    });

    if (this.isFirstElementInArray(this.highlightedRowId, this.listState)) {
      flyout.iteratorPreviousButtonDisabled = true;
    }

    if (this.isLastElementInArray(this.highlightedRowId, this.listState)) {
      flyout.iteratorNextButtonDisabled = true;
    }
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
