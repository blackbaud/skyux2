import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromEvent';

import {
  SkyAutocompleteComponentAPI,
  SkyAutocompleteSelectionChange,
  SkyAutocompleteInputDirective
} from '../autocomplete';

import {
  SkyLookupTokensComponent
} from './lookup-tokens.component';

import {
  SkyLookupChanges
} from './types';

@Component({
  selector: 'sky-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyLookupComponent
  extends SkyAutocompleteComponentAPI
  implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  public ariaLabel: string;

  @Input()
  public ariaLabelledBy: string;

  @Input()
  public disabled = false;

  @Input()
  public placeholderText: string;

  @Input()
  public selectedItems: any[] = [];

  @Output()
  public selectionChanges = new EventEmitter<SkyLookupChanges>();
  public inputFocused = false;
  public tokenStream = new Subject<any>();

  @ViewChild(SkyLookupTokensComponent)
  private tokensComponent: SkyLookupTokensComponent;

  @ViewChild(SkyAutocompleteInputDirective)
  private inputDirective: SkyAutocompleteInputDirective;

  @ViewChild('lookupInput')
  private lookupInput: ElementRef;
  private destroy = new Subject<boolean>();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {
    super();
  }

  public ngOnInit() {
    // Ensure preset selected items are immutable.
    // Otherwise, deleting one would delete all references.
    this.selectedItems = this.cloneItems(this.selectedItems);
  }

  public ngAfterViewInit() {
    const inputElement = this.lookupInput.nativeElement;

    Observable
      .fromEvent(inputElement, 'keydown')
      .takeUntil(this.destroy)
      .subscribe((event: KeyboardEvent) => {
        const key = event.key.toLowerCase();

        /* tslint:disable-next-line:switch-default */
        switch (key) {
          case 'arrowleft':
          case 'backspace':
          if (this.isSearchEmpty()) {
            console.log('stop backspace!!!!!!');
            event.preventDefault();
            this.tokensComponent.focusLastToken();
          }
          break;

          case 'escape':
          event.preventDefault();
          this.clearSearchText();
          break;

          // Prevent newlines from being created in the textarea.
          case 'enter':
          event.preventDefault();
          break;
        }
      });

    Observable
      .fromEvent(inputElement, 'focus')
      .takeUntil(this.destroy)
      .subscribe((event: KeyboardEvent) => {
        this.inputFocused = true;
        this.changeDetector.markForCheck();
      });

    Observable
      .fromEvent(document, 'click')
      .takeUntil(this.destroy)
      .subscribe((event: MouseEvent) => {
        const targetIsChild = (this.elementRef.nativeElement.contains(event.target));
        if (!targetIsChild) {
          this.inputFocused = false;
          this.changeDetector.markForCheck();
        }
      });

    Observable
      .fromEvent(document, 'focusin')
      .takeUntil(this.destroy)
      .subscribe((event: KeyboardEvent) => {
        const targetIsChild = (this.elementRef.nativeElement.contains(event.target));
        if (!targetIsChild) {
          this.inputFocused = false;
          this.changeDetector.markForCheck();
        }
      });

    this.tokenStream.next({
      tokens: this.selectedItems
    });

    this.changeDetector.detectChanges();
  }

  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  public onSelectionChange(change: SkyAutocompleteSelectionChange) {
    this.addToSelected(change.selectedItem);
  }

  public onTokenChanges(changes: any) {
    this.selectedItems = this.cloneItems(changes.tokens);
    this.notifySelectionChange(this.selectedItems);
  }

  private addToSelected(item: any) {
    const copy = { ...item };
    this.selectedItems.push(copy);
    this.notifySelectionChange(this.selectedItems);
    this.tokenStream.next({
      tokens: this.selectedItems
    });
    this.clearSearchText();
  }

  private clearSearchText() {
    this.inputDirective.value = undefined;
  }

  private isSearchEmpty() {
    return (!this.lookupInput.nativeElement.value);
  }

  private notifySelectionChange(items: any[]) {
    this.selectionChanges.emit({
      selectedItems: items
    });
  }

  private cloneItems(items: any[]): any[] {
    return items.map(item => {
      return { ...item };
    });
  }
}
