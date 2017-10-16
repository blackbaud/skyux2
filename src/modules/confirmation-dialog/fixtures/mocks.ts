import { SkyModalService } from '../../modal/modal.service';
import { SkyModalInstance } from '../../modal/modal-instance';
import { SkyModalConfigurationInterface as IConfig } from '../../modal/modal.interface';

export class SkyModalInstanceMock {
  public close() {}
  public save() {}
}

export class MockHostService {
  public getModalZIndex(): number {
    return 1;
  }
}

export interface OpenParameters {
  component: any;
  config: any;
}

export class MockModalService extends SkyModalService {
  public openCalls: OpenParameters[] = [];

  public open(component: any, config?: IConfig): SkyModalInstance {
    this.openCalls.push({component: component, config: config });

    return undefined;
  }
}
