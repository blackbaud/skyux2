import { SkyResources } from './resources';

let defaultLocale = require('../../locales/resources_en_US.json');

describe('Resources class', () => {
  describe('getString() method', () => {
    it('should return the expected strings', function () {
      for (let p in defaultLocale) {
        if (defaultLocale.hasOwnProperty(p)) {
          expect(SkyResources.getString(p)).toBe(defaultLocale[p].message);
        }
      }
    });

    it('should return provided name if a corresponding string is not found', function () {
      let unknownString = '%W#%@3f3J#%#21435E#Gjgwge32';

      expect(SkyResources.getString(unknownString)).toBe(unknownString);
    });
  });
});
