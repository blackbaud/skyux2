import { Component, ViewEncapsulation } from '@angular/core';

require('style-loader!blackbaud-skyux2/dist/css/sky.css');

@Component({
  selector: 'sky-pages-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent { }
