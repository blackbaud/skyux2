import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackgroundColorComponent } from './background-color.component';

@NgModule({
    declarations: [BackgroundColorComponent],
    imports: [CommonModule],
    exports: [BackgroundColorComponent]
})

export class BackgroundColorModule { }