import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentInformationPageRoutingModule } from './student-information-routing.module';

import { StudentInformationPage } from './student-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentInformationPageRoutingModule
  ],
  declarations: [StudentInformationPage]
})
export class StudentInformationPageModule {}
