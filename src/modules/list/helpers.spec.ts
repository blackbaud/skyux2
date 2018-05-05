import {
  getData
} from './helpers';
describe('list helpers', () => {
  it('gets data based on a standard selector', () => {
    const data = {
      myResult: 'something',
      otherResult: 'nothing'
    };
    const result = getData(data, 'myResult');
    expect(result).toBe('something');
  });

  it('shifts data appropriately when a selector is at the front', () => {
    const data = {
      myResult: 'something',
      otherResult: 'nothing'
    };
    const result = getData(data, '.myResult');
    expect(result).toBe('something');
  });

  it('returns properly when null data', () => {
    /* tslint:disable */
    let data: any = {
      myResult: null,
      otherResult: 'nothing'
    };
    /* tslint:enable */

    const result = getData(data, 'myResult');
    expect(result).toBeNull();
  });

  it('returns property when selector is a nested selector', () => {
    const data: any = {
      myResults: { nestedValue: 'expected'},
      otherResult: 'nothing'
    };
    const result = getData(data, 'myResults.nestedValue');
    expect(result).toBe('expected');
  });

  it('returns property when selector is a nested selector that does not exits', () => {
    const data: any = {
      myResults: {},
      otherResult: 'nothing'
    };
    const result = getData(data, 'myResults.nestedValue');
    expect(result).toBeNull();
  });

  it('returns property when selector is a nested selector that is undefined', () => {
    const data: any = {
      myResults: { nestedValue: undefined },
      otherResult: 'nothing'
    };
    const result = getData(data, 'myResults.nestedValue');
    expect(result).toBeNull();
  });

  it('returns null when empty string selector defined', () => {
    const data = {
      myResult: 'something',
      otherResult: 'nothing'
    };
    const result = getData(data, '');
    expect(result).toBe(undefined);
  });
});
