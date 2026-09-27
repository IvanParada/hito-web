import { Routes } from '@angular/router';

import { Landing } from './features/landing/landing';
import { MarketingLayout } from './layout/marketing-layout/marketing-layout';

export const routes: Routes = [
  {
    path: '',
    component: MarketingLayout,
    children: [
      {
        path: '',
        component: Landing,
      },
    ],
  },
];