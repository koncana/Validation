import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../interfaces/student';
import { ValidateModule } from '../interfaces/validateModule';
import { Modules } from '../interfaces/module';
import { ValidationService } from '../services/validation.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-validation-information',
  templateUrl: './validation-information.page.html',
  styleUrls: ['./validation-information.page.scss'],
})
export class ValidationInformationPage {

  private contributeModules: Array<Modules>;
  private validateModules: Array<ValidateModule>;

  constructor(private router: Router, private api: ValidationService, private alertController: AlertController) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.contributeModules = this.router.getCurrentNavigation().extras.state.contributeModules;
      this.validateModules = this.router.getCurrentNavigation().extras.state.validateModules;
    }
  }

  goBack() {
    this.router.navigate(['tabs/tab4']);
  }

  async updateStatus(validate: ValidateModule) {
    let alert = await this.alertController.create({
      header: 'New Status',
      inputs: [
        {
          name: 'status',
          type: 'text',
          placeholder: 'Status'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.api.modifyValidation(validate.module.cod, validate.student.dni, data.status).subscribe(resullt => {
              this.api.getAllModulesToValidateByDni(validate.student.dni).subscribe(res => {
                this.validateModules = res.data.getAllModulesToValidate;
              });
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
