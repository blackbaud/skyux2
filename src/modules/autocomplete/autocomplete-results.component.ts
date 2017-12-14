import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer,
  SimpleChanges,
  TemplateRef
} from '@angular/core';

// import {
//   Subject
// } from 'rxjs/Subject';

import {
  SkyDropdownAdapterService
} from '../dropdown/dropdown-adapter.service';

import {
  SkyWindowRefService
} from '../window';

import {
  SkyAutocompleteChanges
} from './types';

@Component({
  selector: 'sky-autocomplete-results',
  templateUrl: './autocomplete-results.component.html',
  styleUrls: ['./autocomplete-results.component.scss'],
  providers: [
    SkyDropdownAdapterService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAutocompleteResultsComponent implements OnInit, OnChanges, OnDestroy {
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

  // public dropdownController = new Subject<any>();

  private isOpen = false;

  public constructor(
    private elementRef: ElementRef,
    private dropdownAdapter: SkyDropdownAdapterService,
    private renderer: Renderer,
    private windowObj: SkyWindowRefService
  ) { }

  public ngOnInit() {
    this.dropdownAdapter.dropdownClose.subscribe(() => {
      this.isOpen = false;
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.results && !changes.results.firstChange) {
      this.openDropdown();

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
    this.dropdownAdapter.hideDropdown(
      this.elementRef,
      this.renderer,
      this.windowObj.getWindow()
    );
  }

  private openDropdown() {
    if (!this.isOpen) {
      this.dropdownAdapter.showDropdown(
        this.elementRef,
        this.renderer,
        this.windowObj.getWindow(),
        'left'
      );

      this.isOpen = true;
    }
  }
}
