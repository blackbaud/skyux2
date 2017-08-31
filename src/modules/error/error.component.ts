import { Component, Input, OnInit } from '@angular/core';
import { SkyResourcesService } from '../resources/resources.service';

@Component({
  selector: 'sky-error',
  styleUrls: ['./error.component.scss'],
  templateUrl: './error.component.html'
})
export class SkyErrorComponent implements OnInit {

  @Input()
  public set errorType(value: string) {
    this._errorType = value;
    this.setErrorTypeFields();
  }

  public get errorType() {
    return this._errorType;
  }

  public title: string = undefined;
  public description: string = undefined;

  private _errorType: string;

  constructor(private resources: SkyResourcesService) { }

  public ngOnInit() {
    if (this.errorType && this.errorType !== '') {
      this.setErrorTypeFields();
    }
  }

  public setErrorTypeFields() {
    if (this.errorType.toLowerCase() === 'broken') {
      this.title = this.resources.getString('error_component_broken_title');
      this.description = this.resources.getString('error_component_broken_description');

    } else if (this.errorType.toLowerCase() === 'notfound') {
      this.title = this.resources.getString('error_component_not_found_title');
      this.description = undefined;

    } else if (this.errorType.toLowerCase() === 'construction') {
      this.title = this.resources.getString('error_component_construction_title');
      this.description = this.resources.getString('error_component_construction_description');

    } else if (this.errorType.toLowerCase() === 'security') {
      this.title = this.resources.getString('error_component_security_title');
      this.description = undefined;
    }
  }

  public showBrokenImage() {
    return this.errorType && this.errorType.toLowerCase() === 'broken';
  }

  public showNotFoundImage() {
    return this.errorType && this.errorType.toLowerCase() === 'notfound';
  }

  public showConstructionImage() {
    return this.errorType && this.errorType.toLowerCase() === 'construction';
  }

  public showSecurityImage() {
    return this.errorType && this.errorType.toLowerCase() === 'security';
  }

}
