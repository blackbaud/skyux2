// spell-checker:ignore Colorpicker, Validators, hsva
import { OnInit, OnChanges, Directive, HostListener, Input, Output, } from '@angular/core';
import { EventEmitter, ElementRef, ViewContainerRef, ReflectiveInjector } from '@angular/core';
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
  public skyColorpicker: string;
  @Output('colorPickerSelect')
  public colorPickerSelect = new EventEmitter<string>(true);
  @Output('colorPickerChange')
  public colorPickerChange = new EventEmitter<string>(false);
  @Input('cpToggle')
  public cpToggle: boolean;
  @Output('cpInputChange')
  public cpInputChange = new EventEmitter<any>(true);
  @Output('cpSliderChange')
  public cpSliderChange = new EventEmitter<any>(true);
  @Output('cpToggleChange')
  public cpToggleChange = new EventEmitter<boolean>(true);
  @Input('cpPosition')
  public cpPosition: string = 'right';
  @Input('cpPositionOffset')
  public cpPositionOffset: string = '0%';
  @Input('cpPositionRelativeToArrow')
  public cpPositionRelativeToArrow: boolean = false;
  @Input('cpOutputFormat')
  public cpOutputFormat: string = 'hex';
  @Input('cpPresetLabel')
  public cpPresetLabel: string = 'Preset colors';
  @Input('cpPresetColors')
  public cpPresetColors: Array<string>;
  @Input('cpCancelButton')
  public cpCancelButton: boolean = false;
  @Input('cpCancelButtonClass')
  public cpCancelButtonClass: string = 'cp-cancel-button-class';
  @Input('cpCancelButtonText')
  public cpCancelButtonText: string = 'Cancel';
  @Input('cpOKButton')
  public cpOKButton: boolean = false;
  @Input('cpOKButtonClass')
  public cpOKButtonClass: string = 'cp-ok-button-class';
  @Input('cpOKButtonText')
  public cpOKButtonText: string = 'OK';
  @Input('cpFallbackColor')
  public cpFallbackColor: string = '#fff';
  @Input('cpHeight')
  public cpHeight: string = 'auto';
  @Input('cpWidth')
  public cpWidth: string = '270px';
  @Input('cpIgnoredElements')
  public cpIgnoredElements: any = [];
  @Input('cpDialogDisplay')
  public cpDialogDisplay: string = 'fixed';
  @Input('cpSaveClickOutside')
  public cpSaveClickOutside: boolean = true;
  @Input('cpAlphaChannel')
  public cpAlphaChannel: string = 'hex6';

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

  public ngOnChanges(changes: any): void {
    if (changes.cpToggle) {
      if (changes.cpToggle.currentValue) { this.openDialog(); }
      if (!changes.cpToggle.currentValue && this.dialog) { this.dialog.closeColorPicker(); }
    }
    if (changes.skyColorpicker) {
      if (this.dialog && !this.ignoreChanges) {
        if (this.cpDialogDisplay === 'inline') {
          this.dialog.setInitialColor(changes.skyColorpicker.currentValue);
        }
        this.dialog.setColorFromString(changes.skyColorpicker.currentValue, false);

      }
      this.ignoreChanges = false;
    }
    if (changes.cpPresetLabel || changes.cpPresetColors) {
      if (this.dialog) {
        this.dialog.setPresetConfig(this.cpPresetLabel, this.cpPresetColors);
      }
    }
  }

  public ngOnInit() {
    let hsva = this.service.stringToHsva(this.skyColorpicker);
    if (hsva === undefined) { hsva = this.service.stringToHsva(this.skyColorpicker, true); }
    if (hsva == undefined) {
      hsva = this.service.stringToHsva(this.cpFallbackColor);
    }
    let color = this.service.outputFormat(
      hsva,
      this.cpOutputFormat,
      this.cpAlphaChannel === 'hex8'
    );
    if (color !== this.skyColorpicker) {
      // setTimeout(() => {
      this.colorPickerChange.emit(color);
      this.cdr.detectChanges();
      // }, 0);
    }
  }
  @HostListener('click')
  public onClick() {
    if (this.cpIgnoredElements.filter((item: any) => item === this.el.nativeElement).length === 0) {
      this.openDialog();
    }
  }

  public openDialog() {
    if (!this.created) {
      this.created = true;
      const compFactory = this.cfr.resolveComponentFactory(SkyColorpickerWidgetComponent);
      const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
      const cmpRef = this.vcRef.createComponent(compFactory, 0, injector, []);
      cmpRef.instance.setDialog(
        this,
        this.el,
        this.skyColorpicker,
        this.cpPosition,
        this.cpPositionOffset,
        this.cpPositionRelativeToArrow,
        this.cpOutputFormat,
        this.cpPresetLabel,
        this.cpPresetColors,
        this.cpCancelButton,
        this.cpCancelButtonClass,
        this.cpCancelButtonText,
        this.cpOKButton,
        this.cpOKButtonClass,
        this.cpOKButtonText,
        this.cpHeight,
        this.cpWidth,
        this.cpIgnoredElements,
        this.cpDialogDisplay,
        this.cpSaveClickOutside,
        this.cpAlphaChannel
      );
      this.dialog = cmpRef.instance;
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

  public inputChanged(event: any) {
    this.cpInputChange.emit(event);
  }

  public sliderChanged(event: any) {
    this.cpSliderChange.emit(event);
  }

  @HostListener('input', ['$event'])
  public changeInput(event: any) {
    let value = event.target.value;
    this.dialog.setColorFromString(value, true);
  }

  public toggle(value: boolean) {
    this.cpToggleChange.emit(value);
  }
}
