// spell-checker:ignore Colorpicker, denormalize, Hsla, Hsva,Cmyk
import { Component, Output, EventEmitter, ElementRef, OnInit, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { SkyColorpickerChangeAxis, SkyColorpickerChangeColor } from './colorpicker.interface';
import { SkyColorpickerWidgetService } from './colorpicker-widget.service';
import { Rgba, Hsla, Hsva, Cmyk } from './colorpicker-classes';
import { SliderPosition, SliderDimension } from './colorpicker-classes';
import { SkyColorpickerOutput } from './colorpicker.interface';
@Component({
  selector: 'sky-colorpicker',
  templateUrl: './colorpicker-widget.component.html',
  styleUrls: ['./colorpicker-widget.component.scss']
})

export class SkyColorpickerWidgetComponent implements OnInit {

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
  public selectedColor: string;
  public slider: SliderPosition;


  @ViewChild('colorPicker')
  private colorPickerElement: any;

  private dialogArrowOffset: number = 15;
  private directiveElementRef: ElementRef;
  private directiveInstance: any;
  private hsva: Hsva;
  private initialColor: string;
  private listenerMouseDown: any;
  private outputColor: string;
  private sliderDimMax: SliderDimension;

  @HostListener('click', ['$event'])
  public onClick() {
    // keep the dropdown open.
    event.stopPropagation();
  }

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private service: SkyColorpickerWidgetService
  ) { }

  public setDialog(
    instance: any,
    elementRef: ElementRef,
    color: any,
    outputFormat: string,
    presetColors: Array<string>,
    alphaChannel: string
  ) {
    this.directiveInstance = instance;
    this.initialColor = color;
    this.directiveElementRef = elementRef;

    if (!false) {
      this.dialogArrowOffset = 0;
    }
    this.outputFormat = outputFormat;
    this.presetColors = presetColors;
    this.alphaChannel = alphaChannel;
  }

  public ngOnInit() {
    this.sliderDimMax = new SliderDimension(182, 270, 170, 182);
    this.slider = new SliderPosition(0, 0, 0, 0);
    if (this.outputFormat === 'rgba') {
      this.format = 1;
    } else if (this.outputFormat === 'hsla') {
      this.format = 2;
    } else {
      this.format = 0;
    }
    this.openDialog(this.initialColor);
  }

  public setInitialColor(color: any) {
    this.initialColor = color;
  }

  public setPresetConfig(presetColors: Array<string>) {
    this.presetColors = presetColors;
  }

  public openDialog(color: any) {
    this.setInitialColor(color);
    this.setColorFromString(color);
  }

  public onChangeColor(color: string): Cmyk {
    return this.service.rgbaToCmyk(this.service.hsvaToRgba(this.service.stringToHsva(color)));
  }

  public onChangeColorHex8(color: string): string {
    return this.service.outputFormat(this.service.stringToHsva(color, true), 'rgba', true);
  }

  public cancelColor() {
    this.setColorFromString(this.initialColor);
  }

  public oKColor() {
    this.directiveInstance.colorSelected(this.outputColor);
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
    // 'saturation',
    this.update(change);
  }

  public set lightness(change: SkyColorpickerChangeColor) {
    let hsla = this.service.hsva2hsla(this.hsva);
    hsla.lightness = change.colorValue / change.maxRange;
    this.hsva = this.service.hsla2hsva(hsla);
    // 'lightness',
    this.update(change);
  }

  public set hue(change: SkyColorpickerChangeAxis) {
    this.hsva.hue = change.xCoordinate / change.maxRange;
    this.update(change);
  }

  public set red(change: SkyColorpickerChangeColor) {
    let rgba = this.service.hsvaToRgba(this.hsva);
    rgba.red = change.colorValue / change.maxRange;
    this.hsva = this.service.rgbaToHsva(rgba);
    this.update(change);
  }

  public set green(change: SkyColorpickerChangeColor) {
    let rgba = this.service.hsvaToRgba(this.hsva);
    rgba.green = change.colorValue / change.maxRange;
    this.hsva = this.service.rgbaToHsva(rgba);
    this.update(change);
  }
  public set blue(change: SkyColorpickerChangeColor) {
    let rgba = this.service.hsvaToRgba(this.hsva);
    rgba.blue = change.colorValue / change.maxRange;
    this.hsva = this.service.rgbaToHsva(rgba);
    this.update(change);
  }

  public set alphaAxis(change: SkyColorpickerChangeAxis) {
    this.hsva.alpha = change.xCoordinate / change.maxRange;
    this.update(change);
  }

  public set alphaColor(change: SkyColorpickerChangeColor) {
    this.hsva.alpha = change.colorValue / change.maxRange;
    this.update(change);
  }

  public set hex(change: string) {
    this.setColorFromString(change);
    // this.directiveInstance.inputChanged({ slider: 'hex', value: change });
  }

  public set saturationAndLightness(value: SkyColorpickerChangeAxis) {
    this.hsva.saturation = value.xCoordinate / value.xAxis;
    this.hsva.value = value.yCoordinate / value.yAxis;
    // 'saturation-lightness',
    this.update(value);
  }

  public formatPolicy(): number {
    this.format = (this.format + 1) % 3;
    if (this.format === 0 && this.hsva.alpha < 1 && this.alphaChannel === 'hex6') {
      this.format++;
    }
    return this.format;
  }

  public update(inputValue: Object = {}) {

    let update: SkyColorpickerChangeColor = <SkyColorpickerChangeColor>inputValue;
    //this.directiveInstance.inputChanged({ slider: update.color, value: update.colorValue });

    if (this.sliderDimMax) {
      let hsla = this.service.hsva2hsla(this.hsva);
      let rgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(this.hsva));
      let hueRgba = this.service.denormalizeRGBA(
        this.service.hsvaToRgba(new Hsva(this.hsva.hue, 1, 1, 1))
      );

      this.hslaText = new Hsla(
        Math.round((hsla.hue) * 360),
        Math.round(hsla.saturation * 100),
        Math.round(hsla.lightness * 100),
        Math.round(hsla.alpha * 100) / 100);
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
        this.hsva, this.outputFormat, this.alphaChannel === 'hex8'
      );
      this.selectedColor = this.service.outputFormat(this.hsva, 'rgba', false);

      this.slider = new SliderPosition(
        (this.hsva.hue) * this.sliderDimMax.hue - 8,
        this.hsva.saturation * this.sliderDimMax.saturation - 8,
        (1 - this.hsva.value) * this.sliderDimMax.value - 8,
        this.hsva.alpha * this.sliderDimMax.alpha - 8);

      if (lastOutput !== this.outputColor) {
        this.directiveInstance.colorChanged(this.outputColor);
      }
    }
  }

}
