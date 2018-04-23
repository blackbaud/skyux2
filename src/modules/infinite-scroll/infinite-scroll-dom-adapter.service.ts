import { Injectable } from '@angular/core';

@Injectable()
export class SkyInfiniteScrollDomAdapterService {
  constructor() {}

  public IsElementScrolledInView(element: any, scrollableParentElement: any = window): boolean {
    if (scrollableParentElement === window) {
      return window.pageYOffset + window.innerHeight > element.offsetTop;
    }
    return scrollableParentElement.scrollTop + scrollableParentElement.clientHeight > element.offsetTop;
  }
}
