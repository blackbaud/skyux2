import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import {
  beforeEach,
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';

import { SkyCardComponent } from './card.component';

function validateCardSelected(cmp: TestComponent, cardEl: any, selected: boolean) {
  let selectedEl = cardEl.querySelector('.sky-card.sky-card-selected');

  if (selected) {
    expect(cmp.cardSelected).toBe(true);
    expect(selectedEl).not.toBeNull();
  } else {
    expect(cmp.cardSelected).toBe(false);
    expect(selectedEl).toBeNull();
  }
}

describe('Card component', () => {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  it('should place the individual components in their respective placeholders', () => {
    let html = `
      <sky-card>
        <sky-card-title>Title</sky-card-title>
        <sky-card-content>Content</sky-card-content>
        <sky-card-actions>
          <button type="button" class="btn btn-default">Button</button>
        </sky-card-actions>
      </sky-card>
    `;

    tcb
      .overrideTemplate(TestComponent, html)
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        expect(el.querySelector('.sky-card-title sky-card-title')).toHaveText('Title');
        expect(el.querySelector('.sky-card-content sky-card-content')).toHaveText('Content');
        expect(el.querySelector('.sky-card-actions button')).toHaveText('Button');
      });
  });

  it('should add the appropriate CSS class for small cards', () => {
    let html = `
      <sky-card [size]="'small'">
      </sky-card>
    `;

    tcb
      .overrideTemplate(TestComponent, html)
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        expect(el.querySelector('section.sky-card')).toHaveCssClass('sky-card-small');
      });
  });

  it('should display a checkbox when the selectable attribute is set to true', () => {
    let html = `
      <sky-card [selectable]="'true'">
      </sky-card>
    `;

    tcb
      .overrideTemplate(TestComponent, html)
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        let wrapperEl = el.querySelector(
          '.sky-card.sky-card-selectable .sky-card-header .sky-card-check .sky-checkbox-wrapper');
        expect(wrapperEl).not.toBeNull();
      });
  });

  it('should allow the user to click the entire card to select the card', () => {
    let html = `
      <sky-card
          [selectable]="showCheckbox"
          [(selected)]="cardSelected"
      >
        <sky-card-title>Title</sky-card-title>
        <sky-card-content>Content</sky-card-content>
      </sky-card>
    `;

    tcb
      .overrideTemplate(TestComponent, html)
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let cmp = fixture.componentInstance as TestComponent,
          el = fixture.nativeElement;

        fixture.detectChanges();

        validateCardSelected(cmp, el, false);

        el.querySelector('.sky-card-content').click();

        fixture.detectChanges();

        validateCardSelected(cmp, el, true);
      });
  });

  it('should not allow clicking the card to select it when it is not selectable', () => {
    let html = `
      <sky-card
          [selectable]="showCheckbox"
          [(selected)]="cardSelected"
      >
        <sky-card-title>Title</sky-card-title>
        <sky-card-content>Content</sky-card-content>
      </sky-card>
    `;

    tcb
      .overrideTemplate(TestComponent, html)
      .createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let cmp = fixture.componentInstance as TestComponent,
          el = fixture.nativeElement;

        cmp.showCheckbox = false;
        fixture.detectChanges();

        validateCardSelected(cmp, el, false);

        el.querySelector('.sky-card-content').click();

        fixture.detectChanges();

        validateCardSelected(cmp, el, false);
      });
  });
});

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyCardComponent],
  template: ''
})
class TestComponent {
  public cardSelected = false;

  public showCheckbox = true;
}
