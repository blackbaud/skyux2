// spell-checker:ignore Colorpicker, denormalize, Hsla, Hsva
import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';

import { SkyColorpickerWidgetService } from './colorpicker-widget.service';
import { Rgba, Hsla, Hsva } from './colorpicker-classes';
import { SliderPosition, SliderDimension } from './colorpicker-classes';

@Component({
  selector: 'sky-colorpicker-widget',
  templateUrl: './colorpicker-widget.component.html',
  styleUrls: ['./colorpicker-widget.component.scss']
})

export class SkyColorpickerWidgetComponent implements OnInit, AfterViewInit {
  public cpPosition: string;
  public cpPositionOffset: number;
  public cpOutputFormat: string;
  public cpPresetLabel: string;
  public cpPresetColors: Array<string>;
  public cpCancelButton: boolean;
  public cpCancelButtonClass: string;
  public cpCancelButtonText: string;
  public cpOKButton: boolean;
  public cpOKButtonClass: string;
  public cpOKButtonText: string;
  public cpHeight: number;
  public cpWidth: number;
  public cpIgnoredElements: any;
  public cpDialogDisplay: string;
  public cpSaveClickOutside: boolean;
  public cpAlphaChannel: string;

  public rgbaText: Rgba;
  public hslaText: Hsla;
  public selectedColor: string;
  public alphaSliderColor: string;
  public hueSliderColor: string;
  public slider: SliderPosition;
  public show: boolean;
  public hidden: boolean;
  public top: number;
  public left: number;
  public position: string;
  public format: number;
  public hexText: string;
  public arrowTop: number;

  private hsva: Hsva;
  private outputColor: string;
  private sliderDimMax: SliderDimension;
  private directiveInstance: any;
  private initialColor: string;
  private directiveElementRef: ElementRef;

  private listenerMouseDown: any;
  private listenerResize: any;

  private dialogArrowSize: number = 10;
  private dialogArrowOffset: number = 15;

