import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'sky-numeric-demo',
  templateUrl: './numeric-demo.component.html',
  providers: [CurrencyPipe]
})
export class SkyNumericDemoComponent { }
