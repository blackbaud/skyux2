import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class SkySectionedFormService {

  @Output()
  public requiredChange = new EventEmitter<boolean>();

  @Output()
  public invalidChange = new EventEmitter<boolean>();

  public requiredFieldChanged(required: boolean) {
    this.requiredChange.emit(required);
  }

  public invalidFieldChanged(invalid: boolean) {
    this.invalidChange.emit(invalid);
  }
}
