import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import { SkyMediaQueryListenerArgs, SkyMediaQueryService } from '../media-queries';

@Component({
  selector: 'sky-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('inputState', [
      state('inputHidden',
        style({
          opacity: 0,
          width: '20px'
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

  constructor(
    private mediaQueryService: SkyMediaQueryService
  ) { }

  public ngAfterViewInit() {
    this.mediaQueryService.init(
      SkyMediaQueryService.xs,(args: SkyMediaQueryListenerArgs) => {
        this.mediaQueryCallback(args);
      }

    );
  }

  public inputFocused(isFocused: boolean) {

  }

  public clearSearchText() {

  }

  public applySearchText(searchText: string) {

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

  public ngOnDestroy() {
    this.mediaQueryService.destroy();
  }

  private mediaQueryCallback(args: SkyMediaQueryListenerArgs) {
    if (args.matches) {
      this.inputAnimate = 'inputHidden';
    } else {
      this.inputAnimate = 'inputShown';
    }
  }
}
