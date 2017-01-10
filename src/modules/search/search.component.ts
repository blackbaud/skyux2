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

import { SkyMediaBreakpoints, SkyMediaQueryService } from '../media-queries';

import { Subscription } from 'rxjs/Subscription';

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
      state('inputShown',
        style({
          opacity: 1,
          width: '100%'
      })),
      transition('* <=> *', animate('150ms'))
    ])
  ],
  providers: [
    SkyMediaQueryService
  ]
})
export class SkySearchComponent implements OnDestroy, AfterViewInit {

  public searchText: string;
  public inputAnimate: string = 'inputShown';
  public breakpointSubscription: Subscription;
  public searchButtonShown: boolean = false;
  public mobileSearchShown: boolean = false;
  public dismissButtonShown: boolean = false;
  public clearButtonShown: boolean = false;

  constructor(
    private mediaQueryService: SkyMediaQueryService,
    private elRef: ElementRef
  ) { }

  public ngAfterViewInit() {
    this.breakpointSubscription = this.mediaQueryService.subscribe(
      (args: SkyMediaBreakpoints) => {
        this.mediaQueryCallback(args);
      }

    );
  }

  public inputFocused(isFocused: boolean) {
    if (isFocused) {
      this.elRef.nativeElement.querySelector('.sky-search-input-container')
        .classList.add('sky-search-input-focused');
    } else {
      this.elRef.nativeElement.querySelector('.sky-search-input-container')
        .classList.remove('sky-search-input-focused');
    }

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
      this.inputAnimate = 'inputShown';
    } else {
      this.inputAnimate = 'inputHidden';
    }
  }

  public inputAnimationStart(event: AnimationTransitionEvent) {
    let buttonWidth = this.elRef.nativeElement.querySelector('.sky-search-btn-open').clientWidth;
      let offsetWidth = this.elRef.nativeElement.querySelector('.sky-search-container').offsetLeft;
      let minWidth = buttonWidth + offsetWidth;

      this.elRef.nativeElement.querySelector('.sky-search-input-container').style.minWidth
        = minWidth.toString() + 'px';

    if (event.toState === 'inputShown'
      && SkyMediaBreakpoints.xs === this.mediaQueryService.current) {
      this.mobileSearchShown = true;
      this.searchButtonShown = false;
    }
  }

  public inputAnimationEnd(event: AnimationTransitionEvent) {

    this.elRef.nativeElement.querySelector('.sky-search-input-container').style.minWidth
        = '';

    this.searchButtonShown = event.toState === 'inputHidden'
      && this.mediaQueryService.current === SkyMediaBreakpoints.xs;

    if ((event.toState === 'inputHidden'
    && SkyMediaBreakpoints.xs === this.mediaQueryService.current)
      || this.mediaQueryService.current !== SkyMediaBreakpoints.xs) {
      this.mobileSearchShown = false;
    }

    console.log('event toState: ', event.toState);
    console.log('breakpoints: ', this.mediaQueryService.current);
  }

  public ngOnDestroy() {
    this.breakpointSubscription.unsubscribe();
  }

  private mediaQueryCallback(args: SkyMediaBreakpoints) {
    console.log('whaddup', args);
    if (args === SkyMediaBreakpoints.xs) {
      this.inputAnimate = 'inputHidden';
    } else if (this.inputAnimate !== 'inputShown') {
      this.inputAnimate = 'inputShown';
    } else {
      this.mobileSearchShown = false;
    }
  }
}
