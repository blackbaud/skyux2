import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line
  selector: 'div.tile1',
  templateUrl: './tiles-demo-tile1.component.html'
})
export class SkyTilesDemoTile1Component {
  public tileSettingsClick() {
    alert('tile settings clicked');
  }
}
