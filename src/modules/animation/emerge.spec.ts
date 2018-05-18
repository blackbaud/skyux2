// #region imports
import {
  skyAnimationEmerge
} from './emerge';
// #endregion

describe('Animation emerge', () => {
  it('should define an animation trigger', () => {
    const definitions: any = skyAnimationEmerge.definitions;

    expect(skyAnimationEmerge.name).toEqual('skyAnimationEmerge');
    expect(definitions[0].name).toEqual('open');
    expect(definitions[1].name).toEqual('closed');
    expect(definitions[2].animation.timings).toEqual('300ms ease-in-out');
  });
});
