// spell-checker:ignore Colorpicker, Validators, hsva
import { OnInit, OnChanges, Directive, HostListener, Input, Output } from '@angular/core';
import { EventEmitter, ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { SkyColorpickerWidgetService } from './colorpicker-widget.service';
import { SkyColorpickerWidgetComponent } from './colorpicker-widget.component';
import { SliderPosition, SliderDimension } from './colorpicker-classes';

@Directive({
  selector: '[skyColorpicker]'
})
export class SkyColorpickerWidgetDirective implements OnInit, OnChanges {
  @Input()
  public skyColorpickerInput: SkyColorpickerWidgetComponent;
  @Input('skyColorpicker')
  public skyColorpicker: string = '#456f23';
  @Output('colorPickerSelect')
  public colorPickerSelect = new EventEmitter<string>(true);
  @Output('colorPickerChange')
  public colorPickerChange = new EventEmitter<string>(false);
  /*
    @Output('cpInputChange')
    public cpInputChange = new EventEmitter<any>(true);
  */
  /*
    @Output('cpSliderChange')
    public cpSliderChange = new EventEmitter<any>(true);
  */
  @Input('outputFormat')
  public outputFormat: string = 'hex';
  @Input('presetColors')
  public presetColors: Array<string>;
  @Input('alphaChannel')
  public alphaChannel: string = 'hex6';

  private dialog: any;
  private created: boolean;
  private ignoreChanges: boolean = false;

  constructor(
    private vcRef: ViewContainerRef,
    private el: ElementRef,
    private service: SkyColorpickerWidgetService,
    private cfr: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {
    this.created = false;
  }

  @HostListener('input', ['$event'])
  public changeInput(event: any) {
    let value = event.target.value;
    this.dialog.setColorFromString(value, true);
  }
  public ngOnChanges(changes: any): void {
    this.openDialog();

    if (changes.skyColorpicker) {
      if (this.dialog && !this.ignoreChanges) {
        this.dialog.setColorFromString(changes.skyColorpicker.currentValue, false);

      }
      this.ignoreChanges = false;
    }
    if (changes.presetColors) {
      if (this.dialog) {
        this.dialog.setPresetConfig(this.presetColors);
      }
    }
  }

  public ngOnInit() {
    let hsva = this.service.stringToHsva(this.skyColorpicker);
    if (hsva === undefined) { hsva = this.service.stringToHsva(this.skyColorpicker, true); }
    if (!hsva) {
      hsva = this.service.stringToHsva('#fff');
    }
    let color = this.service.outputFormat(
      hsva,
      this.outputFormat,
      this.alphaChannel === 'hex8'
    );
    if (color !== this.skyColorpicker) {

      this.colorPickerChange.emit(color);
      this.cdr.detectChanges();

    }
  }

  public openDialog() {
    if (!this.created) {
      this.created = true;

      this.skyColorpickerInput.setDialog(
        this,
        this.el,
        this.skyColorpicker,
        this.outputFormat,
        this.presetColors,
        this.alphaChannel
      );

    this.dialog = this.skyColorpickerInput;
    } else if (this.dialog) {
      this.dialog.openDialog(this.skyColorpicker);
    }
  }

  public colorChanged(value: string, ignore: boolean = true) {
    this.ignoreChanges = ignore;
    this.colorPickerChange.emit(value);
  }

  public colorSelected(value: string) {
    this.colorPickerSelect.emit(value);
  }
  /*
    public inputChanged(event: any) {
      this.cpInputChange.emit(event);
    }

    public sliderChanged(event: any) {
      this.cpSliderChange.emit(event);
    }
  */
}
