import { Component } from '@angular/core';
import { SkySectionedFormService } from './../sectioned-form.service';

@Component({
  selector: 'sky-sectioned-form-fixture-information-1',
  templateUrl: './sectioned-form-fixture-information-1.component.html'
})
export class SkySectionedFormFixtureInformation1Component {

  private _required: boolean;

  public get required(): boolean {
    return this._required;
  }

  public set required(value: boolean) {
    this._required = value;
    this.sectionedFormService.requiredFieldChanged(value);
  }

  private _invalid: boolean;

  public get invalid(): boolean {
    return this._invalid;
  }

  public set invalid(value: boolean) {
    this._invalid = value;
    this.sectionedFormService.invalidFieldChanged(value);
  }

  constructor(private sectionedFormService: SkySectionedFormService) {}
}
