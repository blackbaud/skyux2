import {
  ChangeDetectionStrategy,
  // ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';

import {
  Subject
} from 'rxjs/Subject';

import {
  SkyDropdownMessageEventArgs
} from '../dropdown';

import {
  SkyAutocompleteChanges
} from './types';

@Component({
  selector: 'sky-autocomplete-results',
  templateUrl: './autocomplete-results.component.html',
  styleUrls: ['./autocomplete-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAutocompleteResultsComponent implements OnChanges, OnDestroy {
  @Input()
  public highlightText: string;

  @Input()
  public results: any[] = [];

  @Input()
  public resultTemplate: TemplateRef<any>;

  @Output()
  public resultClick = new EventEmitter<SkyAutocompleteChanges>();

  @Input()
  public displayProperty = 'name';

  @Input()
  public activeIndex = 0;

  public dropdownMessages = new Subject<SkyDropdownMessageEventArgs>();

  public constructor(
    // private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.results && !changes.results.firstChange) {
      this.openDropdown();
      // this.changeDetector.markForCheck();

      if (!changes.results.currentValue.length) {
        this.closeDropdown();
      }
    }
  }

  public ngOnDestroy() {
    this.closeDropdown();
  }

  public selectResult(result: any, index: number) {
    this.resultClick.emit({
      selectedResult: result,
      selectedResultIndex: index
    });
    this.closeDropdown();
  }

  public hasResults(): boolean {
    return (this.results && this.results.length > 0);
  }

  public closeDropdown() {
    this.dropdownMessages.next({
      message: 'close'
    });
  }

  private openDropdown() {
    this.dropdownMessages.next({
      message: 'open'
    });
  }
}
