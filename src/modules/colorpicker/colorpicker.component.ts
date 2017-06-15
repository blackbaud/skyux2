// spell-checker:ignore Colorpicker, Cmyk, Hsva, Hsla
import { Component, HostListener } from '@angular/core';
import { SkyColorpickerWidgetService } from './colorpicker-widget.service';

import { Rgba, Cmyk } from './colorpicker-classes';
@Component({
  selector: 'sky-colorpicker',
  templateUrl: 'colorpicker.component.html',
  styleUrls: ['./colorpicker.component.scss']
})

export class SkyColorpickerComponent {

  public rgbaText: string = '';
  public color: string = '#2889e9';
  public color2: string = 'hsla(300,82%,52%)';
  public color3: string = '#fff500';
  public color4: string = 'rgb(236,64,64)';
  public color5: string = 'rgba(45,208,45,1)';
  public color6: string = '#1973c0';
  public color7: string = '#f200bd';
  public color8: string = '#a8ff00';
  public color9: string = '#278ce2';
  public color10: string = '#0a6211';
  public color11: string = '#f2ff00';
  public color12: string = '#f200bd';
  public color13: string = '#1973c0';
  public color14: string = '#a8ff00';
  public color15: string = '#a51ad6a3';

  public arrayColors: any = {};
  public selectedColor: string = 'color';

  public toggle: boolean;
  public toggle2: boolean;
  private lastColor = '#ff0';
  private cmyk: Cmyk = new Cmyk(0, 0, 0, 0);

  constructor(private service: SkyColorpickerWidgetService) {
    this.arrayColors['color'] = '#2883e9';
    this.arrayColors['color2'] = '#e920e9';
    this.arrayColors['color3'] = 'rgb(255,245,0)';
    this.arrayColors['color4'] = 'rgb(236,64,64)';
    this.arrayColors['color5'] = 'rgba(45,208,45,1)';
  }
  @HostListener('click', ['$event'])
  public onClick() {
    // keep the dropdown open.
    event.stopPropagation();
  }
  public onChangeColor(color: string): Cmyk {
    return this.rgbaToCmyk(this.service.hsvaToRgba(this.service.stringToHsva(color)));
  }

  public rgbaToCmyk(rgba: Rgba): Cmyk {
    let cmyk: Cmyk = new Cmyk(0, 0, 0, 0), k: number;
    k = 1 - Math.max(rgba.red, rgba.green, rgba.blue);
    if (k == 1) {
      return new Cmyk(0, 0, 0, 1);
    } cmyk.cyan = (1 - rgba.red - k) / (1 - k);
    cmyk.magenta = (1 - rgba.green - k) / (1 - k);
    cmyk.yellow = (1 - rgba.blue - k) / (1 - k);
    cmyk.key = k;
    return cmyk;
  }

  public onChangeColorHex8(color: string): string {
    return this.service.outputFormat(this.service.stringToHsva(color, true), 'rgba', true);
  }
}
