import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sky-colorpicker-fixture',
  templateUrl: './colorpicker-component.fixture.html'
})
export class ColorpickerTestComponent {
  @Output()
  public selectedColorChanged = new EventEmitter<any>();

  public selectedHexType: string = 'hex6';
  public colorModel: string = '#2889e5';
  public selectedOutputFormat: string = 'rgba';
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

  public onSelectedColorChanged(newColor: any) {
    this.selectedColorChanged.emit(newColor);
  }
}
