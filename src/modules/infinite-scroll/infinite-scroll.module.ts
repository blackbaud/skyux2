import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyInfiniteScrollComponent } from './infinite-scroll.component';
import { SkyResourcesModule } from '../resources';
import { SkyWaitModule } from '../wait';

@NgModule({
    declarations: [
        SkyInfiniteScrollComponent
    ],
    imports: [
        CommonModule,
        SkyResourcesModule,
        SkyWaitModule
    ],
    exports: [
        SkyInfiniteScrollComponent
    ]
})
export class SkyInfiniteScrollModule { }
