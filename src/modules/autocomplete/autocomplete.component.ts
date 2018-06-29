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
import 'rxjs/add/operator/takeUntil';

import {
  SkyDropdownMenuChange,
  SkyDropdownMessageType,
  SkyDropdownMessage,
  SkyDropdownMenuComponent
} from '../dropdown';

import {
  SkyAutocompleteInputTextChange,
  SkyAutocompleteSearchFunction,
  SkyAutocompleteSearchFunctionFilter,
  SkyAutocompleteSelectionChange
} from './types';

import { SkyAutocompleteAdapterService } from './autocomplete-adapter.service';
import { SkyAutocompleteInputDirective } from './autocomplete-input.directive';
import { skyAutocompleteDefaultSearchFunction } from './autocomplete-default-search-function';
import { SkyPopoverComponent, SkyPopoverAlignment } from '../popover';

@Component({
  selector: 'sky-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [SkyAutocompleteAdapterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAutocompleteComponent
  implements OnInit, OnDestroy, AfterContentInit {

  @Input()
  public set data(value: any[]) {
    this._data = value;
  }

  public get data(): any[] {
    return this._data || [];
  }

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
  public searchFilters: SkyAutocompleteSearchFunctionFilter[];

  @Input()
  public searchResultsLimit: number;

  @Output()
  public get selectionChange(): EventEmitter<SkyAutocompleteSelectionChange> {
    return this._selectionChange;
  }

  public get messageStream(): Subject<SkyDropdownMessage> {
    return this._messageStream;
  }

  public get searchResults(): any[] {
    return this._searchResults || [];
  }

  public get highlightText(): string {
    return this._highlightText || '';
  }

  public alignment: SkyPopoverAlignment = 'left';

  @ViewChild('defaultSearchResultTemplate')
  private defaultSearchResultTemplate: TemplateRef<any>;

  @ViewChild(SkyPopoverComponent)
  private popover: SkyPopoverComponent;

  @ViewChild('dropdownMenu')
  private dropdownMenu: SkyDropdownMenuComponent;

  @ContentChild(SkyAutocompleteInputDirective)
  private inputDirective: SkyAutocompleteInputDirective;

  private ngUnsubscribe = new Subject();
  private isMouseEnter = false;
  private searchResultsIndex = 0;
  private searchText: string;

  private _data: any[];
  private _descriptorProperty: string;
  private _messageStream = new Subject<SkyDropdownMessage>();
  private _highlightText: string;
  private _propertiesToSearch: string[];
  private _search: SkyAutocompleteSearchFunction;
  private _searchResults: any[];
  private _searchResultTemplate: TemplateRef<any>;
  private _searchTextMinimumCharacters: number;
  private _selectionChange = new EventEmitter<SkyAutocompleteSelectionChange>();

  constructor(
    private adapter: SkyAutocompleteAdapterService,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef
  ) { }

  public ngOnInit(): void {
    const element = this.elementRef.nativeElement;

    Observable
      .fromEvent(element, 'keydown')
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: KeyboardEvent) => {
        this.handleKeyDown(event);
      });

    Observable
      .fromEvent(element, 'mouseenter')
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        this.isMouseEnter = true;
      });

    Observable
      .fromEvent(element, 'mouseleave')
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        this.isMouseEnter = false;
      });

      this.messageStream
      .takeUntil(this.ngUnsubscribe)
      .subscribe((message: SkyDropdownMessage) => {
        this.handleIncomingMessages(message);
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
      .takeUntil(this.ngUnsubscribe)
      .subscribe((change: SkyAutocompleteInputTextChange) => {
        this.searchTextChanged(change.value);
      });

    this.inputDirective.blur
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        if (!this.isMouseEnter) {
          this.searchText = '';
          this.closeDropdown();
        }
      });

    this.adapter.watchDropdownWidth(this.elementRef);
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onMenuChanges(change: SkyDropdownMenuChange): void {
    if (change.activeIndex !== undefined) {
      this.searchResultsIndex = change.activeIndex;
    }

    if (change.selectedItem) {
      this.selectActiveSearchResult();
    }

    if (change.items) {
      this.sendMessage(SkyDropdownMessageType.FocusFirstItem);
    }
  }

  public onPopoverOpened() {
    this.sendMessage(SkyDropdownMessageType.Open);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();

    /* tslint:disable-next-line:switch-default */
    switch (key) {
      case 'arrowup':
      this.sendMessage(SkyDropdownMessageType.FocusPreviousItem);
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
        this.sendMessage(SkyDropdownMessageType.FocusNextItem);
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
        if (!this.hasSearchResults()) {
          this.positionPopover();
        }

        this._searchResults = results;
        this._highlightText = this.searchText;
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

  private handleIncomingMessages(message: SkyDropdownMessage) {
    /* tslint:disable-next-line:switch-default */
    switch (message.type) {
      case SkyDropdownMessageType.Open:
      this.dropdownMenu.focusFirstItem();
      break;

      case SkyDropdownMessageType.FocusNextItem:
      this.dropdownMenu.focusNextItem();
      break;

      case SkyDropdownMessageType.FocusPreviousItem:
      this.dropdownMenu.focusPreviousItem();
      break;

      case SkyDropdownMessageType.Close:
      this.popover.close();
      break;
    }
  }

  private positionPopover() {
    this.popover.positionNextTo(
      this.elementRef,
      'below',
      this.alignment
    );
  }

  private closeDropdown(): void {
    this._searchResults = [];
    this._highlightText = '';
    this.changeDetector.markForCheck();
    this.sendMessage(SkyDropdownMessageType.Close);
  }

  private sendMessage(type: SkyDropdownMessageType): void {
    this.messageStream.next({ type });
  }

  private hasSearchResults(): boolean {
    return (this.searchResults && this.searchResults.length > 0);
  }
}
