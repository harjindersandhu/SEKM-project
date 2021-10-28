import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./components/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./components/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./components/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
