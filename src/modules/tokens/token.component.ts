import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input
} from '@angular/core';

@Component({
  selector: 'sky-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTokenComponent {
  @Input()
  public disabled = false;

  constructor(
    private elementRef: ElementRef
  ) { }

  public focusElement() {
    this.elementRef.nativeElement.focus();
  }
}
