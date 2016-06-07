import { Injectable } from '@angular/core';
import { SkyMediaQueryListener } from './media-query-listener';

@Injectable()
export class SkyMediaQueryService {
  public static xs = '(max-width: 767px)';
  public static sm = '(max-width: 991px)';

  public get matches(): boolean {
    return this.mql.matches;
  }

  private mql: MediaQueryList;

  private matchMediaListener: MediaQueryListListener;

  private listener: SkyMediaQueryListener;

  constructor() {
    this.matchMediaListener = (mql: MediaQueryList) => {
      if (this.listener) {
        this.listener({
          matches: mql.matches
        });
      }
    };
  }

  public init(query: string, listener: SkyMediaQueryListener) {
    this.listener = listener;
    this.mql = matchMedia(query);

    this.mql.addListener(this.matchMediaListener);
  }

  public destroy() {
    this.mql.removeListener(this.matchMediaListener);
    this.mql = undefined;
    this.matchMediaListener = undefined;
  }
}
