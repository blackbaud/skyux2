import { SkyFlyoutAdapterService } from './flyout-adapter.service';

export { SkyFlyoutComponent } from './flyout.component';
export { SkyFlyoutModule } from './flyout.module';
export { SkyFlyoutAdapterService } from './flyout-adapter.service';
export { SkyFlyoutService } from './flyout.service';
export { SkyFlyoutInstance } from './flyout-instance';
export { SkyFlyoutConfig } from './flyout.interface';

export const SKY_FLYOUT_PROVIDERS: any[] = [
  SkyFlyoutAdapterService
];
