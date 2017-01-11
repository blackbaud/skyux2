import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate,
  AfterViewInit,
  OnDestroy,
  AnimationTransitionEvent,
  ElementRef
} from '@angular/core';

import {
  SkySearchAdapterService
} from './search-adapter.service';

import { SkyMediaBreakpoints, SkyMediaQueryService } from '../media-queries';

import { Subscription } from 'rxjs/Subscription';

const INPUT_SHOWN_STATE: string = 'inputShown';
const INPUT_HIDDEN_STATE: string = 'inputHidden';

@Component({
  selector: 'sky-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('inputState', [
      state('inputHidden',
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
    SkyMediaQueryService,
    SkySearchAdapterService
  ]
})
export class SkySearchComponent implements OnDestroy, AfterViewInit {

  public searchText: string;
  public inputAnimate: string = INPUT_SHOWN_STATE;
  public breakpointSubscription: Subscription;
  public searchButtonShown: boolean = false;
  public mobileSearchShown: boolean = false;
  public dismissButtonShown: boolean = false;
  public clearButtonShown: boolean = false;
  public searchInputFocused: boolean = false

  constructor(
    private mediaQueryService: SkyMediaQueryService,
    private elRef: ElementRef,
    private searchAdapter: SkySearchAdapterService
  ) { }

  public ngAfterViewInit() {
    this.breakpointSubscription = this.mediaQueryService.subscribe(
      (args: SkyMediaBreakpoints) => {
        this.mediaQueryCallback(args);
      }
    );
  }

  public inputFocused(isFocused: boolean) {
    this.searchInputFocused = isFocused;
  }

  public clearSearchText() {
    this.searchText = '';
    this.clearButtonShown = false;
  }

  public applySearchText(searchText: string) {
    this.clearButtonShown = searchText && searchText !== '';
  }

  public searchTextChanged(searchText: string) {

  }

  public toggleSearchInput(showInput: boolean) {
    if(showInput) {
      this.inputAnimate = INPUT_SHOWN_STATE;
    } else {
      this.inputAnimate = INPUT_HIDDEN_STATE;
    }
  }

  public inputAnimationStart(event: AnimationTransitionEvent) {
    this.searchAdapter.startInputAnimation(this.elRef);

    if (event.toState === INPUT_SHOWN_STATE
      && SkyMediaBreakpoints.xs === this.mediaQueryService.current) {
      this.mobileSearchShown = true;
      this.searchButtonShown = false;
    }
  }

  public inputAnimationEnd(event: AnimationTransitionEvent) {

    this.searchAdapter.endInputAnimation(this.elRef);

    this.searchButtonShown = event.toState === INPUT_HIDDEN_STATE
      && this.mediaQueryService.current === SkyMediaBreakpoints.xs;

    if ((event.toState === INPUT_HIDDEN_STATE
    && SkyMediaBreakpoints.xs === this.mediaQueryService.current)
      || this.mediaQueryService.current !== SkyMediaBreakpoints.xs) {
      this.mobileSearchShown = false;
    }

  }

  public ngOnDestroy() {
    this.breakpointSubscription.unsubscribe();
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
