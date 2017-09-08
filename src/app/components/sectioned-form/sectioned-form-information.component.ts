import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sky-sectioned-form-information',
  templateUrl: './sectioned-form-information.component.html'
})
export class SkySectionedFormInformationComponent {
  public name: string = '';
  public id: string = '5324901';

  @Output()
  public requiredChange = new EventEmitter<boolean>();

  private _nameRequired: boolean = false;

  public get nameRequired() {
    return this._nameRequired;
  }

  public set nameRequired(value: boolean) {
    this._nameRequired = value;
    this.requiredChange.emit(this._nameRequired);
  }
}
