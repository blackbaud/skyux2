import { NgModule } from '@angular/core';
import { SkyTextHighlightDirective } from './text-highlight.directive';

@NgModule({
  declarations: [
    SkyTextHighlightDirective
  ],
  exports: [
    SkyTextHighlightDirective
  ]
})
export class SkyTextHighlightModule { }
