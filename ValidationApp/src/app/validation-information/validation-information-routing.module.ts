import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidationInformationPage } from './validation-information.page';

const routes: Routes = [
  {
    path: '',
    component: ValidationInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidationInformationPageRoutingModule {}
