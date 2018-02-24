import { SkyModalConfiguration } from './modal-configuration';

describe('Modal configuration', () => {
  beforeEach(function () {
    this.testService = new SkyModalConfiguration();
    this.testService.fullPage = true;
  });

  it('should have name property fullPage', function () {
    expect(this.testService.fullPage).toBe(true);
  });
});
