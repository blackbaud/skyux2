import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { SkyResourcesService } from '../resources/resources.service';

@Component({
  selector: 'sky-error',
  styleUrls: ['./error.component.scss'],
  templateUrl: './error.component.html'
})
export class SkyErrorComponent implements OnInit {

  @Input()
  public title: string;

  @Input()
  public description: string;

  @Input()
  public actionText: string;

  @Input()
  public action: any;

  @Input()
  public set errorType(value: string) {
    this._errorType = value;
    this.setErrorTypeFields();
  };

  @Output()
  public actionClicked: EventEmitter<any> = new EventEmitter();

  public get errorType() {
    return this._errorType;
  }

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
      this.actionText = this.resources.getString('error_component_action');

    } else if (this.errorType.toLowerCase() === 'notfound') {
      this.title = this.resources.getString('error_component_not_found_title');
      this.description = undefined;
      this.actionText = this.resources.getString('error_component_action');

    } else if (this.errorType.toLowerCase() === 'construction') {
      this.title = this.resources.getString('error_component_construction_title');
      this.description = this.resources.getString('error_component_construction_description');
      this.actionText = this.resources.getString('error_component_action');
    }
  }

  public buttonClicked() {
    this.actionClicked.emit();
  }
}
