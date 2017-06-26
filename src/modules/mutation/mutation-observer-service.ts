import { Injectable } from '@angular/core';

@Injectable()
export class MutationObserverService {
  public create(callback: any): MutationObserver | null {
    return typeof MutationObserver === 'undefined' ? undefined : new MutationObserver(callback);
  }
}
