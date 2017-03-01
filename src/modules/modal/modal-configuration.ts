import { Injectable } from '@angular/core';
import { SkyModalConfiguationInterface as Iconfig } from './modal.interface';

@Injectable()
export class SkyModalConfiguation {
  // Default Configuration
  public settings: Iconfig = {};

  constructor(public fullPage: boolean) {
    fullPage = this.settings.fullPage;
  }
}
