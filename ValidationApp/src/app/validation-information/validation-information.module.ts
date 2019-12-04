import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidationInformationPageRoutingModule } from './validation-information-routing.module';

import { ValidationInformationPage } from './validation-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidationInformationPageRoutingModule
  ],
  declarations: [ValidationInformationPage]
})
export class ValidationInformationPageModule {}
