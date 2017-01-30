import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate,
  OnInit,
  OnDestroy,
  AnimationTransitionEvent,
  ElementRef,
  Output,
  Input,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import {
  SkySearchAdapterService
} from './search-adapter.service';

import {
  SkyMediaBreakpoints,
  SkyMediaQueryService
} from '../media-queries';

import {
  SkyResourcesService
} from '../resources';

import { Subscription } from 'rxjs/Subscription';

const INPUT_SHOWN_STATE: string = 'inputShown';
const INPUT_HIDDEN_STATE: string = 'inputHidden';

@Component({
  selector: 'sky-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('inputState', [
      state(INPUT_HIDDEN_STATE,
        style({
          opacity: 0,
          width: 0
      })),
      state(INPUT_SHOWN_STATE,
        style({
          opacity: 1,
          width: '100%'
      })),
      transition('* <=> *', animate('150ms'))
    ])
  ],
  providers: [
    SkySearchAdapterService,
    SkyResourcesService
  ]
})
export class SkySearchComponent implements OnDestroy, OnInit, OnChanges {

  @Output()
  public searchApply = new EventEmitter<string>();

  @Output()
  public searchChange = new EventEmitter<string>();

  @Input()
  public searchText: string;

  @Input()
  public get placeholderText(): string {
    if (this._placeholderText === undefined) {
      return this.resources.getString('search_placeholder');
    }
  }

  public set placeholderText(value: string) {
    this._placeholderText = value;
  }

  public inputAnimate: string = INPUT_SHOWN_STATE;
  public breakpointSubscription: Subscription;
  public searchButtonShown: boolean = false;
  public mobileSearchShown: boolean = false;
  public dismissButtonShown: boolean = false;
  public clearButtonShown: boolean = false;
  public searchInputFocused: boolean = false;

  private _placeholderText: string;

  constructor(
    private mediaQueryService: SkyMediaQueryService,
    private elRef: ElementRef,
    private searchAdapter: SkySearchAdapterService,
    private resources: SkyResourcesService
  ) {}

  public ngOnInit() {

    this.breakpointSubscription = this.mediaQueryService.subscribe(
      (args: SkyMediaBreakpoints) => {
        this.mediaQueryCallback(args);
      }
    );

  }

  public ngOnChanges(changes: SimpleChanges) {
    if (this.searchBindingChanged(changes)) {
      this.clearButtonShown = this.searchText && this.searchText !== '';
      if (this.shouldOpenInput()) {
        this.inputAnimate = INPUT_SHOWN_STATE;
      }
    }
  }

  public inputFocused(isFocused: boolean) {
    this.searchInputFocused = isFocused;
  }

  public clearSearchText() {
    this.searchText = '';
    this.clearButtonShown = false;

    this.searchAdapter.focusInput(this.elRef);

    this.searchApply.emit(this.searchText);
  }

  public enterPress(event: KeyboardEvent, searchText: string) {
    if (event.which === 13) {
      this.applySearchText(searchText);
    }
  }

  public applySearchText(searchText: string) {
    if (searchText !== this.searchText) {
      this.searchText = searchText;
    }
    this.clearButtonShown = searchText && searchText !== '';
    if (searchText && searchText !== '') {
      this.searchAdapter.selectInput(this.elRef);
    }

    this.searchApply.emit(searchText);
  }

  public searchTextChanged(searchText: string) {
    this.searchChange.emit(searchText);
  }

  public toggleSearchInput(showInput: boolean) {
    if (showInput) {
      this.inputAnimate = INPUT_SHOWN_STATE;
    } else {
      this.inputAnimate = INPUT_HIDDEN_STATE;
    }
  }

  public inputAnimationStart(event: AnimationTransitionEvent) {
    this.searchAdapter.startInputAnimation(this.elRef);

    if (event.toState === INPUT_SHOWN_STATE
      && this.mediaQueryService.current === SkyMediaBreakpoints.xs) {
      this.mobileSearchShown = true;
      this.searchButtonShown = false;
    }
  }

  public inputAnimationEnd(event: AnimationTransitionEvent) {

    this.searchAdapter.endInputAnimation(this.elRef);

    this.searchButtonShown = event.toState === INPUT_HIDDEN_STATE
      && this.mediaQueryService.current === SkyMediaBreakpoints.xs;

    if ((event.toState === INPUT_HIDDEN_STATE
      && this.mediaQueryService.current === SkyMediaBreakpoints.xs)
      || this.mediaQueryService.current !== SkyMediaBreakpoints.xs) {
      this.mobileSearchShown = false;
    }

  }

  public ngOnDestroy() {
    this.breakpointSubscription.unsubscribe();
  }

  private searchBindingChanged(changes: SimpleChanges) {
    return changes['searchText'] &&
      changes['searchText'].previousValue !== changes['searchText'].currentValue;
  }

  private shouldOpenInput() {
    return this.searchText !== '' &&
      this.mediaQueryService.current === SkyMediaBreakpoints.xs;
  }

  private mediaQueryCallback(args: SkyMediaBreakpoints) {
    if (args === SkyMediaBreakpoints.xs) {
      this.inputAnimate = INPUT_HIDDEN_STATE;
    } else if (this.inputAnimate !== INPUT_SHOWN_STATE) {
      this.inputAnimate = INPUT_SHOWN_STATE;
    } else {
      this.mobileSearchShown = false;
    }
  }
}
