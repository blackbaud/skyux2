import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'sky-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTokenComponent {
  @Input()
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  public get disabled(): boolean {
    return (this._disabled === true);
  }

  @Input()
  public set dismissible(value: boolean) {
    this._dismissible = value;
  }

  public get dismissible(): boolean {
    return (this._dismissible !== false);
  }

  @Input()
  public set focusable(value: boolean) {
    this._focusable = value;
  }

  public get focusable(): boolean {
    if (this.disabled) {
      return false;
    }

    return (this._focusable !== false);
  }

  @Output()
  public dismiss = new EventEmitter<void>();

  @Output()
  public tokenFocus = new EventEmitter<void>();

  public get ariaRole(): string {
    return (this.focusable) ? 'button' : undefined;
  }

  public get tabIndex(): number | boolean {
    return (this.focusable) ? 0 : false;
  }

  private _disabled: boolean;
  private _dismissible: boolean;
  private _focusable: boolean;

  constructor(
    private elementRef: ElementRef
  ) { }

  public dismissToken() {
    if (this.dismissible) {
      this.dismiss.emit();
    }
  }

  public focusElement() {
    this.elementRef.nativeElement.querySelector('.sky-token').focus();
  }
}
