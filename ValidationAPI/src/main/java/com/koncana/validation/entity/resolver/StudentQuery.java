package com.koncana.validation.entity.resolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

import com.koncana.validation.entity.models.Modules;
import com.koncana.validation.entity.models.Student;
import com.koncana.validation.entity.services.StudentServiceImpl;

@Component
public class StudentQuery implements GraphQLQueryResolver {

	@Autowired
	private StudentServiceImpl studentService;

	public List<Student> getStudents() {
		return this.studentService.getStudents();
	}

	public Optional<Student> getStudent(final String dni) {
		return this.studentService.getStudent(dni);
	}
	
	public List<Modules> getModulesFromStudent(final String dni){
		return this.studentService.getModulesFromStudent(dni);
	}
}
