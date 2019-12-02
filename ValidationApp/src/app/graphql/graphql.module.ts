import { NgModule } from "@angular/core";
import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { ApolloModule, Apollo } from "apollo-angular";

import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";

import { InMemoryCache } from "apollo-cache-inmemory";
import { LoginPage } from '../login/login.page';
import { User } from '../interfaces/users';



@NgModule({

  exports: [HttpClientModule, ApolloModule, HttpLinkModule]

})

export class GraphQLModule {

  user: User = {
    username: "",
    password: "",
    role: "" 
  }

  private headers: HttpHeaders;

  constructor(private apollo: Apollo, private httpLink: HttpLink) { }

  async setApollosEmpty(){
    this.headers = new HttpHeaders();
    this.headers =  this.headers.append("Content-Type", "application/json");
    //this.headers =  this.headers.append("Access-Control-Request-Headers", "*");

    this.apollo.removeClient();
    this.apollo.create({      
      link: this.httpLink.create({ headers: this.headers, uri: "http://localhost:8080/graphql" }),
      cache: new InMemoryCache()
    });
  }

  async setApollos(){
    this.headers = new HttpHeaders();
    this.headers =  this.headers.append("Authorization", "Basic " + btoa(this.user.username+":"+this.user.password));
    this.headers =  this.headers.append("Content-Type", "application/json");
    //this.headers =  this.headers.append("Access-Control-Request-Headers", "*");

    this.apollo.removeClient();
    this.apollo.create({      
      link: this.httpLink.create({ headers: this.headers, uri: "http://localhost:8080/graphql" }),
      cache: new InMemoryCache()
    });
  }

  get Username(){
    return this.user.username;
  }

  set Username(username: string){
    this.user.username = username;
  }

  set Password(password: string){
    this.user.password = password;
  }

  set User(user: User){
    this.user = user;
  }

  set Role(role: string){
    this.user.role = role;
  }
}