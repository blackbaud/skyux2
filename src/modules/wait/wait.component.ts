import {
  Component,
  Input,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'sky-wait',
  template: require('./wait.component.html'),
  styles: [require('./wait.component.scss')]
})
export class SkyWaitComponent {

  @Input()
  public set isWaiting(value: boolean) {
    if (value) {
      this.elRef.nativeElement.parentElement.style.position = 'relative';
    } else {
      this.elRef.nativeElement.parentElement.style.position = '';
    }
    this._isWaiting = value;
  }

  public get isWaiting() {
    return this._isWaiting;
  }

  private _isWaiting: boolean;

  constructor(private elRef: ElementRef){}
}
