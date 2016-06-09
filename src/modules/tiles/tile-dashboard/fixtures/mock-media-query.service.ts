import { Injectable } from '@angular/core';
import {
  SkyMediaQueryListener,
  SkyMediaQueryListenerArgs,
  SkyMediaQueryService
} from '../../../media-queries';

@Injectable()
export class MockSkyMediaQueryService extends SkyMediaQueryService {
  public static xs = '(max-width: 767px)';
  public static sm = '(max-width: 991px)';

  public set matches(value: boolean) {
    this._matches = value;
  }

  public get matches(): boolean {
    return this._matches;
  }

  private _matches = false;

  private mockListener: SkyMediaQueryListener;

  constructor() {
    super();
  }

  public init(query: string, listener: SkyMediaQueryListener) {
    this.mockListener = listener;
  }

  public fire(args: SkyMediaQueryListenerArgs) {
    this._matches = args.matches;
    this.mockListener(args);
  }

  public destroy() {}
}
