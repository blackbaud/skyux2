import {
  Component
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {
  SkyColorpickerOutput,
  SkyColorpickerMessage,
  SkyColorpickerMessageType
} from '../../core';

@Component({
  selector: 'sky-colorpicker-demo',
  templateUrl: './colorpicker-demo.component.html'
})
export class SkyColorpickerDemoComponent {
  public color1: any;
  public color2: any;
  public color3: any;
  public selectedColor1 = '#2889e5';

  public selectedOutputFormat1 = 'rgba';
  public selectedOutputFormat3 = 'rgba';
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
  public colorpickerController = new Subject<SkyColorpickerMessage>();
  public showResetButton = false;

  public onSelectedColorChanged(args: SkyColorpickerOutput) {
    console.log('You selected this color:', args);
  }

  public openColorpicker() {
    this.sendMessage(SkyColorpickerMessageType.Open);
  }

  public resetColorpicker() {
    this.sendMessage(SkyColorpickerMessageType.Reset);
  }

  public toggleResetButton() {
    this.sendMessage(SkyColorpickerMessageType.ToggleResetButton);
  }

  private sendMessage(type: SkyColorpickerMessageType) {
    const message: SkyColorpickerMessage = { type };
    this.colorpickerController.next(message);
  }
}
