import { Component } from '@angular/core';
import { GraphQLModule } from '../graphql/graphql.module';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  private isAdmin = false;

  constructor(private graphql: GraphQLModule, private router: Router, private menu: MenuController) { 
    this.enableMenu();
  }

  ngOnInit() {
    if (this.graphql.User.role == "ROLE_ADMIN") {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    this.enableMenu();
  }

  enableMenu() {
    this.menu.enable(true, 'menu');
  }

  gotToOptions() {
    this.router.navigate(['options']);
  }

  gotToAbout() {
    this.router.navigate(['about'])
  }

  setIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }

}
