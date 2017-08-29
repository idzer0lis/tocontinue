/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard/auth.guard.service';

export const routes: Routes = [
  { path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login',
    loadChildren: './modules/auth.module',
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

