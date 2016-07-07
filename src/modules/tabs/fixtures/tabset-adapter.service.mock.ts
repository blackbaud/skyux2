import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class MockTabsetAdapterService {
  public currentOverflow = false;

  public overflowChange = new EventEmitter<boolean>();

  public init() {

  }

  public detectOverflow() {

  }

  public fakeOverflowChange(overflow: boolean) {
    this.currentOverflow = overflow;
    this.overflowChange.emit(overflow);
  }
}
