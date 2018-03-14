import { expect } from '../testing';

import { SkyFluidGridModule } from './fluid-grid.module';

describe('SkyFluidGridModule', () => {
  it('should export', () => {
    const exportedModule = new SkyFluidGridModule();
    expect(exportedModule).toBeDefined();
  });
});
