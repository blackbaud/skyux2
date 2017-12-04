import { EventEmitter } from '@angular/core';
import { SkyModalService } from '../../modal/modal.service';
import { SkyModalInstance } from '../../modal/modal-instance';
import { SkyModalConfigurationInterface as IConfig } from '../../modal/modal.interface';

export class SkyModalInstanceMock extends SkyModalInstance {
  public closed = new EventEmitter<any>();
  public close(result?: any) { this.closed.emit({ data: result }); }
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

  public open(component: any, config?: IConfig): SkyModalInstanceMock {
    this.openCalls.push({component: component, config: config });

    return new SkyModalInstanceMock();
  }
}
