import { SkyFormat } from './format';

describe('Format class', () => {
  describe('formatText() method', () => {
    it('should return the expected strings', function () {
      let format = 'My name is {0}, {1}',
        name = 'Jimithy',
        greeting = 'hello',
        result = '';

      result = SkyFormat.formatText(format, name, greeting);
      expect(result).toBe('My name is Jimithy, hello');

    });

    it('should return empty string when format is undefined', function () {
      let format: string,
        name = 'Jimithy',
        greeting = 'hello',
        result = '';
      result = SkyFormat.formatText(format, name, greeting);
      expect(result).toBe('');
    });
  });
});
