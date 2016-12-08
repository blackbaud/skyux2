import { SkyModalAdapterService } from './modal-adapter.service';

export { SkyModalComponent } from './modal.component';
export { SkyModalModule } from './modal.module';
export { SkyModalService } from './modal.service';
export { SkyModalInstance } from './modal-instance';

export const SKY_MODAL_PROVIDERS: any[] = [
  SkyModalAdapterService
];
