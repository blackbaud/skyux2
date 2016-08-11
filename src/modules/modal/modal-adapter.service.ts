import {
  ApplicationRef,
  ElementRef,
  Injectable,
  Injector,
  ViewContainerRef
} from '@angular/core';

import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SkyModalAdapterService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  public getModalHostViewContainer(injector: Injector): ViewContainerRef {
    let appViewContainerRef: ViewContainerRef =
        injector.get(this.appRef.componentTypes[0]).viewContainerRef;

    if (!appViewContainerRef) {
      throw new Error('The root application must expose a viewContainerRef property');
    }

    return appViewContainerRef;
  }

  public appendToBody(el: ElementRef): void {
    let document = this.injector.get(DOCUMENT);
    document.body.appendChild(el.nativeElement);
  }

  public remove(el: ElementRef): void {
    el.nativeElement.remove();
  }
}
