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
        let horizontalCls = 'sky-key-info-horizontal';

        cmp.layout = 'horizontal';

        fixture.detectChanges();

        let keyInfoEl = el.querySelector('.sky-key-info');

        expect(keyInfoEl).toHaveCssClass(horizontalCls);

        // Should treat any other value as vertical
        // (enforced by the default .sky-key-info class).
        cmp.layout = undefined;

        fixture.detectChanges();

        expect(keyInfoEl).not.toHaveCssClass(horizontalCls);
      });
  });

  it('should have the appropriate content in expected areas', () => {
    return tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let el = fixture.nativeElement as Element;

        fixture.detectChanges();

        expect(el.querySelectorAll('.sky-key-info-value sky-key-info-value').length).toBe(1);
        expect(el.querySelectorAll('.sky-key-info-label sky-key-info-label').length).toBe(1);
      });
  });
});
