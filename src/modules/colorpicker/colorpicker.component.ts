// spell-checker:ignore Colorpicker, denormalize, Hsla, Hsva,Cmyk
import {
  HostListener,
  ElementRef,
  EventEmitter,
  OnInit,
  ViewChild,
  Output,
  Component
} from '@angular/core';

import { SkyColorpickerChangeColor } from './types/colorpicker-color';
import { SkyColorpickerChangeAxis } from './types/colorpicker-axis';
import { SkyColorpickerHsla } from './types/colorpicker-hsla';
import { SkyColorpickerHsva } from './types/colorpicker-hsva';
import { SkyColorpickerRgba } from './types/colorpicker-rgba';
import { SkyColorpickerOutput } from './types/colorpicker-output';

import { SkyColorpickerService } from './colorpicker.service';

import {
  SliderPosition,
  SliderDimension
} from './colorpicker-classes';

let componentIdIndex = 0;

@Component({
  selector: 'sky-colorpicker',
  templateUrl: './colorpicker.component.html',
  styleUrls: ['./colorpicker.component.scss']
})

export class SkyColorpickerComponent implements OnInit {
  @Output()
  public selectedColorChanged: EventEmitter<SkyColorpickerOutput> =
    new EventEmitter<SkyColorpickerOutput>();

  public idIndex: number;
  public skyColorpickerHexId: string;
  public skyColorpickerRedId: string;
  public skyColorpickerGreenId: string;
  public skyColorpickerBlueId: string;
  public skyColorpickerAlphaId: string;
  public alphaChannel: string;
  public alphaSliderColor: string;
  public arrowTop: number;
  public format: number;
  public hexText: string;
  public hslaText: SkyColorpickerHsla;
  public hueSliderColor: string;
  public outputFormat: string;
  public presetColors: Array<string>;
  public returnFormat: string;
  public rgbaText: SkyColorpickerRgba;
  public selectedColor: SkyColorpickerOutput;
  public slider: SliderPosition;
  public initialColor: string;

  @ViewChild('closeColorPicker')
  private closeColorPicker: ElementRef;

  private outputColor: string;
  private hsva: SkyColorpickerHsva;
  private sliderDimMax: SliderDimension;

  constructor(private service: SkyColorpickerService) {
    componentIdIndex++;

    this.idIndex = componentIdIndex;
    this.skyColorpickerRedId = 'sky-colorpicker-red-' + this.idIndex;
    this.skyColorpickerHexId = 'sky-colorpicker-hex-' + this.idIndex;
    this.skyColorpickerRedId = 'sky-colorpicker-red-' + this.idIndex;
    this.skyColorpickerGreenId = 'sky-colorpicker-green-' + this.idIndex;
    this.skyColorpickerBlueId = 'sky-colorpicker-blue-' + this.idIndex;
    this.skyColorpickerAlphaId = 'sky-colorpicker-alpha-' + this.idIndex;
  }

  public onContainerClick(event: MouseEvent) {
    const element: HTMLButtonElement = <HTMLButtonElement>event.target;
    // Allow the click event to propagate to the dropdown handler for certain buttons.
    // (This will allow the dropdown menu to close.)
    if (
      !element.classList.contains('sky-btn-colorpicker-close') &&
      !element.classList.contains('sky-btn-colorpicker-apply')
    ) {
      event.stopPropagation();
    }
  }

  @HostListener('document:keydown', ['$event'])
  public keyboardInput(event: any) {
    /* Ignores in place for valid code that is only used in IE and Edge */
    /* istanbul ignore next */
    const code: string = event.code || event.key;
    /* istanbul ignore else */
    if (code && code.toLowerCase().indexOf('esc') === 0) {
      this.closeColorPicker.nativeElement.click();
    }
  }

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

  public closePicker() {
    this.setColorFromString(this.initialColor);
  }

  public applyColor() {
    this.selectedColorChanged.emit(this.selectedColor);
    this.initialColor = this.selectedColor.rgbaText;
  }

  public setColorFromString(value: string) {
    let hsva: SkyColorpickerHsva;
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

  public update() {
    let hsla: SkyColorpickerHsla = this.service.hsva2hsla(this.hsva);
    let dHsla: SkyColorpickerHsla = this.service.denormalizeHSLA(hsla);
    let rgba: SkyColorpickerRgba = this.service.hsvaToRgba(this.hsva);
    let dRgba: SkyColorpickerRgba = this.service.denormalizeRGBA(rgba);

    let hsva: SkyColorpickerHsva = {
      'hue': this.hsva.hue,
      'saturation': 1,
      'value': 1,
      'alpha': 1
    };

    let hueRgba = this.service.denormalizeRGBA(
      this.service.hsvaToRgba(hsva)
    );

    this.hslaText = dHsla;
    this.rgbaText = dRgba;
    this.hexText = this.service.hexText(dRgba, this.alphaChannel === 'hex8');

    this.alphaSliderColor = `rgba(${dRgba.red},${dRgba.green},${dRgba.blue},${dRgba.alpha})`;
    this.hueSliderColor = `rgba(${hueRgba.red},${hueRgba.green},${hueRgba.blue},${rgba.alpha})`;

    if (this.format === 0 && this.hsva.alpha < 1 && this.alphaChannel === 'hex6') {
      this.format++;
    }

    let lastOutput = this.outputColor;
    this.outputColor = this.service.outputFormat(
      this.hsva,
      this.outputFormat,
      this.alphaChannel === 'hex8');
    this.selectedColor = this.service.skyColorpickerOut(this.hsva);

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
