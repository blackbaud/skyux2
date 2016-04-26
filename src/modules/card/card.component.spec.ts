import {
  beforeEach,
  ComponentFixture,
  describe,
  expect,
  it,
  inject,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, EventEmitter, Output} from 'angular2/core';
import {SkyCardComponent} from './card.component';

describe('Card component', () => {
  'use strict';

  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  it('should place the individual components in their respective placeholders', (done: Function) => {
    let html = `
      <sky-card>
        <sky-card-title>Title</sky-card-title>
        <sky-card-content>Content</sky-card-content>
        <sky-card-actions>
          <button type="button" class="btn btn-default">Button</button>
        </sky-card-actions>
      </sky-card>'
    `;

    tcb.overrideTemplate(TestComponent, html)
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        expect(el.querySelector('.bb-card-title sky-card-title')).toHaveText('Title');
        expect(el.querySelector('.bb-card-content sky-card-content')).toHaveText('Content');
        expect(el.querySelector('.bb-card-actions button')).toHaveText('Button');

        done();
      });
  });

  it('should add the appropriate CSS class for small cards', (done: Function) => {
    let html = `
      <sky-card [size]="'small'">
      </sky-card>'
    `;

    tcb.overrideTemplate(TestComponent, html)
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        expect(el.querySelector('section.bb-card')).toHaveCssClass('bb-card-small');

        done();
      });
  });

  it('should display a checkbox when the selectable attribute is set to true', (done: Function) => {
    let html = `
      <sky-card [selectable]="'true'">
      </sky-card>'
    `;

    tcb.overrideTemplate(TestComponent, html)
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        let wrapperEl = el.querySelector('.bb-card.bb-card-selectable .bb-card-header .bb-card-check .sky-checkbox-wrapper');
        expect(wrapperEl).not.toBeNull();

        done();
      });
  });

  it('should allow the user to click the entire card to select the card', (done: Function) => {
    let html = `
      <sky-card [selectable]="showCheckbox" [selected]="cardSelected" (selectedChange)="updateCardSelected($event)">
        <sky-card-title>Title</sky-card-title>
        <sky-card-content>Content</sky-card-content>
      </sky-card>
    `;

    tcb.overrideTemplate(TestComponent, html)
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture) => {
        let cmp = fixture.componentInstance as TestComponent,
          el = fixture.nativeElement;

        fixture.detectChanges();

        cmp.cardSelectedChange.subscribe((cardSelected: boolean) => {
          expect(cardSelected).toBe(true);
          done();
        });

        el.querySelector('.bb-card-content').click();

        fixture.detectChanges();

        expect(el.querySelector('.bb-card.bb-card-selected')).not.toBe(null);
      });
  });

  it('should not allow clicking the card to select it when it is not selectable', (done: Function) => {
    let html = `
      <sky-card [selectable]="showCheckbox" [selected]="cardSelected" (selectedChange)="updateCardSelected($event)">
        <sky-card-title>Title</sky-card-title>
        <sky-card-content>Content</sky-card-content>
      </sky-card>
    `;

    tcb.overrideTemplate(TestComponent, html)
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture) => {
        let cmp = fixture.componentInstance as TestComponent,
          el = fixture.nativeElement;

        cmp.showCheckbox = false;
        fixture.detectChanges();

        el.querySelector('.bb-card-content').click();

        fixture.detectChanges();

        expect(el.querySelector('.bb-card.bb-card-selected')).toBe(null);

        done();
      });
  });
});

@Component({
  selector: 'test-cmp',
  directives: [SkyCardComponent],
  template: ''
})
class TestComponent {
  @Output()
  cardSelectedChange = new EventEmitter();

  updateCardSelected($event: boolean) {
    this.cardSelected = $event;
    this.cardSelectedChange.emit($event);
  }

  cardSelected = false;

  showCheckbox = true;
}
