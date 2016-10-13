import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';

import { SkyModule } from './core';

import { SkyAlertDemoComponent } from './modules/alert/docs/alert.component.demo';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SkyModule
  ],
  declarations: [
    SkyAlertDemoComponent
  ]
})
export class SkyDemoModule { }

export const SKY_DEMO_ROUTES: Routes = [
  { path: 'components/alert', component: SkyAlertDemoComponent }
];
