import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  beforeEach,
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';

import { SkyCardComponent } from './card.component';
import { TestUtility } from '../testing/testutility';

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

    return TestUtility.testComponent(
      tcb,
      TestComponent,
      html,
      (fixture: ComponentFixture<TestComponent>) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        expect(el.querySelector('.sky-card-title sky-card-title')).toHaveText('Title');
        expect(el.querySelector('.sky-card-content sky-card-content')).toHaveText('Content');
        expect(el.querySelector('.sky-card-actions button')).toHaveText('Button');
      }
    );
  });

  it('should add the appropriate CSS class for small cards', () => {
    let html = `
      <sky-card [size]="'small'">
      </sky-card>
    `;

    return TestUtility.testComponent(
      tcb,
      TestComponent,
      html,
      (fixture: ComponentFixture<TestComponent>) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        expect(el.querySelector('section.sky-card')).toHaveCssClass('sky-card-small');
      }
    );
  });

  it('should display a checkbox when the selectable attribute is set to true', () => {
    let html = `
      <sky-card [selectable]="'true'">
      </sky-card>
    `;

    return TestUtility.testComponent(
      tcb,
      TestComponent,
      html,
      (fixture: ComponentFixture<TestComponent>) => {
        let el = fixture.nativeElement;

        fixture.detectChanges();

        let wrapperEl = el.querySelector(
          '.sky-card.sky-card-selectable .sky-card-header .sky-card-check .sky-checkbox-wrapper');
        expect(wrapperEl).not.toBeNull();
      }
    );
  });

  it('should allow the user to click the entire card to select the card', (done: Function) => {
    let html = `
      <sky-card
          [selectable]="showCheckbox"
          [selected]="cardSelected"
          (selectedChange)="updateCardSelected($event)"
      >
        <sky-card-title>Title</sky-card-title>
        <sky-card-content>Content</sky-card-content>
      </sky-card>
    `;

    return TestUtility.testComponent(
      tcb,
      TestComponent,
      html,
      (fixture: ComponentFixture<TestComponent>) => {
        let cmp = fixture.componentInstance as TestComponent,
          el = fixture.nativeElement;

        fixture.detectChanges();

        cmp.cardSelectedChange.subscribe((cardSelected: boolean) => {
          expect(cardSelected).toBe(true);
          done();
        });

        el.querySelector('.sky-card-content').click();

        fixture.detectChanges();

        expect(el.querySelector('.sky-card.sky-card-selected')).not.toBeNull();
      }
    );
  });

  it('should not allow clicking the card to select it when it is not selectable', () => {
    let html = `
      <sky-card
          [selectable]="showCheckbox"
          [selected]="cardSelected"
          (selectedChange)="updateCardSelected($event)"
      >
        <sky-card-title>Title</sky-card-title>
        <sky-card-content>Content</sky-card-content>
      </sky-card>
    `;

    return TestUtility.testComponent(
      tcb,
      TestComponent,
      html,
      (fixture: ComponentFixture<TestComponent>) => {
        let cmp = fixture.componentInstance as TestComponent,
          el = fixture.nativeElement;

        cmp.showCheckbox = false;
        fixture.detectChanges();

        el.querySelector('.sky-card-content').click();

        fixture.detectChanges();

        expect(el.querySelector('.sky-card.sky-card-selected')).toBeNull();
      }
    );
  });
});

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyCardComponent],
  template: ''
})
class TestComponent {
  @Output()
  public cardSelectedChange = new EventEmitter();

  public cardSelected = false;

  public showCheckbox = true;

  public updateCardSelected($event: boolean) {
    this.cardSelected = $event;
    this.cardSelectedChange.emit($event);
  }
}
