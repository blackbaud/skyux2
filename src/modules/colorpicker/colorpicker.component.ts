// spell-checker:ignore Colorpicker, denormalize, Hsla, Hsva,Cmyk
import {
  ChangeDetectorRef,
  HostListener,
  ElementRef,
  EventEmitter,
  OnInit,
  // ViewChild,
  Output,
  Component
} from '@angular/core';

import {
  SkyColorpickerChangeAxis,
  SkyColorpickerChangeColor
} from './colorpicker.interface';

import { SkyColorpickerService } from './colorpicker.service';

import {
  Rgba,
  Hsla,
  Hsva,
  Cmyk,
  SliderPosition,
  SliderDimension,
  SkyColorpickerOutput
} from './colorpicker-classes';

@Component({
  selector: 'sky-colorpicker',
  templateUrl: './colorpicker.component.html',
  styleUrls: ['./colorpicker.component.scss']
})

export class SkyColorpickerComponent implements OnInit {

  @Output()
  public selectedColorChanged: EventEmitter<SkyColorpickerOutput> =
  new EventEmitter<SkyColorpickerOutput>();

  public alphaChannel: string;
  public alphaSliderColor: string;
  public arrowTop: number;
  public format: number;
  public hexText: string;
  public hslaText: Hsla;
  public hueSliderColor: string;
  public outputFormat: string;
  public presetColors: Array<string>;
  public returnFormat: string;
  public rgbaText: Rgba;
  public selectedColor: SkyColorpickerOutput;
  public slider: SliderPosition;
  public initialColor: string;
  private outputColor: string;
  private hsva: Hsva;
  private sliderDimMax: SliderDimension;

