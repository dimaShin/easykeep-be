import {style, state, animate, transition, trigger} from "@angular/core";
export const slideYAnimation = (
  animationState: string,
  move: string
) => trigger(animationState, [
  state('in', style({
    transform: 'translateY(0)',
    height: '100%'
  })),
  state('void', style({
    transform: `translateY(${move})`,
    height: 0,
  })),
  transition('in <=> void', animate('100ms'))
]);
