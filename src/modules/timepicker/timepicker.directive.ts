import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';


@Directive({ selector: '[skyTimePicker]' })
export class SkyTimePickerDirective implements OnInit {
  constructor(private target: ElementRef, private _renderer: Renderer) {
    target.nativeElement.style.backgroundColor = 'yellow';
  }
  public ngOnInit() {
    this._renderer.createElement(this.target.nativeElement.parentNode, 'sky-timepicker');
  }
}
