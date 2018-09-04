import {
  Component,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'sky-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class SkyColumnComponent implements OnInit {

  @Input()
  set screenXSmall(value: number) {
    this._screenXSmall = value;
    this.classnames = this.getClassNames();
  }

  get screenXSmall() {
    return this._screenXSmall;
  }

  @Input()
  set screenSmall(value: number) {
    this._screenSmall = value;
    this.classnames = this.getClassNames();
  }

  get screenSmall() {
    return this._screenXSmall;
  }

  @Input()
  set screenMedium(value: number) {
    this._screenMedium = value;
    this.classnames = this.getClassNames();
  }

  get screenMedium() {
    return this._screenMedium;
  }

  @Input()
  set screenLarge(value: number) {
    this._screenLarge = value;
    this.classnames = this.getClassNames();
  }

  get screenLarge() {
    return this._screenLarge;
  }

  @HostBinding('class')
  private classnames: string;

  private _screenXSmall: number;
  private _screenSmall: number;
  private _screenMedium: number;
  private _screenLarge: number;

  public getClassNames(): string {
    let classnames = [
      'sky-column'
    ];

    if (this._screenXSmall) {
      classnames.push(`sky-column-xs-${this._screenXSmall}`);
    }

    if (this._screenSmall) {
      classnames.push(`sky-column-sm-${this._screenSmall}`);
    }

    if (this._screenMedium) {
      classnames.push(`sky-column-md-${this._screenMedium}`);
    }

    if (this._screenLarge) {
      classnames.push(`sky-column-lg-${this._screenLarge}`);
    }

    return classnames.join(' ');
  }

  public ngOnInit(): void {
    this.classnames = this.getClassNames();
  }
}
