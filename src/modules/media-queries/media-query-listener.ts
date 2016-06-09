import { SkyMediaQueryListenerArgs } from './media-query-listener-args';

export interface SkyMediaQueryListener {
  (args: SkyMediaQueryListenerArgs): void;
}
