import {
  Injectable
} from '@angular/core';

@Injectable()
export class SkyInfiniteScrollDomAdapterService {
  public IsElementScrolledInView(element: any, scrollableParentElement: any = window): boolean {
    if (scrollableParentElement === window) {
      return window.pageYOffset + window.innerHeight > element.offsetTop;
    }
    return scrollableParentElement.scrollTop + scrollableParentElement.clientHeight > element.offsetTop;
  }

  public getScrollableParent(element: any): any {
    if (element.length <= 0 || element === document.body) {
      return window;
    }

    let parentEl = element.parentElement;
    if (parentEl.style['overflow-y'] === 'auto' || parentEl.style['overflow-y'] === 'scroll') {
      return parentEl;
    }

    return this.getScrollableParent(parentEl);
  }
}
