/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

// Component transition animations
// Usage: [@initAnimation] after @importing in a component

export const fadeAnimation: AnimationTriggerMetadata =
  trigger('initAnimation', [
    state('*',
      style({
        opacity: 1,
      }),
    ),
    transition(':enter', [
      style({
        opacity: 0,
      }),
      animate('0.3s ease-in'),
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
      })),
    ]),
  ]);
export const slideInLeftAnimation: AnimationTriggerMetadata =
  trigger('initAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)',
      }),
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)',
      }),
      animate('0.3s ease-in'),
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)',
      })),
    ]),
  ]);
export const slideInDownAnimation: AnimationTriggerMetadata =
  trigger('initAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateY(0)',
      }),
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(-100%)',
      }),
      animate('0.3s ease-in'),
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateY(100%)',
      })),
    ]),
  ]);
