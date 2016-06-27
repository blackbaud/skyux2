import { EventEmitter,Injectable } from '@angular/core';

import { SkyTabComponent } from './tab.component';

@Injectable()
export class SkyTabsetService {
  public tabDestroy = new EventEmitter<SkyTabComponent>();

  public destroyTab(tab: SkyTabComponent) {
    this.tabDestroy.emit(tab);
  }
}
