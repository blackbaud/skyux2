import {
  ViewContainerRef,
  ComponentFactoryResolver,
  Injectable,
  ElementRef,
  ComponentRef
} from '@angular/core';

import {
  SkyWaitComponent
} from './wait.component';

class SkyWaitEntry {
  public count: number;
  public componentRef: ComponentRef<SkyWaitComponent>;
}

@Injectable()
export class SkyWaitService {

  private waitElements: Map<ElementRef, SkyWaitEntry>;

  public beginViewWait(viewRef: ViewContainerRef) {

    if(!this.waitElements.has(viewRef.element)) {
      let waitComponent = viewRef.createComponent(this.resolver.resolveComponentFactory(SkyWaitComponent), viewRef.length);

      this.waitElements.set(viewRef.element, {count: 1, componentRef: waitComponent})
    } else {
      let waitElement = this.waitElements.get(viewRef.element);
      waitElement.count++;
    }

  }

  public endViewWait(viewRef: ViewContainerRef) {
    if (this.waitElements.has(viewRef.element)) {
      let waitElement = this.waitElements.get(viewRef.element);
      if (waitElement.count > 0) {
        waitElement.count--;
        if (waitElement.count === 0) {
          waitElement.componentRef.destroy();
          this.waitElements.delete(viewRef.element);
        }
      }
    }
  }

  constructor(private resolver: ComponentFactoryResolver){
    this.waitElements = new Map<ElementRef, SkyWaitEntry>();
  }
}
