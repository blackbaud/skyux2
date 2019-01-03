
import {
  AfterViewChecked,
  Component,
  ElementRef,
  Renderer2,
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
  templateUrl: './flyout-demo.component.html',
  styles: [`
  ::ng-deep .sky-grid-row.highlighted {
      border-top: 1px solid #007ca6;
      box-shadow: 0px 0px 0px 3px inset #007ca6; // TODO: add this class somewhere more appropriate & use $sky-text-color-action-primary
    }
  }
  `]
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
  @ViewChild('grid', { read: ElementRef })
  public gridRef: ElementRef;
  @ViewChild(SkyListViewGridComponent)
  public listViewGridComponent: SkyListViewGridComponent;
  private listState: ListItemModel[];
  private selectedRowId: string;
  private openFlyoutStream = new Subject<boolean>();

  constructor(
    private flyoutService: SkyFlyoutService,
    private renderer: Renderer2
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
    this.removeAllRowHighlights();
    this.highlightRow(record.id);
    this.selectedRowId = record.id;

    // Remove highlights when flyout is closed.
    flyout.closed
      .takeUntil(this.openFlyoutStream)
      .subscribe(() => {
        this.removeAllRowHighlights();
    });

    flyout.iteratorPreviousButtonClick
      .takeUntil(this.openFlyoutStream)
      .subscribe(() => {
        let previous = this.stepToItemInArray(this.listState, this.selectedRowId, -1);
        this.openRecord(previous.data);
    });

    flyout.iteratorNextButtonClick
      .takeUntil(this.openFlyoutStream)
      .subscribe(() => {
        let next = this.stepToItemInArray(this.listState, this.selectedRowId, 1);
        this.openRecord(next.data);
    });

    if (this.isFirstElementInArray(this.selectedRowId, this.listState)) {
      flyout.iteratorPreviousButtonDisabled = true;
    }

    if (this.isLastElementInArray(this.selectedRowId, this.listState)) {
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

  private highlightRow(id: string) {
    let row = this.gridRef.nativeElement.querySelector(`tbody tr[sky-cmp-id="${id}"]`);
    this.renderer.addClass(row, 'highlighted');
  }

  private removeAllRowHighlights() {
    let rows = this.gridRef.nativeElement.querySelectorAll('tbody tr');
    rows.forEach((row: HTMLElement) => {
      this.renderer.removeClass(row, 'highlighted');
    });
  }
}