  @ViewChild('hueSlider')
  private hueSlider: any;
  @ViewChild('alphaSlider')
  private alphaSlider: any;
  @ViewChild('dialogPopup')
  private dialogElement: any;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private service: SkyColorpickerWidgetService
  ) { }

  public setDialog(
    instance: any,
    elementRef: ElementRef,
    color: any,
    cpPosition: string,
    cpPositionOffset: string,
    cpPositionRelativeToArrow: boolean,
    cpOutputFormat: string,
    cpPresetLabel: string,
    cpPresetColors: Array<string>,
    cpCancelButton: boolean,
    cpCancelButtonClass: string,
    cpCancelButtonText: string,
    cpOKButton: boolean,
    cpOKButtonClass: string,
    cpOKButtonText: string,
    cpHeight: string, cpWidth: string,
    cpIgnoredElements: any,
    cpDialogDisplay: string,
    cpSaveClickOutside: boolean,
    cpAlphaChannel: string
  ) {
    this.directiveInstance = instance;
    this.initialColor = color;
    this.directiveElementRef = elementRef;
    this.cpPosition = cpPosition;
    this.cpPositionOffset = parseInt(cpPositionOffset, 0);
    if (!cpPositionRelativeToArrow) {
      this.dialogArrowOffset = 0;
    }
    this.cpOutputFormat = cpOutputFormat;
    this.cpPresetLabel = cpPresetLabel;
    this.cpPresetColors = cpPresetColors;
    this.cpCancelButton = cpCancelButton;
    this.cpCancelButtonClass = cpCancelButtonClass;
    this.cpCancelButtonText = cpCancelButtonText;
    this.cpOKButton = cpOKButton;
    this.cpOKButtonClass = cpOKButtonClass;
    this.cpOKButtonText = cpOKButtonText;
    this.cpHeight = parseInt(cpHeight, 0);
    this.cpWidth = parseInt(cpWidth, 0);
    if (!this.cpWidth) {
      this.cpWidth = elementRef.nativeElement.offsetWidth;
    }
    this.cpIgnoredElements = cpIgnoredElements;
    this.cpDialogDisplay = cpDialogDisplay;
    if (this.cpDialogDisplay === 'inline') {
      this.dialogArrowOffset = 0;
      this.dialogArrowSize = 0;
    }
    this.cpSaveClickOutside = cpSaveClickOutside;
    this.cpAlphaChannel = cpAlphaChannel;
  }

  public ngOnInit() {
    let alphaWidth = this.alphaSlider.nativeElement.offsetWidth;
    let hueWidth = this.hueSlider.nativeElement.offsetWidth;
    this.sliderDimMax = new SliderDimension(hueWidth, this.cpWidth, 170, alphaWidth);
    this.slider = new SliderPosition(0, 0, 0, 0);
    if (this.cpOutputFormat === 'rgba') {
      this.format = 1;
    } else if (this.cpOutputFormat === 'hsla') {
      this.format = 2;
    } else {
      this.format = 0;
    }
    this.listenerMouseDown = (event: any) => { this.onMouseDown(event); };
    this.listenerResize = () => { this.onResize(); };
    this.openDialog(this.initialColor, false);
  }

  public ngAfterViewInit() {
    if (this.cpWidth != 230) {
      let alphaWidth = this.alphaSlider.nativeElement.offsetWidth;
      let hueWidth = this.hueSlider.nativeElement.offsetWidth;
      this.sliderDimMax = new SliderDimension(hueWidth, this.cpWidth, 170, alphaWidth);

      this.update(false);

      this.cdr.detectChanges();
    }
  }

  public setInitialColor(color: any) {
    this.initialColor = color;
  }

  public setPresetConfig(cpPresetLabel: string, cpPresetColors: Array<string>) {
    this.cpPresetLabel = cpPresetLabel;
    this.cpPresetColors = cpPresetColors;
  }

  public openDialog(color: any, emit: boolean = true) {
    this.setInitialColor(color);
    this.setColorFromString(color, emit);
    this.openColorPicker();
  }

  public cancelColor() {
    this.setColorFromString(this.initialColor, true);
    if (this.cpDialogDisplay === 'popup') {
      this.directiveInstance.colorChanged(this.initialColor, true);
      this.closeColorPicker();
    }
  }

  public oKColor() {
    if (this.cpDialogDisplay === 'popup') {
      this.closeColorPicker();
    }

    if (this.outputColor) {
      this.directiveInstance.colorSelected(this.outputColor);
    }
  }

  public setColorFromString(value: string, emit: boolean = true) {
    let hsva: Hsva;
    if (this.cpAlphaChannel === 'hex8') {
      hsva = this.service.stringToHsva(value, true);
      if (!hsva && !this.hsva) {
        hsva = this.service.stringToHsva(value, false);
      }
    } else {
      hsva = this.service.stringToHsva(value, false);
    }
    if (hsva) {
      this.hsva = hsva;
      this.update(emit);
    }
  }

  public onMouseDown(event: any) {
    if ((!this.isDescendant(this.el.nativeElement, event.target)
      && event.target !== this.directiveElementRef.nativeElement &&
      this.cpIgnoredElements.filter(
        (item: any) => item === event.target).length === 0)
      && this.cpDialogDisplay === 'popup'
    ) {
      if (!this.cpSaveClickOutside) {
        this.setColorFromString(this.initialColor, false);
        this.directiveInstance.colorChanged(this.initialColor)
      }
      this.closeColorPicker();
    }
  }

  public openColorPicker() {
    if (!this.show) {
      this.show = true;
      this.hidden = true;
      setTimeout(() => {
        this.setDialogPosition();
        this.hidden = false;
        this.cdr.detectChanges();
      }, 0);
      this.directiveInstance.toggle(true);
     // document.addEventListener('mousedown', this.listenerMouseDown);
    //  window.addEventListener('resize', this.listenerResize);
    }
  }

  public closeColorPicker() {
    if (this.show) {
      this.show = false;
      this.directiveInstance.toggle(false);
    //  document.removeEventListener('mousedown', this.listenerMouseDown);
    //  window.removeEventListener('resize', this.listenerResize);
      this.cdr.detectChanges();
    }
  }

  public onResize() {
    if (this.position === 'fixed') {
      this.setDialogPosition();
    }
  }

  public setDialogPosition() {

    let dialogHeight = this.dialogElement.nativeElement.offsetHeight;
    let node = this.directiveElementRef.nativeElement;
    let position = 'static';
    let parentNode: any = undefined;

    while (node !== undefined && node.tagName !== 'HTML') {
      position = window.getComputedStyle(node).getPropertyValue('position');
      if (position !== 'static' && parentNode === undefined) {
        parentNode = node;
      }
      if (position === 'fixed') {
        break;
      }
      node = node.parentNode;
    }
    if (position !== 'fixed') {
      var boxDirective = this.createBox(this.directiveElementRef.nativeElement, true);

      if (parentNode === undefined) { parentNode = node; }

      var boxParent = this.createBox(parentNode, true);
      this.top = boxDirective.top - boxParent.top;
      this.left = boxDirective.left - boxParent.left;
    } else {
      var boxDirective = this.createBox(this.directiveElementRef.nativeElement, false);
      this.top = boxDirective.top;
      this.left = boxDirective.left;
      this.position = 'fixed';
    }
    if (this.cpPosition === 'left') {
      this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
      this.left -= this.cpWidth + this.dialogArrowSize - 2;
    } else if (this.cpPosition === 'top') {
      this.top -= dialogHeight + this.dialogArrowSize;
      this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
      this.arrowTop = dialogHeight - 1;
    } else if (this.cpPosition === 'bottom') {
      this.top += boxDirective.height + this.dialogArrowSize;
      this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
    } else {
      this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
      this.left += boxDirective.width + this.dialogArrowSize - 2;
    }
  }

  public setSaturation(val: { v: number, rg: number }) {
    let hsla = this.service.hsva2hsla(this.hsva);
    hsla.saturation = val.v / val.rg;
    this.hsva = this.service.hsla2hsva(hsla);
    this.update();

    this.directiveInstance.inputChanged({ slider: 'saturation', value: val });
  }

  public setLightness(val: { v: number, rg: number }) {
    let hsla = this.service.hsva2hsla(this.hsva);
    hsla.lightness = val.v / val.rg;
    this.hsva = this.service.hsla2hsva(hsla);
    this.update();

    this.directiveInstance.inputChanged({ slider: 'lightness', value: val });
  }

  public setHue(val: { v: number, rg: number }) {
    this.hsva.hue = val.v / val.rg;
    this.update();

    this.directiveInstance.sliderChanged({ slider: 'hue', value: val });
  }

  public setAlpha(val: { v: number, rg: number }) {
    this.hsva.alpha = val.v / val.rg;
    this.update();

    this.directiveInstance.sliderChanged({ slider: 'alpha', value: val });
  }

  public setR(val: { v: number, rg: number }) {
    let rgba = this.service.hsvaToRgba(this.hsva);
    rgba.red = val.v / val.rg;
    this.hsva = this.service.rgbaToHsva(rgba);
    this.update();

    this.directiveInstance.inputChanged({ slider: 'red', value: val });
  }
  public setG(val: { v: number, rg: number }) {
    let rgba = this.service.hsvaToRgba(this.hsva);
    rgba.green = val.v / val.rg;
    this.hsva = this.service.rgbaToHsva(rgba);
    this.update();

    this.directiveInstance.inputChanged({ slider: 'green', value: val });
  }
  public setB(val: { v: number, rg: number }) {
    let rgba = this.service.hsvaToRgba(this.hsva);
    rgba.blue = val.v / val.rg;
    this.hsva = this.service.rgbaToHsva(rgba);
    this.update();

    this.directiveInstance.inputChanged({ slider: 'blue', value: val });
  }
  public setA(val: { v: number, rg: number }) {
    this.hsva.alpha = val.v / val.rg;
    this.update();

    this.directiveInstance.inputChanged({ slider: 'alpha', value: val });
  }

  public setHex(val: string) {
    this.setColorFromString(val);

    this.directiveInstance.inputChanged({ slider: 'hex', value: val });
  }

  public setSaturationAndBrightness(val: { s: number, v: number, rgX: number, rgY: number }) {
    this.hsva.saturation = val.s / val.rgX;
    this.hsva.value = val.v / val.rgY;
    this.update();
    this.directiveInstance.sliderChanged({ slider: 'saturation-lightness', value: val });
  }

  public formatPolicy(): number {
    this.format = (this.format + 1) % 3;
    if (this.format === 0 && this.hsva.alpha < 1 && this.cpAlphaChannel === 'hex6') {
      this.format++;
    }
    return this.format;
  }

  public update(emit: boolean = true) {
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
      this.hexText = this.service.hexText(rgba, this.cpAlphaChannel === 'hex8');

      this.alphaSliderColor = 'rgb(' + rgba.red + ',' + rgba.green + ',' + rgba.blue + ')';
      this.hueSliderColor = 'rgb(' + hueRgba.red + ',' + hueRgba.green + ',' + hueRgba.blue + ')';

      if (this.format === 0 && this.hsva.alpha < 1 && this.cpAlphaChannel === 'hex6') {
        this.format++;
      }

      let lastOutput = this.outputColor;
      this.outputColor = this.service.outputFormat(
        this.hsva, this.cpOutputFormat, this.cpAlphaChannel === 'hex8'
      );
      this.selectedColor = this.service.outputFormat(this.hsva, 'rgba', false);

      this.slider = new SliderPosition(
        (this.hsva.hue) * this.sliderDimMax.hue - 8,
        this.hsva.saturation * this.sliderDimMax.saturation - 8,
        (1 - this.hsva.value) * this.sliderDimMax.value - 8,
        this.hsva.alpha * this.sliderDimMax.alpha - 8);

      if (emit && lastOutput !== this.outputColor) {
        this.directiveInstance.colorChanged(this.outputColor);
      }
    }
  }

  public isDescendant(parent: any, child: any): boolean {
    let node: any = child.parentNode;
    node = node.parentNode;

        while (node !== undefined) {
          if (node === parent) {
            return true;
          }
          node = node.parentNode;
        }
    return false;
  }

  public createBox(element: any, offset: boolean): any {
    return {
      top: element.getBoundingClientRect().top + (offset ? window.pageYOffset : 0),
      left: element.getBoundingClientRect().left + (offset ? window.pageXOffset : 0),
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }
}
