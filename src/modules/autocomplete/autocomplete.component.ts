import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subject } from 'rxjs/Subject';

import {
  SkyDropdownMenuChange,
  SkyDropdownMessageType,
  SkyDropdownMessage
} from '../dropdown';

import {
  SkyAutocompleteInputTextChange,
  SkyAutocompleteSearchFunction,
  SkyAutocompleteSearchFunctionFilter,
  SkyAutocompleteSelectionChange
} from './types';

import { SkyAutocompleteInputDirective } from './autocomplete-input.directive';
import { skyAutocompleteDefaultSearchFunction } from './autocomplete-default-search-function';

@Component({
  selector: 'sky-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAutocompleteComponent
  implements OnInit, OnDestroy, AfterContentInit {

  @Input()
  public set descriptorProperty(value: string) {
    this._descriptorProperty = value;
  }

  public get descriptorProperty(): string {
    return this._descriptorProperty || 'name';
  }

  @Input()
  public set propertiesToSearch(value: string[]) {
    this._propertiesToSearch = value;
  }

  public get propertiesToSearch(): string[] {
    return this._propertiesToSearch || ['name'];
  }

  @Input()
  public set search(value: SkyAutocompleteSearchFunction) {
    this._search = value;
  }

  public get search(): SkyAutocompleteSearchFunction {
    return this._search || skyAutocompleteDefaultSearchFunction({
      propertiesToSearch: this.propertiesToSearch,
      searchFilters: this.searchFilters,
      searchResultsLimit: this.searchResultsLimit
    });
  }

  @Input()
  public set searchResultTemplate(value: TemplateRef<any>) {
    this._searchResultTemplate = value;
  }

  public get searchResultTemplate(): TemplateRef<any> {
    return this._searchResultTemplate || this.defaultSearchResultTemplate;
  }

  @Input()
  public set searchTextMinimumCharacters(value: number) {
    this._searchTextMinimumCharacters = value;
  }

  public get searchTextMinimumCharacters(): number {
    return (this._searchTextMinimumCharacters > 0)
      ? this._searchTextMinimumCharacters : 1;
  }

  @Input()
  public data: any[];

  @Input()
  public searchFilters: SkyAutocompleteSearchFunctionFilter[];

  @Input()
  public searchResultsLimit: number;

  @Output()
  public selectionChange = new EventEmitter<SkyAutocompleteSelectionChange>();

  public dropdownController = new Subject<SkyDropdownMessage>();
  public searchResults: any[];
  public highlightText: string;

  @ViewChild('defaultSearchResultTemplate')
  private defaultSearchResultTemplate: TemplateRef<any>;

  @ContentChild(SkyAutocompleteInputDirective)
  private inputDirective: SkyAutocompleteInputDirective;

  private destroy = new Subject<boolean>();
  private isMouseEnter = false;
  private searchResultsIndex = 0;
  private searchText: string;

  private _descriptorProperty: string;
  private _propertiesToSearch: string[];
  private _search: SkyAutocompleteSearchFunction;
  private _searchResultTemplate: TemplateRef<any>;
  private _searchTextMinimumCharacters: number;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef
  ) { }

  public ngOnInit(): void {
    const element = this.elementRef.nativeElement;

    Observable
      .fromEvent(element, 'keydown')
      .takeUntil(this.destroy)
      .subscribe((event: KeyboardEvent) => {
        this.handleKeyDown(event);
      });

    Observable
      .fromEvent(element, 'mouseenter')
      .takeUntil(this.destroy)
      .subscribe(() => {
        this.isMouseEnter = true;
      });

    Observable
      .fromEvent(element, 'mouseleave')
      .takeUntil(this.destroy)
      .subscribe(() => {
        this.isMouseEnter = false;
      });
  }

  public ngAfterContentInit(): void {
    if (!this.inputDirective) {
      throw Error([
        'The SkyAutocompleteComponent requires a ContentChild input or',
        'textarea bound with the SkyAutocomplete directive. For example:',
        '`<input type="text" skyAutocomplete>`.'
      ].join(' '));
    }

    this.inputDirective.displayWith = this.descriptorProperty;

    this.inputDirective.textChanges
      .takeUntil(this.destroy)
      .subscribe((change: SkyAutocompleteInputTextChange) => {
        this.searchTextChanged(change.value);
      });

    this.inputDirective.blur
      .takeUntil(this.destroy)
      .subscribe(() => {
        if (!this.isMouseEnter) {
          this.searchText = '';
          this.closeDropdown();
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  public onMenuChanges(change: SkyDropdownMenuChange): void {
    if (change.activeIndex !== undefined) {
      this.searchResultsIndex = change.activeIndex;
    }

    if (change.selectedItem) {
      this.selectActiveSearchResult();
    }

    if (change.items) {
      this.sendDropdownMessage(SkyDropdownMessageType.FocusFirstItem);
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();

    /* tslint:disable-next-line:switch-default */
    switch (key) {
      case 'arrowup':
      this.sendDropdownMessage(SkyDropdownMessageType.FocusPreviousItem);
      event.preventDefault();
      break;

      case 'arrowdown':
      // Trigger a search if there is search text and the dropdown is not open.
      if (this.searchText && !this.hasSearchResults()) {
        const text = this.searchText;
        this.searchText = '';
        this.searchTextChanged(text);
        event.preventDefault();
      } else {
        this.sendDropdownMessage(SkyDropdownMessageType.FocusNextItem);
        event.preventDefault();
      }
      break;

      case 'tab':
      case 'enter':
      /* istanbul ignore else */
      if (this.hasSearchResults()) {
        this.selectActiveSearchResult();
        event.preventDefault();
        event.stopPropagation();
      }
      break;

      case 'escape':
      this.closeDropdown();
      event.preventDefault();
      break;
    }
  }

  private searchTextChanged(searchText: string): void {
    const isEmpty = (!searchText || searchText.match(/^\s+$/));

    if (isEmpty) {
      this.searchText = '';
      this.closeDropdown();
      return;
    }

    const isLongEnough = (searchText.length >= this.searchTextMinimumCharacters);
    const isDifferent = (searchText !== this.searchText);

    this.searchText = searchText.trim();

    if (isLongEnough && isDifferent) {
      this.performSearch().then((results: any[]) => {
        this.searchResults = results;
        this.highlightText = this.searchText;
        this.sendDropdownMessage(SkyDropdownMessageType.Open);
        this.changeDetector.markForCheck();
      });
    }
  }

  private performSearch(): Promise<any> {
    const result = this.search(this.searchText, this.data);

    if (result instanceof Array) {
      return Promise.resolve(result);
    }

    return result;
  }

  private selectActiveSearchResult(): void {
    const result = this.searchResults[this.searchResultsIndex];

    this.searchText = result[this.descriptorProperty];
    this.inputDirective.value = result;
    this.selectionChange.emit({
      selectedItem: result
    });

    this.closeDropdown();
  }

  private closeDropdown(): void {
    this.searchResults = [];
    this.highlightText = '';
    this.changeDetector.markForCheck();
    this.sendDropdownMessage(SkyDropdownMessageType.Close);
  }

  private sendDropdownMessage(type: SkyDropdownMessageType): void {
    this.dropdownController.next({ type });
  }

  private hasSearchResults(): boolean {
    return (!this.searchResults || this.searchResults.length > 0);
  }
}
