import { Injectable } from '@angular/core';

import { SkyResources } from './resources';

@Injectable()
export class SkyResourcesService {
  public getString(name: string): string {
    return SkyResources.getString(name);
  }
}
