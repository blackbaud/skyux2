import {
  Injectable
} from '@angular/core';
import {
  SkyWindowRefService
} from '../window';

@Injectable()
export class SkyInfiniteScrollDomAdapterService {

  constructor(private windowService: SkyWindowRefService) {}

  public isWindow(element: any) {
    return this.windowService.getWindow() === element;
  }

  public IsElementScrolledInView(element: any, scrollableParentElement: any = this.windowService.getWindow()): boolean {
    if (this.isWindow(scrollableParentElement)) {
      console.log('window');
      return scrollableParentElement.pageYOffset + scrollableParentElement.innerHeight > element.offsetTop;
    }

    let elemOffset = element.offsetTop;
    if (element.offsetTop > scrollableParentElement.scrollHeight) {
      // Child's offset was not relative to the parent's scrollheight, so subtract offset
      elemOffset = elemOffset - scrollableParentElement.offsetTop;
    }
    return scrollableParentElement.scrollTop + scrollableParentElement.clientHeight > elemOffset;
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
