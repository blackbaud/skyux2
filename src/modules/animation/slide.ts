import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

const skyAnimationSlide = trigger('skyAnimationSlide', [
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
]);

export {
  skyAnimationSlide
};
