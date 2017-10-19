import { Component } from '@angular/core';

@Component({
  selector: 'sky-colorpicker-demo',
  templateUrl: './colorpicker-demo.component.html'
})
export class SkyColorpickerDemoComponent {
  public color1 = '#2889e5';
  public color2 = '#000';
  public selectedOutputFormat1: string = 'rgba';
  public presetColors1 = [
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
