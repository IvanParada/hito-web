import { Routes } from '@angular/router';

import { Landing } from './features/landing/landing';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';

import { MarketingLayout } from './layout/marketing-layout/marketing-layout';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { PrivateLayout } from './layout/private-layout/private-layout';
import { Dashboard } from './features/dashboard/dashboard';
import { Settings } from './features/settings/settings';
import { Projects } from './features/projects/projects';
import { Materials } from './features/materials/materials';
import { Clients } from './features/clients/clients';

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

  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
    ],
  },
  {
    path: 'app',
    component: PrivateLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'clients',
        component: Clients,
      },
      {
        path: 'materials',
        component: Materials,
      },
      {
        path: 'projects',
        component: Projects,
      },
      {
        path: 'settings',
        component: Settings,
      },

    ],
  }
];