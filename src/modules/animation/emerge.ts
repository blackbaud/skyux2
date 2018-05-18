// #region imports
import {
  animate,
  AnimationEntryMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/core';
// #endregion

export const skyAnimationEmerge = trigger('skyAnimationEmerge', [
  state('open', style({
    opacity: 1,
    transform: 'scale(1)'
  })),
  state('closed', style({
    opacity: 0,
    transform: 'scale(0.0)'
  })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'scale(0.0)'
    }),
    animate('300ms ease-in-out')
  ]),
  transition(`* <=> *`, animate('300ms ease-in-out'))
]) as AnimationEntryMetadata;
