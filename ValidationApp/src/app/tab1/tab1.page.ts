import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../services/validation.service'
import { Modules } from '../interfaces/module';
import { ValidateModule } from '../interfaces/validateModule';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  private contributeModules: Array<Modules>;
  private validateModules: Array<ValidateModule>;
  private allModules: Array<Modules>;

  constructor(private router: Router, private menu: MenuController, private api: ValidationService, private alertController: AlertController) { }

  ngOnInit(): void {
    this.initializeAll();
  }

  ionViewDidEnter() {
    this.initializeAll();
  }

  async initializeAll() {
    this.showContributeModules();
    this.showValidateModules();
  }

  async showContributeModules() {
    this.api.getAllContributeModules().subscribe(result => {
      this.contributeModules = result.data.getModulesFromStudent;
    });
  }

  async showValidateModules() {
    this.api.getAllValidateModules().subscribe(result => {
      this.validateModules = result.data.getAllModulesToValidate;
    });
  }

  addModules(type: string) {
    return this.api.getAllModules().subscribe(result => {
      this.allModules = result.data.getAllModules;
      if (type === "contribute") {
        this.listOfOptions("contribute");
      } else {
        this.listOfOptions("validate");
      }
    });
  }

  listOfOptions(type: string) {
    let radio_options = [];
    for (let module of this.allModules) {
      radio_options.push({
        type: 'radio',
        label: module.cod + " | " + module.moduleName,
        value: module.cod,
        checked: 0
      });
    }
    if (type === "contribute") {
      this.contributeAlert(radio_options);
    } else {
      this.validateAlert(radio_options);
    }
  }

  async contributeAlert(radio_options: any) {
    let alert = await this.alertController.create({
      header: 'Modules',
      inputs: radio_options,
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
            this.api.addContributeModule(data).subscribe(result => {
              this.showContributeModules();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async validateAlert(radio_options: any) {
    let alert = await this.alertController.create({
      header: 'Modules',
      inputs: radio_options,
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
            this.api.addValidateModule(data).subscribe(result => {
              this.showValidateModules();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async removeContributeModule(cod: string) {
    this.api.removeContributeModule(cod).subscribe(result => {
      this.showContributeModules();
    });
  }

  async removeValidateModule(cod: string) {
    this.api.removeValidateModule(cod).subscribe(result => {
      this.showValidateModules();
    });
  }

}
