import {
  ComponentFactoryResolver,
  ApplicationRef,
  Injectable
} from '@angular/core';

import {
  SkyWaitPageComponent
} from './wait-page.component';

@Injectable()
export class SkyWaitService {

  private static waitComponent: SkyWaitPageComponent;
  private static pageWaitCount: number = 0;

  constructor(private resolver: ComponentFactoryResolver, private appRef: ApplicationRef){}

  public beginPageWait() {
    if (!SkyWaitService.waitComponent) {
      let factory = this.resolver.resolveComponentFactory(SkyWaitPageComponent);

      document.body.appendChild(document.createElement('sky-wait-page'));

      let cmpRef = this.appRef.bootstrap(factory);

      SkyWaitService.waitComponent = cmpRef.instance;
    }

    SkyWaitService.waitComponent.isWaiting = true;
    SkyWaitService.pageWaitCount++;

  }

  public endPageWait() {
    if(SkyWaitService.pageWaitCount > 0) {
      SkyWaitService.pageWaitCount--;
    }

    if(SkyWaitService.pageWaitCount < 1) {
      SkyWaitService.waitComponent.isWaiting = false;
    }

  }

  public dispose() {
    if (SkyWaitService.waitComponent) {
      SkyWaitService.waitComponent = undefined;
      document.body.removeChild(document.querySelector('sky-wait-page'));
    }
  }

}
