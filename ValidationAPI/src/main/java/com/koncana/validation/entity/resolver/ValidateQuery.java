package com.koncana.validation.entity.resolver;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.koncana.validation.entity.models.Modules;
import com.koncana.validation.entity.models.Student;
import com.koncana.validation.entity.models.Validate;
import com.koncana.validation.entity.services.ValidateServiceImpl;

@Component
public class ValidateQuery implements GraphQLQueryResolver{
	
	@Autowired
	private ValidateServiceImpl validateService;
	
	public List<Validate> getAllModulesToValidate(final String dni) {
		Student student = new Student();
		student.setDni(dni);
		return this.validateService.getAllModulesToValidate(student);
	}
	
	public List<Student> getAllValidations() {
		return this.validateService.getAllValidations();
	}

	public Validate getModuleToValidate(final String studentDni, final int cod) {
		Student student = new Student();
		student.setDni(studentDni);
		Modules module = new Modules();
		module.setCod(cod);
		return this.validateService.getModuleToValidate(student, module);
	}
	
	public Student getValidation(final String dni) {
		return this.validateService.getValidation(dni);
	}
}
