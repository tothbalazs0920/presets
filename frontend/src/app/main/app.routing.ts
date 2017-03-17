import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

import { PublicPresetListComponent } from './preset-list/public-preset-list.component';
import { PrivatePresetListComponent } from './preset-list/private-preset-list.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/presets',
    pathMatch: 'full'
  },
  {
    path: 'presets',
    component: PublicPresetListComponent
  },
  {
    path: 'profile',
    component: PrivatePresetListComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [PublicPresetListComponent, PrivatePresetListComponent];
