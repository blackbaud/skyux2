import { Component } from '@angular/core';

@Component({
  selector: 'sky-colorpicker-fixture',
  templateUrl: './colorpicker-component.fixture.html'
})
export class ColorpickerTestComponent {
  public selectedHexType = 'hex6';
  public selectedColor = '#2889e5';
  public selectedOutputFormat = 'rgba';
  public presetColors: string[] = [
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
}