  @HostListener('click', ['$event'])
  public onClick() {
    let element: HTMLButtonElement = <HTMLButtonElement>event.target;
    // keep the drop down open.
    if (
      element.classList.contains('sky-btn-colorpicker-close') ||
      element.classList.contains('sky-btn-colorpicker-apply')
    ) {
      element.click();
    } else {
      event.stopPropagation();
    }
  }

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private service: SkyColorpickerService
  ) { }

  public setDialog(
    instance: any,
    elementRef: ElementRef,
    color: any,
    outputFormat: string,
    presetColors: Array<string>,
    alphaChannel: string
  ) {
    this.initialColor = color;
    this.outputFormat = outputFormat;
    this.presetColors = presetColors;
    this.alphaChannel = alphaChannel;

    if (this.outputFormat === 'rgba') {
      this.format = 1;
    } else if (this.outputFormat === 'hsla') {
      this.format = 2;
    } else {
      this.format = 0;
    }
  }

  public ngOnInit() {
    this.sliderDimMax = new SliderDimension(182, 270, 170, 182);
    this.slider = new SliderPosition(0, 0, 0, 0);

  }

  public setInitialColor(color: any) {
    this.initialColor = color;
  }

  public setPresetConfig(presetColors: Array<string>) {
    this.presetColors = presetColors;
  }

  public openDialog(color: any) {
    this.setColorFromString(color);
  }

  public onChangeColor(color: string): Cmyk {
    return this.service.rgbaToCmyk(this.service.hsvaToRgba(this.service.stringToHsva(color)));
  }

  public onChangeColorHex8(color: string): string {
    let stringToHsva: Hsva = this.service.stringToHsva(color, true);
    let hsvaToRgba: string = this.service.outputFormat(stringToHsva, 'rgba', true);
    return hsvaToRgba;
  }

  public closeColorpicker() {
    this.setColorFromString(this.initialColor);
  }

  public applyColor() {
    this.selectedColorChanged.emit(this.selectedColor);
  }

  public setColorFromString(value: string) {
    let hsva: Hsva;
    if (this.alphaChannel === 'hex8') {
      hsva = this.service.stringToHsva(value, true);
      if (!hsva && !this.hsva) {
        hsva = this.service.stringToHsva(value, false);
      }
    } else {
      hsva = this.service.stringToHsva(value, false);
    }
    if (hsva) {
      this.hsva = hsva;
      this.update();
    }
  }

  public set saturation(change: SkyColorpickerChangeColor) {
    let hsla = this.service.hsva2hsla(this.hsva);
    hsla.saturation = change.colorValue / change.maxRange;
    this.hsva = this.service.hsla2hsva(hsla);
    this.update();
  }

  public set lightness(change: SkyColorpickerChangeColor) {
    let hsla = this.service.hsva2hsla(this.hsva);
    hsla.lightness = change.colorValue / change.maxRange;
    this.hsva = this.service.hsla2hsva(hsla);
    this.update();
  }

  public set hue(change: SkyColorpickerChangeAxis) {
    this.hsva.hue = change.xCoordinate / change.maxRange;
    this.update();
  }

  public set red(change: SkyColorpickerChangeColor) {
    let rgba = this.service.hsvaToRgba(this.hsva);
    rgba.red = change.colorValue / change.maxRange;
    this.hsva = this.service.rgbaToHsva(rgba);
    this.update();
  }

  public set green(change: SkyColorpickerChangeColor) {
    let rgba = this.service.hsvaToRgba(this.hsva);
    rgba.green = change.colorValue / change.maxRange;
    this.hsva = this.service.rgbaToHsva(rgba);
    this.update();
  }
  public set blue(change: SkyColorpickerChangeColor) {
    let rgba = this.service.hsvaToRgba(this.hsva);
    rgba.blue = change.colorValue / change.maxRange;
    this.hsva = this.service.rgbaToHsva(rgba);
    this.update();
  }

  public set alphaAxis(change: SkyColorpickerChangeAxis) {
    this.hsva.alpha = change.xCoordinate / change.maxRange;
    this.update();
  }

  public set alphaColor(change: SkyColorpickerChangeColor) {
    this.hsva.alpha = change.colorValue / change.maxRange;
    this.update();
  }

  public set hex(change: SkyColorpickerChangeColor) {
    this.setColorFromString(change.color);
  }

  public set saturationAndLightness(value: SkyColorpickerChangeAxis) {
    this.hsva.saturation = value.xCoordinate / value.xAxis;
    this.hsva.value = value.yCoordinate / value.yAxis;
    this.update();
  }

  public formatPolicy(): number {
    this.format = (this.format + 1) % 3;
    if (this.format === 0 && this.hsva.alpha < 1 && this.alphaChannel === 'hex6') {
      this.format++;
    }
    return this.format;
  }

  public update() {
    if (this.sliderDimMax) {
      let hsla = this.service.hsva2hsla(this.hsva);
      let rgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(this.hsva));
      let hueRgba = this.service.denormalizeRGBA(
        this.service.hsvaToRgba(new Hsva(this.hsva.hue, 1, 1, 1))
      );

      this.hslaText = this.service.denormalizeHSLA(hsla);
      this.rgbaText = new Rgba(
        rgba.red,
        rgba.green,
        rgba.blue,
        Math.round(rgba.alpha * 100) / 100);
      this.hexText = this.service.hexText(rgba, this.alphaChannel === 'hex8');

      this.alphaSliderColor = 'rgb(' + rgba.red + ',' + rgba.green + ',' + rgba.blue + ')';
      this.hueSliderColor = 'rgb(' + hueRgba.red + ',' + hueRgba.green + ',' + hueRgba.blue + ')';

      if (this.format === 0 && this.hsva.alpha < 1 && this.alphaChannel === 'hex6') {
        this.format++;
      }

      let lastOutput = this.outputColor;
      this.outputColor = this.service.outputFormat(
        this.hsva,
        this.outputFormat,
        this.alphaChannel === 'hex8');
      this.selectedColor = this.service.skyColorpickerOutput(this.hsva);

      this.slider = new SliderPosition(
        (this.hsva.hue) * this.sliderDimMax.hue - 8,
        this.hsva.saturation * this.sliderDimMax.saturation - 8,
        (1 - this.hsva.value) * this.sliderDimMax.value - 8,
        this.hsva.alpha * this.sliderDimMax.alpha - 8);

      if (lastOutput !== this.outputColor) {
        this.selectedColorChanged.emit(this.selectedColor);
      }
    }
  }
}
