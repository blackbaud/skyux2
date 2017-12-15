import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input
} from '@angular/core';

@Component({
  selector: 'sky-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDropdownItemComponent implements AfterViewInit {
  public isActive = false;

  private buttonElement: HTMLElement;

  public constructor(
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngAfterViewInit() {
    this.buttonElement = this.elementRef.nativeElement.querySelector('button');

    if (this.buttonElement) {
      this.buttonElement.tabIndex = -1;
    }
  }

  public focusElement(disableNativeFocus = false) {
    this.isActive = true;

    if (this.buttonElement && !disableNativeFocus) {
      this.buttonElement.focus();
    }

    this.changeDetector.detectChanges();
  }

  public resetState() {
    this.isActive = false;
    this.changeDetector.markForCheck();
  }
}
