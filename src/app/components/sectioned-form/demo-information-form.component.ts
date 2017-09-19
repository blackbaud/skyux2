import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sky-demo-information-form',
  templateUrl: './demo-information-form.component.html'
})
export class SkyDemoInformationFormComponent {
  public name: string = '';
  public id: string = '5324901';

  @Output()
  public requiredChange = new EventEmitter<boolean>();

  @Output()
  public invalidChange = new EventEmitter<boolean>();

  private _nameRequired: boolean = false;

  public get nameRequired() {
    return this._nameRequired;
  }

  public set nameRequired(value: boolean) {
    this._nameRequired = value;
    this.emitRequiredChange();
  }

  public nameChange(newName: string) {
    this.name = newName;
    this.emitRequiredChange();
  }

  public idChange(newId: string) {
    this.id = newId;

    if (this.idValid(this.id)) {
      this.invalidChange.emit(false);
    } else {
      this.invalidChange.emit(true);
    }
  }

  private emitRequiredChange() {
    if (this.nameRequired && !this.name) {
      this.requiredChange.emit(true);
    } else {
      this.requiredChange.emit(false);
    }
  }

  private idValid(value: string) {
    if (value) {
      let regExp = new RegExp('^[0-9]+$');
      return regExp.test(value);
    } else {
      return true;
    }
  }
}
