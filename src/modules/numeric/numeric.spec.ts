import {
  CurrencyPipe,
  DecimalPipe
} from '@angular/common';

import {
  NumericOptions
} from './numeric.options';

import {
  SkyNumericService
} from './numeric.service';

const skyNumeric = new SkyNumericService(
  new CurrencyPipe('en-US'),
  new DecimalPipe('en-US')
);

describe('Numeric service', () => {
  it('formats 0 with 0 digits as 0', () => {
    const value = 0;
    let options = new NumericOptions();
    options.digits = 0;

    expect(skyNumeric.formatNumber(value, options)).toBe('0');
  });

  it('formats undefined as blank', () => {
    let value = undefined;
    let options = new NumericOptions();
    options.digits = 0;

    expect(skyNumeric.formatNumber(value, options)).toBe('');
  });

  it('formats 100 with 0 digits as 100', () => {
    const value = 100;
    let options = new NumericOptions();
    options.digits = 0;

    expect(skyNumeric.formatNumber(value, options)).toBe('100');
  });

  it('formats 1000 with 0 digits as 1K', () => {
    const value = 1000;
    let options = new NumericOptions();
    options.digits = 0;
    expect(skyNumeric.formatNumber(value, options)).toBe('1K');
  });

  it('does not truncate 1000 with 2 digits as 1K when truncate is false', () => {
    const value = 1000;
    let options = new NumericOptions();
    options.digits = 2;
    options.truncate = false;
    expect(skyNumeric.formatNumber(value, options)).toBe('1,000.00');
  });

  it('formats 1000000 with 0 digits as 1M', () => {
    const value = 1000000;
    let options = new NumericOptions();
    options.digits = 0;
    expect(skyNumeric.formatNumber(value, options)).toBe('1M');
  });

  it('does not truncate 1000000 with 2 digits as 1M when truncate is false', () => {
    const value = 1000000;
    let options = new NumericOptions();
    options.digits = 2;
    options.truncate = false;
    expect(skyNumeric.formatNumber(value, options)).toBe('1,000,000.00');
  });

  it('formats 1000000000 with 0 digits as 1B', () => {
    const value = 1000000000;
    let options = new NumericOptions();
    options.digits = 0;
    expect(skyNumeric.formatNumber(value, options)).toBe('1B');
  });

  it('does not truncate 1000000000 with 2 digits as 1B when truncate is false', () => {
    const value = 1000000000;
    let options = new NumericOptions();
    options.digits = 2;
    options.truncate = false;
    expect(skyNumeric.formatNumber(value, options)).toBe('1,000,000,000.00');
  });

  it('formats 1000000000000 with 0 digits as 1T', () => {
    const value = 1000000000000;
    let options = new NumericOptions();
    options.digits = 0;
    expect(skyNumeric.formatNumber(value, options)).toBe('1T');
  });

  it('does not truncate 1000000000000 with 2 digits as 1T when truncate is false', () => {
    const value = 1000000000000;
    let options = new NumericOptions();
    options.digits = 2;
    options.truncate = false;
    expect(skyNumeric.formatNumber(value, options)).toBe('1,000,000,000,000.00');
  });

  it('formats 999000000 as 999M', () => {
    const value = 999000000;
    let options = new NumericOptions();
    options.digits = 2;
    expect(skyNumeric.formatNumber(value, options)).toBe('999M');
  });

  it('formats 1234000 with 2 digits as 1.23M', () => {
    const value = 1234000;
    let options = new NumericOptions();
    options.digits = 2;
    expect(skyNumeric.formatNumber(value, options)).toBe('1.23M');
  });

  it('formats 1235000 with 2 digits as 1.24M', () => {
    const value = 1235000;
    let options = new NumericOptions();
    options.digits = 2;
    expect(skyNumeric.formatNumber(value, options)).toBe('1.24M');
  });

  it('formats 1450 with 1 digits as 1.5K', () => {
    const value = 1450;
    let options = new NumericOptions();
    options.digits = 1;
    expect(skyNumeric.formatNumber(value, options)).toBe('1.5K');
  });

  it('formats 1000 as US dollar with 0 digits as $1K', () => {
    const value = 1000;
    let options = new NumericOptions();
    options.digits = 0;
    options.iso = 'USD';
    options.format = 'currency';
    expect(skyNumeric.formatNumber(value, options)).toBe('$1K');
  });

  it('formats 1450 as US dollar with 1 digits as $1.5K', () => {
    const value = 1450;
    let options = new NumericOptions();
    options.digits = 1;
    options.iso = 'USD';
    options.format = 'currency';
    expect(skyNumeric.formatNumber(value, options)).toBe('$1.5K');
  });

  it('formats 1500 as Euro with 1 digits as €1.5K', () => {
    const value = 1500;
    let options = new NumericOptions();
    options.digits = 1;
    options.iso = 'EUR';
    options.format = 'currency';
    expect(skyNumeric.formatNumber(value, options)).toBe('€1.5K');
  });

  it('formats 15.50 as Pounds with 2 digits as £15.50', () => {
    const value = 15.50;
    let options = new NumericOptions();
    options.digits = 2;
    options.iso = 'GBP';
    options.format = 'currency';
    expect(skyNumeric.formatNumber(value, options)).toBe('£15.50');
  });

  // Testing ability only after a certain value is specified
  // using the truncateAfter configuration property
  it('does not truncate 5000 to 5K when truncateAfter set to 10000', () => {
    const value = 5000;
    let options = new NumericOptions();
    options.digits = 0;
    options.truncateAfter = 10000;
    expect(skyNumeric.formatNumber(value, options)).toBe('5,000');
  });

  it('formats 10001 to 10K when truncateAfter set to 10000', () => {
    const value = 10001;
    let options = new NumericOptions();
    options.digits = 0;
    options.truncateAfter = 10000;
    expect(skyNumeric.formatNumber(value, options)).toBe('10K');
  });

  // Adjusting test to expect either format of a negative.  MS browsers use system's Region
  // setting for Currency formatting.  For Negative currency, the windows default is parentheses
  // around the number. All other browsers use a preceeding negative sign (-).
  it('formats -15.50 as US dollar with 2 digits as -$15.50', () => {
    const value = -15.50;
    let options = new NumericOptions();
    options.digits = 2;
    options.iso = 'USD';
    options.format = 'currency';
    expect('-$15.50 ($15.50)').toContain(skyNumeric
    .formatNumber(value, options));
  });

  it('formats 145.45 with 1 digits as 145.5', () => {
    const value = 145.45;
    let options = new NumericOptions();
    options.digits = 1;
    expect(skyNumeric.formatNumber(value, options)).toBe('145.5');
  });

  it('formats 1.2345 with 3 digits as 1.235', () => {
    const value = 1.2345;
    let options = new NumericOptions();
    options.digits = 3;
    expect(skyNumeric.formatNumber(value, options)).toBe('1.235');
  });

  it('should handle localized shorten symbols', () => {
    const originalValue = skyNumeric['symbolIndex'][3];
    const value = 1450;
    let options = new NumericOptions();

    skyNumeric['symbolIndex'][3].label = 'c';

    expect(skyNumeric.formatNumber(value, options)).toBe('1.5c');

    skyNumeric['symbolIndex'][3] = originalValue;
  });
});
