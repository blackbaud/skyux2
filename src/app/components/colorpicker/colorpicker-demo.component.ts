import { Component } from '@angular/core';
import { SkyWindowRefService } from '../../../modules/window';

@Component({
  selector: 'sky-colorpicker-demo',
  templateUrl: './colorpicker-demo.component.html'
})
export class SkyColorpickerDemoComponent {



  public arrayColors: any = {};
  public selectedColor: string = 'color';

  public color: string = '#2889e5';

  public constructor(
    private windowObj: SkyWindowRefService) {

    this.arrayColors['color'] = '#2883e9';
    this.arrayColors['color2'] = '#e920e9';
    this.arrayColors['color3'] = 'rgb(255,245,0)';
    this.arrayColors['color4'] = 'rgb(236,64,64)';
    this.arrayColors['color5'] = 'rgba(45,208,45,1)';

  }

  public alert(event: any) {
    this.windowObj.getWindow().alert(event);
  }
}

