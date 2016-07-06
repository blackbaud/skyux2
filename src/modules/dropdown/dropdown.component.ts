import {
  Component,
  ElementRef,
  Input
} from '@angular/core';

import { SkyDropdownAdapterService } from './dropdown-adapter.service';

@Component({
  selector: 'sky-dropdown',
  template: require('./dropdown.component.html'),
  styles: [require('./dropdown.component.scss')],
  providers: [SkyDropdownAdapterService]
})
export class SkyDropdownComponent {
  @Input()
  public buttonType = 'select';

  private open = false;

  constructor(
    private elRef: ElementRef,
    private adapterService: SkyDropdownAdapterService
  ) {
    this.adapterService.dropdownClose.subscribe(() => {
      this.open = false;
    });
  }

  public click() {
    if (!this.open) {
      this.adapterService.showDropdown(this.elRef);
      this.open = true;
    }
  }
}
