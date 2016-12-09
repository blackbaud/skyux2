import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule } from '../../../../src/core';

import { Bootstrapper } from '../../../../visual/bootstrapper';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './tabset.component.visual-fixture.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public newTabClick() { }
  public openTabClick() { }
  public closeTab() { }

  public showWizard = false;

  public requiredValue1: string;

  public requiredValue2: boolean;

  public get step2Disabled(): boolean {
    return !this.requiredValue1;
  }

  public get step3Disabled(): boolean {
    return this.step2Disabled || !this.requiredValue2;
  }

  public validateStep1() {
    return true;
  }
}

@NgModule({
  imports: [
    BrowserModule,
    SkyModule,
    FormsModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
