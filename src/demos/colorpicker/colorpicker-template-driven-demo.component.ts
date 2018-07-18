import {
  Component
} from '@angular/core';

import {
  SkyColorpickerOutput
} from '../../core';

@Component({
  selector: 'sky-colorpicker-template-driven-demo',
  templateUrl: './colorpicker-template-driven-demo.component.html'
})
export class SkyColorpickerTemplateDrivenDemoComponent {
  public model: any = {
    favoriteColor: '#00f'
  };

  public swatches = [
    '#BD4040',
    '#617FC2',
    '#60AC68',
    '#3486BA',
    '#E87134',
    '#DA9C9C'
  ];

  public onSelectedColorChanged(args: SkyColorpickerOutput): void {
    console.log('Template-driven form color changed:', args);
  }

  public submit(formData: any): void {
    alert('Your favorite color is: \n' + formData.favoriteColor.hex);
  }
}
