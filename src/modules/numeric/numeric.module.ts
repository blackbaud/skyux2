import { NgModule } from '@angular/core';
import { SkyNumericPipe } from './numeric.pipe';
import { SkyNumericService } from './numeric.service';

@NgModule({
  declarations: [SkyNumericPipe],
  providers: [SkyNumericService],
  exports: [SkyNumericPipe]
})
export class SkyNumericModule { }
