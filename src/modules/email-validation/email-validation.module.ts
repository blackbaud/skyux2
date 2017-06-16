import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SkyEmailValidationInputDirective } from './email-validation-input.directive';

@NgModule({
    declarations: [
        SkyEmailValidationInputDirective
    ],
    imports: [
        FormsModule
    ],
    exports: [
        SkyEmailValidationInputDirective
    ]
})
export class SkyEmailValidationModule { }
