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
  private static pageWaitBlockingCount: number = 0;
  private static pageWaitNonBlockingCount: number = 0;

  constructor(private resolver: ComponentFactoryResolver, private appRef: ApplicationRef){}

  public beginPageWait(isBlocking: boolean) {
    if (!SkyWaitService.waitComponent) {
      let factory = this.resolver.resolveComponentFactory(SkyWaitPageComponent);

      document.body.appendChild(document.createElement('sky-wait-page'));

      let cmpRef = this.appRef.bootstrap(factory);

      SkyWaitService.waitComponent = cmpRef.instance;
    }
    if (isBlocking) {
      SkyWaitService.waitComponent.hasBlockingWait = true;
      SkyWaitService.pageWaitBlockingCount++;
    } else {
      SkyWaitService.waitComponent.hasNonBlockingWait = true;
      SkyWaitService.pageWaitNonBlockingCount++;
    }
  }

  public endPageWait(isBlocking: boolean) {
    if (isBlocking) {
      if(SkyWaitService.pageWaitBlockingCount > 0) {
        SkyWaitService.pageWaitBlockingCount--;
      }

      if(SkyWaitService.pageWaitBlockingCount < 1) {
        SkyWaitService.waitComponent.hasBlockingWait = false;
      }
    } else {
      if(SkyWaitService.pageWaitNonBlockingCount > 0) {
        SkyWaitService.pageWaitNonBlockingCount--;
      }

      if(SkyWaitService.pageWaitNonBlockingCount < 1) {
        SkyWaitService.waitComponent.hasNonBlockingWait = false;
      }
    }


  }

  public dispose() {
    if (SkyWaitService.waitComponent) {
      SkyWaitService.waitComponent = undefined;
      document.body.removeChild(document.querySelector('sky-wait-page'));
    }
  }

}
