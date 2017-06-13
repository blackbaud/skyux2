import { NgModule } from '@angular/core';
import { SkyAutonumericPipe } from './autonumeric.pipe';
import { SkyAutonumericService } from './autonumeric.service';

@NgModule({
  declarations: [SkyAutonumericPipe],
  providers: [SkyAutonumericService],
  exports: [SkyAutonumericPipe]
})
export class SkyAutonumericModule { }
