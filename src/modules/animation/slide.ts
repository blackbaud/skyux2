import {
  animate,
  AnimationEntryMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/core';

export const skyAnimationSlide = trigger('skyAnimationSlide', [
  state('down', style({
    overflow: 'hidden',
    height: '*'
  })),
  state('up', style({
    overflow: 'hidden',
    height: 0
  })),
  transition(
    'up <=> down',
    animate('150ms ease-in')
  )
]) as AnimationEntryMetadata;
