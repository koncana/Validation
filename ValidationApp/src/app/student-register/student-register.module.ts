import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentRegisterPageRoutingModule } from './student-register-routing.module';

import { StudentRegisterPage } from './student-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentRegisterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [StudentRegisterPage]
})
export class StudentRegisterPageModule {}
