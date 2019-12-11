import { Component } from '@angular/core';
import { GraphQLModule } from '../graphql/graphql.module';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  private isAdmin = false;

  constructor(private graphql: GraphQLModule) { }

  ngOnInit() {
    if (this.graphql.User.role == "ROLE_ADMIN") {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  setIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }

}
