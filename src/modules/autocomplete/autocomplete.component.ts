import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromEvent';

import {
  SkyDropdownMenuChange,
  SkyDropdownMessageType,
  SkyDropdownMessage
} from '../dropdown';

import {
  SkyAutocompleteInputTextChange,
  SkyAutocompleteSelectionChange
} from './types';

import { SkyAutocompleteComponentAPI } from './autocomplete-component-api';
import { SkyAutocompleteAdapterService } from './autocomplete-adapter.service';
import { SkyAutocompleteInputDirective } from './autocomplete-input.directive';

@Component({
  selector: 'sky-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [SkyAutocompleteAdapterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAutocompleteComponent
  extends SkyAutocompleteComponentAPI
  implements OnInit, OnDestroy, AfterContentInit {

  @Output()
  public get selectionChange(): EventEmitter<SkyAutocompleteSelectionChange> {
    return this._selectionChange;
  }

  public get dropdownController(): Subject<SkyDropdownMessage> {
    return this._dropdownController;
  }

  public get searchResults(): any[] {
    return this._searchResults || [];
  }

  public get highlightText(): string {
    return this._highlightText || '';
  }

  @ContentChild(SkyAutocompleteInputDirective)
  private inputDirective: SkyAutocompleteInputDirective;

  private destroy = new Subject<boolean>();
  private isMouseEnter = false;
  private searchResultsIndex = 0;
  private searchText: string;

  private _dropdownController = new Subject<SkyDropdownMessage>();
  private _highlightText: string;
  private _searchResults: any[];
  private _selectionChange = new EventEmitter<SkyAutocompleteSelectionChange>();

  constructor(
    private adapter: SkyAutocompleteAdapterService,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {
    super();
  }

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

    this.adapter.watchDropdownWidth(this.elementRef);
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
        if (!this.hasSearchResults()) {
          this.sendDropdownMessage(SkyDropdownMessageType.Open);
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

  private closeDropdown(): void {
    this._searchResults = [];
    this._highlightText = '';
    this.changeDetector.markForCheck();
    this.sendDropdownMessage(SkyDropdownMessageType.Close);
  }

  private sendDropdownMessage(type: SkyDropdownMessageType): void {
    this.dropdownController.next({ type });
  }

  private hasSearchResults(): boolean {
    return (this.searchResults && this.searchResults.length > 0);
  }
}
