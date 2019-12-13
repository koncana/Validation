import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { GraphQLModule } from '../graphql/graphql.module';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private student: Student = {
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

  get Student(): Student {
    return this.student;
  }

  updateStudent(newStudent: Student) {
    const updateStudent = gql`
      mutation updateStudent($dni: ID!, $studentName: String!, $firstSurname: String!, $secondSurname: String, 
        $dateOfBirth: String!, $telephone: Int!, $cycle: String!, $shift: String!, $group: String!, $course: String!){
        updateStudent(dni: $dni, studentName: $studentName, firstSurname: $firstSurname, secondSurname: $secondSurname, 
          dateOfBirth: $dateOfBirth, telephone: $telephone, cycle: $cycle, shift: $shift, group: $group, course: $course)
      }
    `;
    return this.apollo.mutate({
      mutation: updateStudent,
      variables: {
        dni: newStudent.dni,
        studentName: newStudent.studentName,
        firstSurname: newStudent.firstSurname,
        secondSurname: newStudent.secondSurname,
        dateOfBirth: newStudent.dateOfBirth,
        telephone: newStudent.telephone,
        cycle: newStudent.cycle,
        shift: newStudent.shift,
        group: newStudent.group,
        course: newStudent.course
      }
    });
  }

  updateStudentAll(newStudent: Student) {
    const updateStudent = gql`
    mutation updateStudentAll($oldDni: ID!, $newDni: String!, $studentName: String!, $firstSurname: String!, $secondSurname: String, 
      $dateOfBirth: String!, $telephone: Int!, $cycle: String!, $shift: String!, $group: String!, $course: String!){
      updateStudentAll(oldDni: $oldDni, newDni: $newDni, studentName: $studentName, firstSurname: $firstSurname, secondSurname: $secondSurname, 
        dateOfBirth: $dateOfBirth, telephone: $telephone, cycle: $cycle, shift: $shift, group: $group, course: $course)
    }
  `;
    return this.apollo.mutate({
      mutation: updateStudent,
      variables: {
        oldDni: this.student.dni,
        newDni: newStudent.dni,
        studentName: newStudent.studentName,
        firstSurname: newStudent.firstSurname,
        secondSurname: newStudent.secondSurname,
        dateOfBirth: newStudent.dateOfBirth,
        telephone: newStudent.telephone,
        cycle: newStudent.cycle,
        shift: newStudent.shift,
        group: newStudent.group,
        course: newStudent.course
      }
    });
  }

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
      fetchPolicy: "network-only",
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
      fetchPolicy: "network-only",
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
    return this.apollo.mutate<any>({
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

  removeCurrentUser() {
    const deleteUser = gql`
      mutation deleteUser($username: ID!){
        deleteUser(username: $username)        
      }
    `;
    return this.apollo.mutate({
      mutation: deleteUser,
      variables: {
        username: this.graphql.Username
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
      fetchPolicy: "network-only",
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
      fetchPolicy: "network-only",
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
        dni,
	      studentName,
	      firstSurname,
	      secondSurname,
	      dateOfBirth,
	      telephone,
	      cycle,
	      group,
	      shift,
	      course
      }
    }
    `;
    return this.apollo.watchQuery<any>({
      query: getAllValidations,
      fetchPolicy: "network-only"
    })
      .valueChanges
  }

  createUser(username: string, password: string, dni: string) {
    const createUser = gql`
      mutation createUser($username: ID!, $password: String!, $role: String!, $dni: ID){
        createUser(username: $username, password: $password, role: $role, dni: $dni){
          username,
          password,
          role
        }
      }
    `;
    return this.apollo.mutate<any>({
      mutation: createUser,
      variables: {
        username: username,
        password: password,
        role: "",
        dni: dni
      }
    });
  }

  createStudent(student: Student) {
    const createStudent = gql`
    mutation createStudent($dni: ID!, $studentName: String!, $firstSurname: String!, $secondSurname: String,
      $dateOfBirth: String!, $telephone: Int!, $cycle: String!, $shift: String!, $group: String!, $course: String!){
      createStudent(dni: $dni, studentName: $studentName, firstSurname: $firstSurname, secondSurname: $secondSurname, 
        dateOfBirth: $dateOfBirth, telephone: $telephone, cycle: $cycle, shift: $shift, group: $group, course: $course){
        dni,
        studentName,
        firstSurname,
        secondSurname,
        dateOfBirth,
        telephone,
        cycle,
        shift,
        group,
        course
      }
  }
  `;
    return this.apollo.mutate<any>({
      mutation: createStudent,
      variables: {
        dni: student.dni,
        studentName: student.studentName,
        firstSurname: student.firstSurname,
        secondSurname: student.secondSurname,
        dateOfBirth: student.dateOfBirth,
        telephone: student.telephone,
        cycle: student.cycle,
        shift: student.shift,
        group: student.group,
        course: student.course
      }
    });
  }

  updateUsername(username: string) {
    const updateUserAll = gql`
      mutation updateUserAll($oldUsername: ID!, $newUsername: String!, $password: String!, $role: String!, $dni: ID!){
        updateUserAll(oldUsername: $oldUsername, newUsername: $newUsername, password: $password, role: $role, dni: $dni)
      }
    `;
    return this.apollo.mutate({
      mutation: updateUserAll,
      variables: {
        oldUsername: this.graphql.User.username,
        newUsername: username,
        password: "",
        role: "",
        dni: ""
      }
    });
  }

  updatePassword(password: string) {
    const updateUser = gql`
      mutation updateUser($username: ID!, $password: String!, $role: String!, $dni: ID!){
        updateUser(username: $username, password: $password, role: $role, dni: $dni)
      }
    `;
    return this.apollo.mutate({
      mutation: updateUser,
      variables: {
        username: this.graphql.User.username,
        password: password,
        role: "",
        dni: ""
      }
    });
  }

  updateUserDeleteStudent() {
    const updateUser = gql`
      mutation updateUser($username: ID!, $password: String!, $role: String!, $dni: ID!){
        updateUser(username: $username, password: $password, role: $role, dni: $dni)
      }
    `;
    return this.apollo.mutate<any>({
      mutation: updateUser,
      variables: {
        username: this.graphql.User.username,
        password: "",
        role: "",
        dni: " "
      }
    });
  }

  updateRole(username: string, role: string) {
    const updateUser = gql`
    mutation updateUser($oldUsername: ID!, $newUsername: String!, $password: String!, $role: String!, $dni: ID!){
      updateUser(oldUsername: $oldUsername, newUsername: $newUsername, password: $password, role: $role, dni: $dni)
    }
  `;
    return this.apollo.mutate<any>({
      mutation: updateUser,
      variables: {
        oldUsername: username,
        newUsername: username,
        password: "",
        role: role,
        dni: ""
      }
    });
  }

  updateStudentFromUser(newDni: string) {
    const updateUser = gql`
      mutation updateUser($username: ID!, $password: String!, $role: String!, $dni: ID!){
        updateUser(username: $username, password: $password, role: $role, dni: $dni)
      }
    `;
    return this.apollo.mutate<any>({
      mutation: updateUser,
      variables: {
        username: this.graphql.User.username,
        password: "",
        role: "",
        dni: newDni
      }
    });
  }

  updateStudentFromUserByUsername(newDni: string, username: string) {
    const updateUser = gql`
      mutation updateUser($username: ID!, $password: String!, $role: String!, $dni: ID!){
        updateUser(username: $username, password: $password, role: $role, dni: $dni)
      }
    `;
    return this.apollo.mutate({
      mutation: updateUser,
      variables: {
        username: username,
        password: "",
        role: "",
        dni: newDni
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
      fetchPolicy: "network-only",
      variables: {
        username: this.graphql.Username
      }
    })
      .valueChanges.subscribe(result => {
        this.student = result.data.getStudentFromUser;
      });
  }

  getStudentFromUserByUsername(username: string) {
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
    return this.apollo.watchQuery<any>({
      query: getStudentFromUser,
      fetchPolicy: "network-only",
      variables: {
        username: username
      }
    })
      .valueChanges;
  }

  getAllModulesToValidateByDni(dni: string) {
    const getAllModulesToValidate = gql`
    query getAllModulesToValidate($dni: ID!){
      getAllModulesToValidate(dni: $dni){
        student{
          dni,
          studentName,
          firstSurname,
          secondSurname,
          dateOfBirth,
          telephone,
          cycle,
          group,
          shift,
          course
        }
        module{
          cod,
          moduleName
        }
        status
      }
    }
    `;
    return this.apollo.watchQuery<any>({
      query: getAllModulesToValidate,
      fetchPolicy: "network-only",
      variables: {
        dni: dni
      }
    })
      .valueChanges
  }

  getAllContributeModulesByDNI(dni: string) {
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
      fetchPolicy: "network-only",
      variables: {
        dni: dni
      }
    })
      .valueChanges
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
      fetchPolicy: "network-only",
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
      fetchPolicy: "network-only",
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
      fetchPolicy: "network-only",
    })
      .valueChanges
  }

  addModule(cod: number, moduleName: string) {
    const createModule = gql`
    mutation createModule($cod: ID!, $moduleName: String!){
      createModule(cod: $cod, moduleName: $moduleName){
        cod,
        moduleName
      }
    }
  `;
    return this.apollo.mutate<any>({
      mutation: createModule,
      variables: {
        moduleName: moduleName,
        cod: cod,
      }
    });
  }

  getModule(cod: number) {
    const getModule = gql`
    query getModule($cod: ID!) {
      getModule(cod: $cod) { 
        cod,
        moduleName
      }
    }
    `;
    return this.apollo.watchQuery<any>({
      query: getModule,
      fetchPolicy: "network-only",
      variables: {
        cod: cod
      }
    })
      .valueChanges
  }

  addContributeModule(cod: number) {
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

  deleteModule(cod: number) {
    const deleteModule = gql`
    mutation deleteModule($cod: ID!){
      deleteModule(cod: $cod)
    }
  `;
    return this.apollo.mutate({
      mutation: deleteModule,
      variables: {
        cod: cod
      }
    });
  }

  updateModule(cod: number, moduleName: string) {
    const updateModule = gql`
    mutation updateModule($cod: ID!, $moduleName: String!){
      updateModule(cod: $cod, moduleName: $moduleName)
    }
  `;
    return this.apollo.mutate({
      mutation: updateModule,
      variables: {
        cod: cod,
        moduleName: moduleName
      }
    });
  }

  addValidateModule(cod: number) {
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
      fetchPolicy: "network-only",
      variables: {
        username: this.graphql.User.username
      }
    })
      .valueChanges;
  }

  getValidation(dni: string) {
    const getValidation = gql`
    query getValidation($dni: ID!){
      getValidation(dni: $dni){
        dni,
	      studentName,
	      firstSurname,
	      secondSurname,
	      dateOfBirth,
	      telephone,
	      cycle,
	      group,
	      shift,
	      course
    }
    }
    `;

    return this.apollo.watchQuery<any>({
      query: getValidation,
      fetchPolicy: "network-only",
      variables: {
        dni: dni
      }
    })
      .valueChanges
  }
}


