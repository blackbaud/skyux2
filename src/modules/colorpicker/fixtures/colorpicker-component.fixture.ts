// spell-checker:ignore Colorpicker
import { Component } from '@angular/core';

@Component({
  selector: 'sky-colorpicker-fixture',
  templateUrl: './colorpicker-component.fixture.html'
})
export class ColorpickerTestComponent {
  public selectedHexType: string = 'hex6';
  public selectedColor: string = '#2889e5';
  public selectedOutputFormat: string = 'rgba';
  public presetColors = [
    '#333333',
    '#888888',
    '#EFEFEF',
    '#FFF',
    '#BD4040',
    '#617FC2',
    '#60AC68',
    '#3486BA',
    '#E87134',
    '#DA9C9C',
    '#A1B1A7',
    '#68AFEF'
  ];

  public constructor() { }
}
