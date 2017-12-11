import {
  AfterContentInit,
  Component,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'sky-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss']
})
export class SkyDropdownItemComponent implements AfterContentInit {
  private buttonElement: HTMLButtonElement;

  public constructor(
    private elementRef: ElementRef
  ) { }

  public ngAfterContentInit() {
    this.buttonElement = this.elementRef.nativeElement.querySelector('button');
    this.buttonElement.tabIndex = -1;
  }

  public focusElement() {
    this.buttonElement.focus();
  }
}
