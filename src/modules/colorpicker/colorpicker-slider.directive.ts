// spell-checker:ignore Colorpicker
import {
  Directive,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[skyColorpickerSlider]'
})
export class SkyColorpickerSliderDirective {

  @Output('newValue')
  public newValue = new EventEmitter<any>();
  @Input('skyColorpickerSlider')
  public skyColorpickerSlider: string;
  @Input('rgX')
  public rgX: number;
  @Input('rgY')
  public rgY: number;

  private listenerMove: any;
  private listenerStop: any;

  constructor(private el: ElementRef) {
    this.listenerMove = (event: any) => { this.move(event); };
    this.listenerStop = () => { this.stop(); };
  }

  public setCursor(event: any) {

    let height = this.el.nativeElement.offsetHeight;
    let width = this.el.nativeElement.offsetWidth;
    let x = Math.max(0, Math.min(this.getX(event), width));
    let y = Math.max(0, Math.min(this.getY(event), height));

    if (this.rgX !== undefined && this.rgY !== undefined) {
      this.newValue.emit({ s: x / width, v: (1 - y / height), rgX: this.rgX, rgY: this.rgY });
    } else if (this.rgX === undefined && this.rgY !== undefined) {
      //ready to use vertical sliders
      this.newValue.emit({ v: y / height, rg: this.rgY });
    } else {
      this.newValue.emit({ v: x / width, rg: this.rgX });
    }
  }

  public move(event: any) {
    event.preventDefault();
    this.setCursor(event);
  }
  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  public start(event: MouseEvent) {
    this.setCursor(event);
    document.addEventListener('mousemove', this.listenerMove);
    document.addEventListener('touchmove', this.listenerMove);
    document.addEventListener('mouseup', this.listenerStop);
    document.addEventListener('touchend', this.listenerStop);
  }

  public stop() {
    document.removeEventListener('mousemove', this.listenerMove);
    document.removeEventListener('touchmove', this.listenerMove);
    document.removeEventListener('mouseup', this.listenerStop);
    document.removeEventListener('touchend', this.listenerStop);
  }

  public getX(event: any): number {
    return (
      event.pageX !== undefined ? event.pageX : event.touches[0].pageX)
      - this.el.nativeElement.getBoundingClientRect().left
      - window.pageXOffset;
  }
  public getY(event: any): number {
    return (
      event.pageY !== undefined ? event.pageY : event.touches[0].pageY)
      - this.el.nativeElement.getBoundingClientRect().top
      - window.pageYOffset;
  }
}
