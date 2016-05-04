import {
  beforeEach,
  ComponentFixture,
  describe,
  expect,
  it,
  inject,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, EventEmitter} from 'angular2/core';
import {SkyAlertComponent} from './alert.component';
import {SkyResources} from '../resources/resources';

describe('Alert component', () => {
  'use strict';

  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  it('should hide the close button if it is not cloesable', () => {
    return tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture) => {
        let closeAttrs: NamedNodeMap;
        let cmp = fixture.componentInstance as TestComponent;
        let el = fixture.nativeElement as HTMLElement;

        cmp.closeable = true;

        fixture.detectChanges();

        closeAttrs = el.querySelector('.sky-alert-close').attributes;

        expect(closeAttrs['hidden']).toBe(undefined);

        cmp.closeable = false;

        fixture.detectChanges();

        expect(closeAttrs['hidden']).not.toBeNull();
      });
  });

  it('should be hidden when the close button is clicked', (done: Function) => {
    tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture) => {
        let cmp = fixture.componentInstance as TestComponent;
        let el = fixture.nativeElement;

        cmp.closeable = true;

        fixture.detectChanges();

        cmp.closedChange.subscribe((closed: boolean) => {
          expect(closed).toBe(true);
          done();
        });

        el.querySelector('.sky-alert-close').click();

        fixture.detectChanges();

        expect(el.querySelector('.sky-alert').attributes.hidden).not.toBeNull();
      });
  });

  it('should allow the screen reader text for the close button to be localizable', () => {
    return tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture) => {
        let cmp = fixture.componentInstance as TestComponent;
        let el = fixture.nativeElement as HTMLElement;
        let closeEl: Element;

        cmp.closeable = true;

        fixture.detectChanges();

        closeEl = el.querySelector('.sky-alert-close');

        expect(closeEl.attributes['aria-label'].value).toBe(SkyResources.getString('alert_close'));
      });
  });

  it('should add the appropriate styling when an alert type is specified', (done: Function) => {
    done();
  });
});

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyAlertComponent],
  template: `
<sky-alert [closeable]="closeable" [closed]="closed" (closedChange)="onClosedChange($event)">
  Alert
</sky-alert>
  `
})
class TestComponent {
  public closeable = false;

  public closed = false;

  public closedChange = new EventEmitter<boolean>();

  public onClosedChange = function (closed: boolean) {
    this.closed = closed;
    this.closedChange.emit(closed);
  };
}
