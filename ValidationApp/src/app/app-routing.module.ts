import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'options',
    loadChildren: () => import('./options/options.module').then( m => m.OptionsPageModule)
   },
  {
    path: 'validation-information',
    loadChildren: () => import('./validation-information/validation-information.module').then( m => m.ValidationInformationPageModule)
  },
  {
    path: 'student-information',
    loadChildren: () => import('./student-information/student-information.module').then( m => m.StudentInformationPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'student-register',
    loadChildren: () => import('./student-register/student-register.module').then( m => m.StudentRegisterPageModule)
  }

  // {
  //   path: 'management',
  //   loadChildren: () => import('./management/management.module').then( m => m.ManagementPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
