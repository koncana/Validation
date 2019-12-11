import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../services/validation.service'
import { GraphQLModule } from '../graphql/graphql.module';
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

  ngOnInit(): void {
    this.initializeAll();
  }

  private contributeModules: Array<Modules>;
  private validateModules: Array<ValidateModule>;
  private allModules: Array<Modules>;

  constructor(private router: Router, private menu: MenuController, private api: ValidationService, private graphql: GraphQLModule, private alertController: AlertController) { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  ionViewDidEnter() {
    this.initializeAll();
  }

  gotToOptions() {
    this.router.navigate(['options']);
  }

  gotToAbout() {
    this.router.navigate(['about'])
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

  async getAllModules() {
    this.api.getAllModules().subscribe(result => {
      this.allModules = result.data.getAllModules;
    });
  }

  async addContributeModule() {
    await this.getAllModules();

    let radio_options = [];
    for (let module of this.allModules) {
      radio_options.push({
        type: 'radio',
        label: module.cod + " | " + module.moduleName,
        value: module.cod,
        checked: 0
      });
    }
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

  async addValidateModules() {
    await this.getAllModules();

    let radio_options = [];
    for (let module of this.allModules) {
      radio_options.push({
        type: 'radio',
        label: module.cod + " | " + module.moduleName,
        value: module.cod,
        checked: 0
      });
    }
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
