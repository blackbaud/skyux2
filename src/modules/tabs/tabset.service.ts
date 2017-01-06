import { EventEmitter, Injectable } from '@angular/core';

import { SkyTabComponent } from './tab.component';

@Injectable()
export class SkyTabsetService {
  public tabActivate = new EventEmitter<SkyTabComponent>();
  public tabDestroy = new EventEmitter<SkyTabComponent>();

  public activateTab(tab: SkyTabComponent) {
    this.tabActivate.emit(tab);
  }

  public destroyTab(tab: SkyTabComponent) {
    this.tabDestroy.emit(tab);
  }

  public destroy() {
    this.tabActivate.complete();
    this.tabDestroy.complete();
  }
}
