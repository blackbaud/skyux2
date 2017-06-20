import { Component } from '@angular/core';
import { SkyWindowRefService } from '../../../modules/window';

@Component({
  selector: 'sky-colorpicker-demo',
  templateUrl: './colorpicker-demo.component.html'
})
export class SkyColorpickerDemoComponent {

  public selectedColor1: string = '#2889e5';
  public selectedOutputFormat1: string = 'rgba';
  public constructor() {

  }

}

