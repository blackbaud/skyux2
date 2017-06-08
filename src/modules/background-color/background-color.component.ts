import { Component, Input } from '@angular/core';

@Component({
    selector: 'background-color',
    styleUrls: ['./background-color.component.scss'],
    templateUrl: './background-color.component.html'
})

export class BackgroundColorComponent{
    @Input()
    public get userColor() {
    return this._userColor;
  }

  public set userColor(value: string) {
    this._userColor = value;
  }

    private _userColor: string;
}