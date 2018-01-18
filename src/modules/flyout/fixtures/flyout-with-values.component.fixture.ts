import { Component } from '@angular/core';

import { FlyoutTestValues } from './flyout-values.fixture';

@Component({
  selector: 'sky-test-cmp-with-values',
  templateUrl: './flyout-with-values.component.fixture.html'
})
export class FlyoutWithValuesTestComponent {
  constructor(public values: FlyoutTestValues) { }
}
