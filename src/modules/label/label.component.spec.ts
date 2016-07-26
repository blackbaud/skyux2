import {
  inject,
  TestComponentBuilder
} from '@angular/core/testing';

import { LabelTestComponent } from './fixtures/label.component.fixture';
import { expect } from '../testing';

describe('Label component', () => {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  it('should add the appropriate CSS class based on the label type', () => {
    let fixture = tcb.createSync(LabelTestComponent);
    let el = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();

    expect(el.querySelector('.sky-label')).toHaveCssClass('sky-label-danger');
  });

  it('should render the label\'s contents in the expected location', () => {
    let fixture = tcb.createSync(LabelTestComponent);
    let el = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();

    expect(el.querySelector('.sky-label')).toHaveText('Test label');
  });
});
