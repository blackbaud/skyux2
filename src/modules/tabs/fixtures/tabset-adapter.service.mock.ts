import { Injectable } from '@angular/core';

import { SkyTabsetAdapterService } from '../tabset-adapter.service';

@Injectable()
export class MockTabsetAdapterService extends SkyTabsetAdapterService {
  public disableDetectOverflow = false;

  public detectOverflow(): void {
    if (!this.disableDetectOverflow) {
      super.detectOverflow();
    }
  }

  public fakeOverflowChange(overflow: boolean): void {
    this.currentOverflow = overflow;
    this.overflowChange.emit(overflow);
  }
}
