import { skyAnimationSlide } from './slide';

describe('Animation slide', () => {
  it('should define an animation trigger', () => {
    const definitions: any = skyAnimationSlide.definitions;

    expect(skyAnimationSlide.name).toEqual('skyAnimationSlide');
    expect(definitions[0].name).toEqual('down');
    expect(definitions[1].name).toEqual('downWithBottomPadding');
    expect(definitions[2].name).toEqual('up');
    expect(definitions[3].expr).toEqual('up <=> down');
    expect(definitions[3].animation.timings).toEqual('150ms ease-in');
    expect(definitions[4].expr).toEqual('up <=> downWithBottomPadding');
    expect(definitions[4].animation.timings).toEqual('150ms ease-in');
  });
});
