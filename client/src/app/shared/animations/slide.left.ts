import {style, state, animate, transition, trigger} from "@angular/core";
export const slideLeftAnimation = animationState => trigger(animationState, [
    state('in', style({
      transform: 'translateX(0)'
    })),
    state('void', style({
      transform: 'translateX(30px)'
    })),
    transition('in <=> void', animate('100ms'))
  ]);
