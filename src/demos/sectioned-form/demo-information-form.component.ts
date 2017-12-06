import { Component } from '@angular/core';
import { SkySectionedFormService } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'sky-demo-information-form',
  templateUrl: './demo-information-form.component.html'
})
export class SkyDemoInformationFormComponent {
  private _nameRequired: boolean;
  private _name: string = '';
  private _id: string = '5324901';

  public get nameRequired() {
    return this._nameRequired;
  }

  public set nameRequired(value: boolean) {
    this._nameRequired = value;
    this.sectionedFormService.requiredFieldChanged(value);
  }

  public get name() {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;

    if (this._nameRequired) {
      this.sectionedFormService.requiredFieldChanged(!this._name);
    }
  }

  public get id() {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;

    const valid = this.idValid(this._id);
    this.sectionedFormService.invalidFieldChanged(!valid);
  }

  constructor(
    private sectionedFormService: SkySectionedFormService
  ) { }

  private idValid(value: string) {
    if (value) {
      let regExp = new RegExp('^[0-9]+$');
      return regExp.test(value);
    } else {
      return true;
    }
  }
}
