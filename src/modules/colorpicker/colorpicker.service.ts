// spell-checker:ignore hsva, hsla, cmyk, denormalize, colorpicker,Injectable
import { Injectable } from '@angular/core';
import { Rgba, Hsla, Hsva, Cmyk } from './colorpicker-classes';
import { SkyColorpickerOutput } from './colorpicker.interface';
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

  public hsla2hsva(hsla: Hsla): Hsva {
    this.hue = Math.min(hsla.hue, 1);
    this.saturation = Math.min(hsla.saturation, 1);
    this.lightness = Math.min(hsla.lightness, 1);
    this.alpha = Math.min(hsla.alpha, 1);
    if (this.lightness === 0) {
      return new Hsva(this.hue, 0, 0, this.alpha);
    } else {
      let v = this.lightness + this.saturation * (1 - Math.abs(2 * this.lightness - 1)) / 2;
      return new Hsva(this.hue, 2 * (v - this.lightness) / v, v, this.alpha);
    }
  }

  public hsva2hsla(hsva: Hsva): Hsla {
    this.hue = hsva.hue;
    this.saturation = hsva.saturation;
    this.value = hsva.value;
    this.alpha = hsva.alpha;
    if (this.value === 0) {
      return new Hsla(this.hue, 0, 0, this.alpha);
    } else {
      this.lightness = this.value * (2 - this.saturation) / 2;
      return new Hsla(
        this.hue, this.value * this.saturation / (1 - Math.abs(2 * this.lightness - 1)),
        this.lightness,
        this.alpha
      );
    }
  }

  public rgbaToHsva(rgba: Rgba): Hsva {
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
      switch (this.max) {
        case this.red:
          this.hue = (this.green - this.blue) / d + (this.green < this.blue ? 6 : 0);
          break;
        case this.green:
          this.hue = (this.blue - this.red) / d + 2;
          break;
        case this.blue:
          this.hue = (this.red - this.green) / d + 4;
          break;
        default:
      }
      this.hue /= 6;
    }

    return new Hsva(this.hue, this.saturation, this.value, this.alpha);
  }

  public rgbaToCmyk(rgba: Rgba): Cmyk {
    let cmyk: Cmyk = new Cmyk(0, 0, 0, 0), k: number;
    k = 1 - Math.max(rgba.red, rgba.green, rgba.blue);
    if (k === 1) {
      return new Cmyk(0, 0, 0, 1);
    } cmyk.cyan = (1 - rgba.red - k) / (1 - k);
    cmyk.magenta = (1 - rgba.green - k) / (1 - k);
    cmyk.yellow = (1 - rgba.blue - k) / (1 - k);
    cmyk.key = k;
    return cmyk;
  }

  public hsvaToRgba(hsva: Hsva): Rgba {
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

    return new Rgba(this.red, this.green, this.blue, this.alpha);
  }

  public stringToHsva(colorString: string = '', hex8: boolean = false): Hsva {
    let stringParsers = [
      { // tslint:disable max-line-length
        re: /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
        parse: function (execResult: any) {
          return new Rgba(parseInt(execResult[2], 0) / 255,
            parseInt(execResult[3], 0) / 255,
            parseInt(execResult[4], 0) / 255,
            isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
        }
      },
      {
        re: /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
        parse: function (execResult: any) {
          return new Hsla(parseInt(execResult[2], 0) / 360,
            parseInt(execResult[3], 0) / 100,
            parseInt(execResult[4], 0) / 100,
            isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
          // tslint:enable max-line-length
        }
      }
    ];
    if (hex8) {
      stringParsers.push({
        re: /#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
        parse: function (execResult: any) {
          return new Rgba(parseInt(execResult[1], 16) / 255,
            parseInt(execResult[2], 16) / 255,
            parseInt(execResult[3], 16) / 255,
            parseInt(execResult[4], 16) / 255);
        }
      });
    } else {
      stringParsers.push({
        re: /#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
        parse: function (execResult: any) {
          return new Rgba(parseInt(execResult[1], 16) / 255,
            parseInt(execResult[2], 16) / 255,
            parseInt(execResult[3], 16) / 255,
            1);
        }
      },
        {
          re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
          parse: function (execResult: any) {
            return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255,
              parseInt(execResult[2] + execResult[2], 16) / 255,
              parseInt(execResult[3] + execResult[3], 16) / 255,
              1);
          }
        });
    }

    let hsva: Hsva = undefined;
    for (let key in stringParsers) {
      if (stringParsers.hasOwnProperty(key)) {
        let parser = stringParsers[key];
        let match = parser.re.exec(colorString)
          , color: any = match && parser.parse(match);
        if (color) {
          if (color instanceof Rgba) {
            hsva = this.rgbaToHsva(color);
          } else if (color instanceof Hsla) {
            hsva = this.hsla2hsva(color);
          }
          return hsva;
        }
      }
    }
    return hsva;
  }

  public outputFormat(hsva: Hsva, outputFormat: string, allowHex8: boolean): string {
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
        r = `rgba(${rgba.red},${rgba.green},${rgba.blue},${Math.round(rgba.alpha * 100) / 100})`;
    }
    return r;
  }

  public skyColorpickerOut(color: Hsva) {
    let formatColor: SkyColorpickerOutput;
    let cmykText: string = this.outputFormat(color, 'cmyk', true);
    let hslaText: string = this.outputFormat(color, 'hsla', true);
    let rgbaText: string = this.outputFormat(color, 'rgba', true);
    let rgba: Rgba = this.hsvaToRgba(color);
    let hsla: Hsla = this.hsva2hsla(color);
    let cmyk: Cmyk = this.rgbaToCmyk(rgba);
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

  public hexText(rgba: Rgba, allowHex8: boolean): string {
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

  public denormalizeRGBA(rgba: Rgba): Rgba {
    return new Rgba(
      Math.round(rgba.red * 255),
      Math.round(rgba.green * 255),
      Math.round(rgba.blue * 255),
      rgba.alpha);
  }

  public denormalizeHSLA(hsla: Hsla): Hsla {
    return new Hsla(
      Math.round((hsla.hue) * 360),
      Math.round(hsla.saturation * 100),
      Math.round(hsla.lightness * 100),
      Math.round(hsla.alpha * 100) / 100);
  }

  public denormalizeHSVA(hsla: Hsva): Hsva {
    return new Hsva(
      Math.round((hsla.hue) * 360),
      Math.round(hsla.saturation * 100),
      Math.round(hsla.value * 100),
      Math.round(hsla.alpha * 100) / 100);
  }

  public denormalizeCMYK(cmyk: Cmyk): Cmyk {
    return new Cmyk(
      Math.round((cmyk.cyan) * 100),
      Math.round(cmyk.magenta * 100),
      Math.round(cmyk.yellow * 100),
      Math.round(cmyk.key * 100));
  }
}
