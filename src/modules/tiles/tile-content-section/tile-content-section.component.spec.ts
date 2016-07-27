import {
  inject,
  TestComponentBuilder
} from '@angular/core/testing';

import { TileContentSectionTestComponent } from './fixtures';

describe('Tile content section component', () => {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  it('should render the section content in the expected element', () => {
    let fixture = tcb.createSync(TileContentSectionTestComponent);
    let el = fixture.nativeElement;

    fixture.detectChanges();

    expect(
      el.querySelectorAll('.sky-tile-content-section .test-content').length
    ).toBe(1);
  });
});
