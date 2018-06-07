// #region imports
import {
  Injectable,
  ElementRef,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  Subject
} from 'rxjs/Subject';

import {
  SkyWindowRefService
} from '../window';
// #endregion

@Injectable()
export class SkyInfiniteScrollDomAdapterService implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  private observer: MutationObserver;

  private _parentChanges = new EventEmitter<void>();
  private _scrollTo = new EventEmitter<void>();

  constructor(
    private windowRef: SkyWindowRefService
  ) { }

  public ngOnDestroy(): void {
    this._parentChanges.complete();
    this._scrollTo.complete();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * This event is triggered when child nodes are added to the infinite
   * scroll parent container. e.g., A repeating list of elements was added.
   * @param elementRef The infinite scroll element reference.
   */
  public parentChanges(elementRef: ElementRef): Observable<void> {
    this.createObserver(elementRef.nativeElement);
    return this._parentChanges;
  }

  /**
   * This event is triggered when the provided element reference
   * is visible (or scrolled to) within its scrollable parent container.
   * @param elementRef The infinite scroll element reference.
   */
  public scrollTo(elementRef: ElementRef): Observable<void> {
    const parent = this.findScrollableParent(elementRef.nativeElement);

    Observable
      .fromEvent(parent, 'scroll')
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        const isInView = this.isElementScrolledInView(
          elementRef.nativeElement,
          parent
        );

        if (isInView) {
          this._scrollTo.emit();
        }
      });

    return this._scrollTo;
  }

  private createObserver(element: any): void {
    this.observer = new MutationObserver((mutations: MutationRecord[]) => {
      const hasUpdates = !!mutations.find((mutation) => {
        return (
          !element.contains(mutation.target) &&
          mutation.addedNodes.length > 0
        );
      });

      if (hasUpdates) {
        this._parentChanges.emit();
      }
    });

    const windowObj = this.windowRef.getWindow();
    const parent = this.findScrollableParent(element);
    const observedParent = (parent === windowObj) ? windowObj.document.body : parent;

    this.observer.observe(
      observedParent,
      {
        childList: true,
        subtree: true
      }
    );
  }

  private findScrollableParent(element: any): any {
    const regex = /(auto|scroll)/;
    const windowObj = this.windowRef.getWindow();
    const bodyObj = windowObj.document.body;

    let style = windowObj.getComputedStyle(element);
    let parent = element;

    do {
      parent = parent.parentNode;
      style = windowObj.getComputedStyle(parent);
    } while (
      !regex.test(style.overflow) &&
      !regex.test(style.overflowY) &&
      parent !== bodyObj
    );

    if (parent === bodyObj) {
      return windowObj;
    }

    return parent;
  }

  private isElementScrolledInView(
    element: any,
    parentElement: any
  ): boolean {
    const windowObj = this.windowRef.getWindow();

    if (parentElement === windowObj) {
      return (parentElement.pageYOffset + parentElement.innerHeight > element.offsetTop);
    }

    const elementRect = element.getBoundingClientRect();
    const parentRect = parentElement.getBoundingClientRect();

    return (elementRect.top < parentRect.top + parentRect.height);
  }
}
