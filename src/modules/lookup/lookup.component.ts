import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  Input
} from '@angular/core';

@Component({
  selector: 'sky-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss']
})
export class SkyLookupComponent implements AfterViewInit {
  @Input()
  public data: any[];

  @ViewChild('dropdown')
  public dropdownElement: ElementRef;

  public results: any[];

  private dropdownButton: any;

  public ngAfterViewInit() {
    this.dropdownButton = this.dropdownElement.nativeElement
      .querySelector('.sky-dropdown-button');
  }

  public executeSearch(event: KeyboardEvent) {
    const input = event.target as any;
    const results: any[] = [];
    const query = input.value.toLowerCase();

    if (query !== '') {
      this.data.forEach((item: any) => {
        if (item.name.toLowerCase().match(query)) {
          results.push(item);
        }
      });
    }

    this.results = results;
    this.toggleDropdown();
  }

  private toggleDropdown() {
    const isDropdownOpen = this.dropdownElement.nativeElement
      .querySelector('.sky-dropdown-open');

    if (isDropdownOpen) {
      if (!this.results) {
        this.dropdownButton.click();
      }
    } else {
      if (this.results) {
        this.dropdownButton.click();
      }
    }
  }
}
