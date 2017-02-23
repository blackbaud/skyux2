import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'sky-error',
  styleUrls: ['./error.component.scss'],
  templateUrl: './error.component.html'
})
export class SkyErrorComponent implements OnInit {

  @Input()
  public title: string = '';

  @Input()
  public description: string = '';

  @Input()
  public actionText: string = '';

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

  public ngOnInit() {
    if (this.errorType && this.errorType !== '') {
      this.setErrorTypeFields();
    }
  }

  public setErrorTypeFields() {
    if (this.errorType.toLowerCase() === 'broken') {
      this.title = 'Sorry, something went wrong.';
      this.description = 'Try to refresh this page or come back later.';
      this.actionText = 'Refresh';

    } else if (this.errorType.toLowerCase() === 'notfound') {
      this.title = 'Sorry, we can\'t reach that page.';
      this.description = '';
      this.actionText = 'Refresh';

    } else if (this.errorType.toLowerCase() === 'construction') {
      this.title = 'This page will return soon.';
      this.description = `Thanks for your patience while improvements are made!
Please check back in a little while.`;
      this.actionText = 'Refresh';
    }
  }

  public buttonClicked() {
    this.actionClicked.emit();
  }
}
