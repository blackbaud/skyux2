// spell-checker:ignore hsva, hsla, cmyk, denormalize, colorpicker,Injectable
import { Injectable } from '@angular/core';
import { SkyColorpickerCmyk } from './types/colorpicker-cmyk';
import { SkyColorpickerHsla } from './types/colorpicker-hsla';
import { SkyColorpickerHsva } from './types/colorpicker-hsva';
import { SkyColorpickerRgba } from './types/colorpicker-rgba';
import { SkyColorpickerOutput } from './types/colorpicker-output';

@Injectable()
export class SkyColorpickerService {
  private red: number;
  private green: number;
  private blue: number;
  private alpha: number;
  private max: number;
  private min: number;
  private hue: number;
  private saturation: number;
  private lightness: number;
  private value: number;

  constructor() { }

  public hsla2hsva(hsla: SkyColorpickerHsla): SkyColorpickerHsva {
    this.hue = Math.min(hsla.hue, 1);
    this.saturation = Math.min(hsla.saturation, 1);
    this.lightness = Math.min(hsla.lightness, 1);
    this.alpha = Math.min(hsla.alpha, 1);
    let hsva: SkyColorpickerHsva = {
      'hue': this.hue,
      'saturation': this.saturation,
      'value': this.lightness,
      'alpha': this.alpha
    };
    if (this.lightness === 0) {
      this.saturation = 0;
      this.value = 0;
      hsva.saturation = this.saturation;
      hsva.value = this.value;
    } else {
      let v = this.lightness + this.saturation * (1 - Math.abs(2 * this.lightness - 1)) / 2;
      this.saturation = 2 * (v - this.lightness) / v;
      this.value = v;
      hsva.saturation = this.saturation;
      hsva.value = this.value;
    }
    return hsva;
  }

  public hsva2hsla(hsva: SkyColorpickerHsva): SkyColorpickerHsla {
    this.hue = hsva.hue;
    this.saturation = hsva.saturation;
    this.value = hsva.value;
    this.alpha = hsva.alpha;
    let hsla: SkyColorpickerHsla = {
      'hue': this.hue,
      'saturation': this.saturation,
      'lightness': this.value,
      'alpha': this.alpha
    };
    if (this.value === 0) {
      this.lightness = 0;
      this.saturation = 0;
      hsla.lightness = this.lightness;
      hsla.saturation = this.saturation;
    } else {
      this.lightness = this.value * (2 - this.saturation) / 2;
      this.saturation = this.value * this.saturation / (1 - Math.abs(2 * this.lightness - 1));
      hsla.lightness = this.lightness;
      hsla.saturation = this.saturation;
    }
    return hsla;
  }

  public rgbaToHsva(rgba: SkyColorpickerRgba): SkyColorpickerHsva {
    this.red = Math.min(rgba.red, 1);
    this.green = Math.min(rgba.green, 1);
    this.blue = Math.min(rgba.blue, 1);
    this.alpha = Math.min(rgba.alpha, 1);
    this.max = Math.max(this.red, this.green, this.blue);
    this.min = Math.min(this.red, this.green, this.blue);
    this.value = this.max;
    let d = this.max - this.min;
    this.saturation = this.max === 0 ? 0 : d / this.max;

    if (this.max === this.min) {
      this.hue = 0;
    } else {

      let maxValue = {
        [this.red]: (this.green - this.blue) / d + (this.green < this.blue ? 6 : 0),
        [this.green]: (this.blue - this.red) / d + 2,
        [this.blue]: (this.red - this.green) / d + 4
      };
      this.hue = maxValue[this.max];
      this.hue /= 6;
    }
    const hsva: SkyColorpickerHsva = {
      'hue': this.hue,
      'saturation': this.saturation,
      'value': this.value,
      'alpha': this.alpha
    };
    return hsva;
  }

  public rgbaToCmyk(rgba: SkyColorpickerRgba): SkyColorpickerCmyk {
    let cmyk: SkyColorpickerCmyk = { 'cyan': 0, 'magenta': 0, 'yellow': 0, 'key': 0 };
    let k: number;

    k = 1 - Math.max(rgba.red, rgba.green, rgba.blue);
    if (k === 1) {
      cmyk.key = 1;
      return cmyk;

    } cmyk.cyan = (1 - rgba.red - k) / (1 - k);
    cmyk.magenta = (1 - rgba.green - k) / (1 - k);
    cmyk.yellow = (1 - rgba.blue - k) / (1 - k);
    cmyk.key = k;
    return cmyk;
  }

