import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { GraphQLModule } from '../graphql/graphql.module';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  student: Student = {
    dni: "",
    studentName: "",
    firstSurname: "",
    secondSurname: "",
    dateOfBirth: "",
    telephone: "",
    cycle: "",
    group: "",
    shift: "",
    course: ""
  }

  constructor(private apollo: Apollo, private graphql: GraphQLModule) { }

  getUser(username: string) {
    const getUser = gql`
    query getUser($username: ID!)  {
      getUser(username: $username){
        username,
        password,
        role
      }
    }
    `;
    return this.apollo.watchQuery<any>({
      query: getUser,
      variables: {
        username: username
      }
    })
      .valueChanges;
  }

  getStudent(dni: string) {
    const getStudent = gql`
    query getStudent($dni: ID!){
      getStudent(dni: $dni) { 
          dni
          studentName
          firstSurname
          secondSurname
          dateOfBirth
          telephone
          cycle
	        shift
	        group
	        course
        }
    }
    `;
    return this.apollo.watchQuery<any>({
      query: getStudent,
      variables: {
        dni: dni
      }
    })
      .valueChanges
  }

  modifyValidation(cod: number, dni: string, status: string) {
    const updateValidate = gql`
    mutation updateValidate($dni: ID!, $cod: ID!, $status: String!){
      updateValidate(dni: $dni, cod: $cod, status: $status){
        student {
          dni
        }
        module {
          cod
        }
        status
      }        
    }
  `;
    return this.apollo.mutate({
      mutation: updateValidate,
      variables: {
        dni: dni,
        cod: cod,
        status: status
      }
    });
  }

  removeStudent(dni: string) {
    const deleteStudent = gql`
    mutation deleteStudent($dni: ID!){
      deleteStudent(dni: $dni)        
    }
  `;
    return this.apollo.mutate({
      mutation: deleteStudent,
      variables: {
        dni: dni
      }
    });
  }

  removeUser(username: string) {
    const deleteUser = gql`
      mutation deleteUser($username: ID!){
        deleteUser(username: $username)        
      }
    `;
    return this.apollo.mutate({
      mutation: deleteUser,
      variables: {
        username: username
      }
    });
  }

  getAllUsers() {
    const getUsers = gql`
    query getUsers{
      getUsers {
        username
        password
        role
      }
    }
    `;
    return this.apollo.watchQuery<any>({
      query: getUsers,
      variables: {
        username: this.graphql.Username
      }
    })
      .valueChanges
  }

  getAllStudents() {
    const getStudents = gql`
    query getStudents{
        getStudents { 
          dni
          studentName
          firstSurname
          secondSurname
          dateOfBirth
          telephone
          cycle
	        shift
	        group
	        course
        }
    }
    `;
    return this.apollo.watchQuery<any>({
      query: getStudents,
      variables: {
        username: this.graphql.Username
      }
    })
      .valueChanges
  }

  getAllValidations() {
    const getAllValidations = gql`
    query getAllValidations{
      getAllValidations{
        student{
          dni
        }
        module{
          cod
        }
        status
      }
    }
    `;
    return this.apollo.watchQuery<any>({
      query: getAllValidations,
      fetchPolicy: "network-only"
    })
      .valueChanges
  }

  createUser(username: string, password: string, ) {
    const createUser = gql`
      mutation createUser($username1: ID!, $password: String!, $role: String!, $dni: String!){
        createUser(username1: $username1, password: $password, role: $role, dni: $dni){
          username,
          password,
          role
        }
      }
    `;
    return this.apollo.mutate<any>({
      mutation: createUser,
      variables: {
        username1: username,
        password: password,
        role: "",
        dni: ""
      }
    });
  }

  updateUser(username: string) {
    const updateUser = gql`
      mutation updateUser($oldUsername: ID!, $newUsername: String!, $password: String!, $role: String!, $dni: ID!){
        updateUser(oldUsername: $oldUsername, newUsername: $newUsername, password: $password, role: $role, dni: $dni)
      }
    `;
    return this.apollo.mutate<any>({
      mutation: updateUser,      
      variables: {
        oldUsername: this.graphql.user.username,
        newUsername: username,
        password: "",
        role: "",
        dni: ""
      }
    });
  }

  getStudentFromUser() {
    const getStudentFromUser = gql`
    query getStudentFromUser($username: ID! ){
      getStudentFromUser(username: $username){
        dni
	      studentName
	      firstSurname
	      secondSurname
	      dateOfBirth
	      telephone
	      cycle
	      group
	      shift
	      course
      }
    }
    `;
    this.apollo.watchQuery<any>({
      query: getStudentFromUser,
      variables: {
        username: this.graphql.Username
      }
    })
      .valueChanges.subscribe(result => {
        this.student = result.data.getStudentFromUser;
      });
  }

  getAllModulesToValidate() {
    const login = gql`
    query {
      getAllModulesToValidate(dni: ${this.graphql.Username}){
        student{
          dni
        }
        module{
          cod
        }
        status
      }
    }
    `;
    let res;
    this.apollo.watchQuery({
      query: login,
    })
      .valueChanges.subscribe(result => {
        console.log(result.data);
        res = result.data;
      });
    return null;
  }

  getAllContributeModules() {
    const getModulesFromStudent = gql`
    query getModulesFromStudent($dni: ID!){
      getModulesFromStudent(dni: $dni){
        cod,
        moduleName
      }
    }
    `;

    return this.apollo.watchQuery<any>({
      query: getModulesFromStudent,
      // fetchPolicy: "no-cache",
      variables: {
        dni: this.student.dni
      }
    })
      .valueChanges
  }

  getAllValidateModules() {
    const getModulesFromStudent = gql`
    query getAllModulesToValidate($dni: ID!){
      getAllModulesToValidate(dni: $dni){
        module{
            cod,
            moduleName
        }
        status
    }
    }
    `;

    return this.apollo.watchQuery<any>({
      query: getModulesFromStudent,
      variables: {
        dni: this.student.dni
      }
    })
      .valueChanges
  }


  getAllModules() {
    const getAllModules = gql`
    query getAllModules {
      getAllModules { 
        cod,
        moduleName
      }
    }
    `;
    return this.apollo.watchQuery<any>({
      query: getAllModules,
    })
      .valueChanges
  }

  addContributeModule(cod: string) {
    const saveModuleOnStudent = gql`
    mutation saveModuleOnStudent($dni: ID!, $cod: ID!){
      saveModuleOnStudent(dni: $dni, cod: $cod)
    }
  `;
    return this.apollo.mutate({
      mutation: saveModuleOnStudent,
      variables: {
        dni: this.student.dni,
        cod: cod,
      }
    });
  }

  addValidateModule(cod: string) {
    const createValidate = gql`
      mutation createValidate($dni: ID!, $cod: ID!){
        createValidate(dni: $dni, cod: $cod)
      }
    `;
    return this.apollo.mutate({
      mutation: createValidate,
      variables: {
        dni: this.student.dni,
        cod: cod,
      }
    });
  }

  removeValidateModule(cod: string) {
    const deleteValidate = gql`
    mutation deleteValidate($cod: ID!, $dni: ID!){
      deleteValidate(cod: $cod, dni: $dni)
    }
  `;
    return this.apollo.mutate({
      mutation: deleteValidate,
      variables: {
        cod: cod,
        dni: this.student.dni
      }
    });
  }

  removeContributeModule(cod: string) {
    const deleteModuleOnStudent = gql`
    mutation deleteModuleOnStudent($cod: ID!, $dni: ID!){
      deleteModuleOnStudent(cod: $cod, dni: $dni)
    }
  `;
    return this.apollo.mutate({
      mutation: deleteModuleOnStudent,
      variables: {
        cod: cod,
        dni: this.student.dni
      }
    });
  }

  getCurrentUser() {
    const getUser = gql`
    query getUser($username: ID!)  {
      getUser(username: $username){
        username,
        password,
        role
      }
    }
    `;
    return this.apollo.watchQuery<any>({
      query: getUser,
      fetchPolicy: "no-cache",
      variables: {
        username: this.graphql.user.username
      }
    })
      .valueChanges;
  }
}


