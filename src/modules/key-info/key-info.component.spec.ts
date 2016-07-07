import {
  inject,
  TestComponentBuilder
} from '@angular/core/testing';

import { TestComponent } from './fixtures/test.component';

describe('Key info component', () => {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  it('should support vertical and horizontal layouts', () => {
    let fixture = tcb.createSync(TestComponent);
    let cmp = fixture.componentInstance as TestComponent;
    let el = fixture.nativeElement as Element;
    let horizontalCls = 'sky-key-info-horizontal';

    cmp.layout = 'horizontal';

    fixture.detectChanges();

    let keyInfoEl = el.querySelector('.sky-key-info');

    expect(keyInfoEl.classList.contains(horizontalCls)).toBe(true);

    // Should treat any other value as vertical
    // (enforced by the default .sky-key-info class).
    cmp.layout = undefined;

    fixture.detectChanges();

    expect(keyInfoEl.classList.contains(horizontalCls)).toBe(false);
  });

  it('should have the appropriate content in expected areas', () => {
    let fixture = tcb.createSync(TestComponent);
    let el = fixture.nativeElement as Element;

    fixture.detectChanges();

    expect(el.querySelectorAll('.sky-key-info-value sky-key-info-value').length).toBe(1);
    expect(el.querySelectorAll('.sky-key-info-label sky-key-info-label').length).toBe(1);
  });
});
