import {
  CurrencyPipe
} from '@angular/common';

import {
  Component
} from '@angular/core';

@Component({
  selector: 'sky-numeric-demo',
  templateUrl: './numeric-demo.component.html',
  providers: [
    CurrencyPipe
  ]
})
export class SkyNumericDemoComponent { }
