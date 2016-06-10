import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import {
  beforeEach,
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';

import { TestComponent } from './fixtures/test.component';

describe('Key info component', () => {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  it('should support vertical and horizontal layouts', () => {
    return tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let cmp = fixture.componentInstance as TestComponent;
        let el = fixture.nativeElement as Element;

        cmp.layout = 'horizontal';

        fixture.detectChanges();

        expect(el.querySelector('.sky-key-info')).toHaveCssClass('sky-key-info-horizontal');

        cmp.layout = 'vertical';

        fixture.detectChanges();

        expect(el.querySelector('.sky-key-info')).not.toHaveCssClass('sky-key-info-horizontal');
      });
  });
});
