import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {
  SkyAutocompleteChanges,
  SkyAutocompleteSearchFunction,
  SkyAutocompleteInputDirective
} from '../autocomplete';

import {
  SkyResourcesService
} from '../resources';

import {
  SkyLookupTokensComponent
} from './lookup-tokens.component';

import {
  SkyLookupChanges
} from './types';

let nextId = 0;

@Component({
  selector: 'sky-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
  providers: [
    SkyResourcesService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyLookupComponent implements OnInit {
  @Input()
  public disabled = false;

  @Input()
  public placeholderText: string;

  @Input()
  public selectedItems: any[] = [];

  @Input()
  public descriptorProperty = 'name';

  @Input()
  public data: any[]; // passive

  @Input()
  public propertiesToSearch: string[]; // passive

  @Input()
  public searchResultsLimit: number; // passive

  @Input()
  public searchResultTemplate: TemplateRef<any>; // passive

  @Input()
  public search: SkyAutocompleteSearchFunction; // passive

  @Output()
  public selectionChanges = new EventEmitter<SkyLookupChanges>();

  @Output()
  public inputIdChanges = new EventEmitter<SkyLookupChanges>();

  @ViewChild(SkyLookupTokensComponent)
  public tokensComponent: SkyLookupTokensComponent;

  @ViewChild(SkyAutocompleteInputDirective)
  public inputDirective: SkyAutocompleteInputDirective;
  public inputId: string;
  public searchText: string;

  constructor(
    private resources: SkyResourcesService
  ) {
    this.placeholderText = this.resources.getString('search_placeholder');
  }

  public ngOnInit() {
    this.inputId = `sky-lookup-input-${nextId++}`;
    this.inputIdChanges.emit({
      inputId: this.inputId
    });

    // Ensure preset selected items are immutable.
    // Otherwise, deleting one would delete all other references.
    this.selectedItems = this.selectedItems.map(item => {
      const copy = { ...item };
      return copy;
    });

    this.selectionChanges.emit({
      selectedItems: this.selectedItems
    });
  }

  public onSearchResultSelected(changes: SkyAutocompleteChanges) {
    this.addToSelected(changes.selectedResult);
  }

  public clearSearchText() {
    this.inputDirective.value = '';
  }

  // Handles keyboard events that affect usability and interaction.
  // (Keydown is needed to override default browser behavior.)
  public onKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    switch (key) {
      case 'arrowleft':
      case 'backspace':
      if (this.isSearchEmpty()) {
        event.preventDefault();
        this.tokensComponent.focus();
      }
      break;

      case 'escape':
      event.preventDefault();
      this.clearSearchText();
      break;

      default:
      break;
    }
  }

  public onTokenChanges(changes: SkyLookupChanges) {
    this.selectedItems = changes.tokens;
    this.selectionChanges.emit({
      selectedItems: changes.tokens
    });
  }

  private isSearchEmpty() {
    return (!this.inputDirective.value);
  }

  private addToSelected(item: any) {
    const copy = { ...item };

    this.selectedItems.push(copy);

    this.selectionChanges.emit({
      selectedItems: this.selectedItems
    });

    this.clearSearchText();
  }
}
