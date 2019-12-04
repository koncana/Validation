import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentInformationPage } from './student-information.page';

const routes: Routes = [
  {
    path: '',
    component: StudentInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentInformationPageRoutingModule {}
