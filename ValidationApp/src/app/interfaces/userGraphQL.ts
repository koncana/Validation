import gql from 'graphql-tag';

export interface userGraphQL {
    login: any;
    studentFromUser: any;
    AllModulesToValidate: any;
    getUser: any;
}

const getUser = gql`
    getUser(username: ${this.graphql.Username}){
      username
      password
      role
  }
    `;

const login = gql`
      query {
        login
      }
    `;

const studentFromUser = gql`
    getStudentFromUser(username: ${this.graphql.Username}){
      dni
      name
      firstSurname
      secondSurname
      dateOfBirth 
  }
    `;

    const AllModulesToValidate = gql`
    getAllModulesToValidate(dni: ${this.graphql.Username}){
      student{
        dni
      }
      module{
        cod
      }
      status
  }
    `;