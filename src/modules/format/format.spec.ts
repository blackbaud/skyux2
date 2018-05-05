import { SkyFormat } from './format';

describe('Format class', () => {
  describe('formatText() method', () => {
    it('should return the expected strings', function () {
      const format = 'My name is {0}, {1}';
      const name = 'Jimithy';
      const greeting = 'hello';
      const result = SkyFormat.formatText(format, name, greeting);
      expect(result).toBe('My name is Jimithy, hello');
    });

    it('should return empty string when format is undefined', function () {
      const name = 'Jimithy';
      const greeting = 'hello';
      const result = SkyFormat.formatText(undefined, name, greeting);
      expect(result).toBe('');
    });
  });
});
