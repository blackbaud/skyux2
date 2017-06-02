import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyAlertModule } from '../alert.module';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'alert-visual',
  templateUrl: './alert-visual.component.html'
})
export class AlertVisualComponent {
  public alertCloseable = true;
}
