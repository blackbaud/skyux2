import {
  Component
} from '@angular/core';

import {
  Subject
} from 'rxjs/Subject';

import {
  SkyColorpickerMessage,
  SkyColorpickerMessageType
} from '../../core';

@Component({
  selector: 'sky-colorpicker-demo',
  templateUrl: './colorpicker-demo.component.html'
})
export class SkyColorpickerDemoComponent {
  public colorpickerController = new Subject<SkyColorpickerMessage>();
  public model: any;
  public showResetButton = false;

  public openColorpicker(): void {
    this.sendMessage(SkyColorpickerMessageType.Open);
  }

  public resetColorpicker(): void {
    this.sendMessage(SkyColorpickerMessageType.Reset);
  }

  public toggleResetButton(): void {
    this.sendMessage(SkyColorpickerMessageType.ToggleResetButton);
  }

  private sendMessage(type: SkyColorpickerMessageType): void {
    const message: SkyColorpickerMessage = { type };
    this.colorpickerController.next(message);
  }
}
