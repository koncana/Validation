import { NgModule } from "@angular/core";
import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { ApolloModule, Apollo } from "apollo-angular";

import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";

import { InMemoryCache } from "apollo-cache-inmemory";
import { User } from '../interfaces/users';

@NgModule({

  exports: [HttpClientModule, ApolloModule, HttpLinkModule]

})

export class GraphQLModule {

  private user: User = {
    username: "",
    password: "",
    role: "" 
  }

  private uri: string = "http://192.168.1.36:8080/graphql";

  private headers: HttpHeaders;

  constructor(private apollo: Apollo, private httpLink: HttpLink) { }

  get User(): User{
    return this.user;
  }

  async setApollosEmpty(){
    this.headers = new HttpHeaders();
    this.headers =  this.headers.append("Content-Type", "application/json");

    this.apollo.removeClient();
    this.apollo.create({      
      link: this.httpLink.create({ headers: this.headers, uri: this.uri }),
      cache: new InMemoryCache()
    });
  }

  async setApollos(){
    this.headers = new HttpHeaders();
    this.headers =  this.headers.append("Authorization", "Basic " + btoa(this.user.username+":"+this.user.password));
    this.headers =  this.headers.append("Content-Type", "application/json");

    this.apollo.removeClient();
    this.apollo.create({      
      link: this.httpLink.create({ headers: this.headers, uri: this.uri }),
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