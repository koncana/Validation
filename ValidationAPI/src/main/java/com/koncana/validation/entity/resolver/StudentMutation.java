package com.koncana.validation.entity.resolver;

import com.koncana.validation.entity.models.Student;
import com.koncana.validation.entity.services.StudentServiceImpl;


import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StudentMutation implements GraphQLMutationResolver {

	@Autowired
	private StudentServiceImpl studentService;

	public Student createStudent(final String dni, final String studentName, final String firstSurname,
			final String secondSurname, final String dateOfBirth, final int telephone, final String cycle, final String shift, final String group, final String course) {
		return studentService.createStudent(dni, studentName, firstSurname, secondSurname, dateOfBirth, telephone, cycle, shift, group, course);
	}
	
	public boolean updateStudent(final String oldDni, final String newDni, final String studentName, final String firstSurname,
			final String secondSurname, final String dateOfBirth) {
		return studentService.updateStudent(oldDni, newDni, studentName, firstSurname, secondSurname, dateOfBirth);
	}

	public boolean deleteStudent(final String dni) {
		studentService.deleteStudent(dni);
		return true;
	}
	
	public boolean saveModuleOnStudent(final int cod, final String dni) {
		return studentService.saveModuleOnStudent(cod, dni);	
	}
	
	public boolean deleteModuleOnStudent(final int cod, final String dni) {
		return studentService.deleteModuleOnStudent(cod, dni);
	}
}
