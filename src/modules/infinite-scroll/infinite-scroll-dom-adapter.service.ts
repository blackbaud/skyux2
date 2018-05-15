import {
  Injectable
} from '@angular/core';
import {
  SkyWindowRefService
} from '../window';

@Injectable()
export class SkyInfiniteScrollDomAdapterService {

  constructor(private windowService: SkyWindowRefService) {}

  public IsElementScrolledInView(element: any, scrollableParentElement: any = this.windowService.getWindow()): boolean {
    if (scrollableParentElement === this.windowService.getWindow()) {
      return scrollableParentElement.pageYOffset + scrollableParentElement.innerHeight > element.offsetTop;
    }
    return scrollableParentElement.scrollTop + scrollableParentElement.clientHeight > element.offsetTop;
  }

  public getScrollableParent(element: any): any {
    if (element.length <= 0 || element === document.body) {
      return this.windowService.getWindow();
    }

    let parentEl = element.parentElement;
    if (parentEl.style['overflow-y'] === 'auto' || parentEl.style['overflow-y'] === 'scroll') {
      return parentEl;
    }

    return this.getScrollableParent(parentEl);
  }
}
