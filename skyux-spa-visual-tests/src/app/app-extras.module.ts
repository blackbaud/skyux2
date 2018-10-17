import {
  NgModule
} from '@angular/core';

import {
  ProgressIndicatorWizardDemoComponent
} from './progress-indicator/progress-indicator-horizontal-visual.component';

require('style-loader!./visual.scss');

// Specify entry components, module-level providers, etc. here.
@NgModule({
  providers: [],
  entryComponents: [
    ProgressIndicatorWizardDemoComponent
  ]
})
export class AppExtrasModule { }
