import {
  ChangeDetectionStrategy,
  Component,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'sky-lookup-token',
  templateUrl: './lookup-token.component.html',
  styleUrls: ['./lookup-token.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyLookupTokenComponent {
  public constructor(
    private elementRef: ElementRef
  ) { }

  public focusElement() {
    this.elementRef.nativeElement.focus();
  }
}
