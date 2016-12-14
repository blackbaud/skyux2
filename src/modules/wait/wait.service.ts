import {
  ComponentFactoryResolver,
  ApplicationRef,
  Injectable
} from '@angular/core';

import {
  SkyWaitPageComponent
} from './wait-page.component';

import {
  SkyWaitPageAdapterService
} from './wait-page-adapter.service';

@Injectable()
export class SkyWaitService {

  private static waitComponent: SkyWaitPageComponent;
  private static pageWaitBlockingCount: number = 0;
  private static pageWaitNonBlockingCount: number = 0;

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private waitAdapter: SkyWaitPageAdapterService
    ) {}

  public beginPageWait(isBlocking: boolean) {
    if (!SkyWaitService.waitComponent) {
      let factory = this.resolver.resolveComponentFactory(SkyWaitPageComponent);

      this.waitAdapter.addPageWaitEl();

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
    let countType = isBlocking ? 'pageWaitBlockingCount' : 'pageWaitNonBlockingCount';
    let isWaitingType = isBlocking ? 'hasBlockingWait' : 'hasNonBlockingWait';

    if (SkyWaitService[countType] > 0) {
      SkyWaitService[countType]--;
    }

    if (SkyWaitService[countType] < 1) {
      SkyWaitService.waitComponent[isWaitingType] = false;
    }

  }

  public dispose() {
    if (SkyWaitService.waitComponent) {
      SkyWaitService.waitComponent = undefined;
      this.waitAdapter.removePageWaitEl();
    }
  }

}
