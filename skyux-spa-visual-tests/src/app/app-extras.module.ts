import { NgModule } from '@angular/core';

import { FlyoutDemoComponent } from './flyout/flyout-demo.component';
import { ToastDemoComponent } from './toast/toast-demo.component';

import { ProgressIndicatorWizardDemoComponent } from './progress-indicator/progress-indicator-horizontal-visual.component';

require('style-loader!./visual.scss');

// Specify entry components, module-level providers, etc. here.
@NgModule({
  providers: [],
  entryComponents: [
    FlyoutDemoComponent,
    ToastDemoComponent,
    ProgressIndicatorWizardDemoComponent
  ]
})
export class AppExtrasModule { }
