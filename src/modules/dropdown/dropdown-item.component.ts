import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'sky-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDropdownItemComponent implements AfterViewInit {
  public isActive = false;
  public isDisabled = false;

  private buttonElement: HTMLButtonElement;

  public constructor(
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef
  ) { }

  public ngAfterViewInit() {
    this.buttonElement = this.elementRef.nativeElement.querySelector('button');

    if (this.buttonElement) {
      this.buttonElement.tabIndex = -1;
      this.isDisabled = this.buttonElement.disabled;
    }
  }

  public focusElement(useNativeFocus: boolean) {
    this.isActive = true;

    if (this.buttonElement && useNativeFocus) {
      this.buttonElement.focus();
    }

    this.changeDetector.detectChanges();
  }

  public isFocusable(): boolean {
    /*tslint:disable no-null-keyword */
    const isDisabled = (
      this.buttonElement &&
      this.buttonElement.getAttribute('disabled') !== null
    );
    /*tslint:enable */
    return !isDisabled;
  }

  public resetState() {
    this.isActive = false;
    this.changeDetector.markForCheck();
  }
}