  public hsvaToRgba(hsva: SkyColorpickerHsva): SkyColorpickerRgba {
    this.hue = hsva.hue;
    this.saturation = hsva.saturation;
    this.value = hsva.value;
    this.alpha = hsva.alpha;

    let i = Math.floor(this.hue * 6);
    let f = this.hue * 6 - i;
    let p = this.value * (1 - this.saturation);
    let q = this.value * (1 - f * this.saturation);
    let t = this.value * (1 - (1 - f) * this.saturation);

    switch (i % 6) {
      case 0:
        this.red = this.value; this.green = t; this.blue = p;
        break;
      case 1:
        this.red = q; this.green = this.value; this.blue = p;
        break;
      /*  case 2:
          this.red = p; this.green = this.value; this.blue = t;
          break; */
      case 3:
        this.red = p; this.green = q; this.blue = this.value;
        break;
      case 4:
        this.red = t; this.green = p; this.blue = this.value;
        break;
      case 5:
        this.red = this.value; this.green = p; this.blue = q;
        break;
      default:
    }
    const rgba: SkyColorpickerRgba = {
      'red': this.red,
      'green': this.green,
      'blue': this.blue,
      'alpha': this.alpha
    };
    return rgba;
  }

  public stringToHsva(colorString: string = '', hex8: boolean = false): SkyColorpickerHsva {
    let stringParsers = [
      { // tslint:disable max-line-length
        re: /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
        parse: function (execResult: any) {
          const rgba: SkyColorpickerRgba = {
            'red': parseInt(execResult[2], 0) / 255,
            'green': parseInt(execResult[3], 0) / 255,
            'blue': parseInt(execResult[4], 0) / 255,
            'alpha': isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5])
          };
          return rgba;
        }
      },
      {
        re: /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
        parse: function (execResult: any) {
          const hsla: SkyColorpickerHsla = {
            'hue': parseInt(execResult[2], 0) / 360,
            'saturation': parseInt(execResult[3], 0) / 100,
            'lightness': parseInt(execResult[4], 0) / 100,
            'alpha': isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5])
          };
          return hsla;
          // tslint:enable max-line-length
        }
      }
    ];
    if (hex8) {
      stringParsers.push({
        re: /#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
        parse: function (execResult: any) {
          const rgba: SkyColorpickerRgba = {
            'red': parseInt(execResult[1], 16) / 255,
            'green': parseInt(execResult[2], 16) / 255,
            'blue': parseInt(execResult[3], 16) / 255,
            'alpha': parseInt(execResult[4], 16) / 255
          };
          return rgba;

        }
      });
    } else {
      stringParsers.push({
        re: /#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
        parse: function (execResult: any) {
          const rgba: SkyColorpickerRgba = {
            'red': parseInt(execResult[1], 16) / 255,
            'green': parseInt(execResult[2], 16) / 255,
            'blue': parseInt(execResult[3], 16) / 255,
            'alpha': 1
          };
          return rgba;
        }
      },
        {
          re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
          parse: function (execResult: any) {
            const rgba: SkyColorpickerRgba = {
              'red': parseInt(execResult[1] + execResult[1], 16) / 255,
              'green': parseInt(execResult[2] + execResult[2], 16) / 255,
              'blue': parseInt(execResult[3] + execResult[3], 16) / 255,
              'alpha': 1
            };
            return rgba;
          }
        });
    }

    let hsva: SkyColorpickerHsva = undefined;
    for (let key in stringParsers) {
      if (stringParsers.hasOwnProperty(key)) {
        let parser = stringParsers[key];
        let match = parser.re.exec(colorString);
        let color: any = match && parser.parse(match);
        if (color) {
          if ('red' in color) {
            hsva = this.rgbaToHsva(color);
          } else if ('hue' in color) {
            hsva = this.hsla2hsva(color);
          }

          return hsva;
        }
      }
    }
    return hsva;
  }

  public outputFormat(hsva: SkyColorpickerHsva, outputFormat: string, allowHex8: boolean): string {
    let r: string;
    switch (outputFormat) {
      case 'hsla':
        let hsla = this.denormalizeHSLA(this.hsva2hsla(hsva));
        r = `hsla(${hsla.hue},${hsla.saturation}%,${hsla.lightness}%,${hsla.alpha})`;
        break;
      case 'hex':
        r = this.hexText(this.denormalizeRGBA(this.hsvaToRgba(hsva)), allowHex8);
        break;
      case 'cmyk':
        let cmyk = this.denormalizeCMYK(this.rgbaToCmyk(this.hsvaToRgba(hsva)));
        r = `cmyk(${cmyk.cyan}%,${cmyk.magenta}%,${cmyk.yellow}%,${cmyk.key}%)`;
        break;
      default:
        let rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
        r = `rgba(${rgba.red},${rgba.green},${rgba.blue},${rgba.alpha})`;
    }
    return r;
  }

  public skyColorpickerOut(color: SkyColorpickerHsva) {
    let formatColor: SkyColorpickerOutput;
    let cmykText: string = this.outputFormat(color, 'cmyk', true);
    let hslaText: string = this.outputFormat(color, 'hsla', true);
    let rgbaText: string = this.outputFormat(color, 'rgba', true);
    let rgba: SkyColorpickerRgba = this.hsvaToRgba(color);
    let hsla: SkyColorpickerHsla = this.hsva2hsla(color);
    let cmyk: SkyColorpickerCmyk = this.rgbaToCmyk(rgba);
    let hex: string = this.outputFormat(color, 'hex', false);

    formatColor = {
      'cmykText': cmykText,
      'hslaText': hslaText,
      'rgbaText': rgbaText,
      'hsva': this.denormalizeHSVA(color),
      'rgba': this.denormalizeRGBA(rgba),
      'hsla': this.denormalizeHSLA(hsla),
      'cmyk': this.denormalizeCMYK(cmyk),
      'hex': hex
    };
    return formatColor;
  }

  public hexText(rgba: SkyColorpickerRgba, allowHex8: boolean): string {
    // tslint:disable no-bitwise
    let hexText = '#' + ((1 << 24) |
      (rgba.red << 16) |
      (rgba.green << 8) |
      rgba.blue).toString(16).substr(1);
    if (
      hexText[1] === hexText[2]
      && hexText[3] === hexText[4]
      && hexText[5] === hexText[6]
      && rgba.alpha === 1
      && !allowHex8) {
      hexText = '#' + hexText[1] + hexText[3] + hexText[5];
    }
    if (allowHex8) {
      hexText += ((1 << 8) | Math.round(rgba.alpha * 255)).toString(16).substr(1);
    }
    return hexText;
    // tslint:enable no-bitwise
  }

  public denormalizeRGBA(rgba: SkyColorpickerRgba): SkyColorpickerRgba {
    const denormalizeRgba: SkyColorpickerRgba = {
      'red': Math.round(rgba.red * 255),
      'green': Math.round(rgba.green * 255),
      'blue': Math.round(rgba.blue * 255),
      'alpha': Math.round(rgba.alpha * 100) / 100
    };
    return denormalizeRgba;
  }

  public denormalizeHSLA(hsla: SkyColorpickerHsla): SkyColorpickerHsla {
    const denormalizeHsla: SkyColorpickerHsla = {
      hue: Math.round((hsla.hue) * 360),
      saturation: Math.round(hsla.saturation * 100),
      lightness: Math.round(hsla.lightness * 100),
      alpha: Math.round(hsla.alpha * 100) / 100
    };
    return denormalizeHsla;
  }

  public denormalizeHSVA(hsla: SkyColorpickerHsva): SkyColorpickerHsva {
    const denormalizeHsva: SkyColorpickerHsva = {
      hue: Math.round((hsla.hue) * 360),
      saturation: Math.round(hsla.saturation * 100),
      value: Math.round(hsla.value * 100),
      alpha: Math.round(hsla.alpha * 100) / 100
    };
    return denormalizeHsva;
  }

  public denormalizeCMYK(cmyk: SkyColorpickerCmyk): SkyColorpickerCmyk {
    const denormalizeCmyk: SkyColorpickerCmyk = {
      cyan: Math.round((cmyk.cyan) * 100),
      magenta: Math.round(cmyk.magenta * 100),
      yellow: Math.round(cmyk.yellow * 100),
      key: Math.round(cmyk.key * 100)
    };
    return denormalizeCmyk;
  }
}
