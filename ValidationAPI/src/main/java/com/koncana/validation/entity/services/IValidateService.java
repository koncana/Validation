package com.koncana.validation.entity.services;

import java.util.List;
import java.util.Optional;

import com.koncana.validation.entity.models.Modules;
import com.koncana.validation.entity.models.Student;
import com.koncana.validation.entity.models.Validate;

public interface IValidateService {
	
	public List<Validate> getAllModulesToValidate(final Student student);
	
	public List<Validate> getAllValidations();
	
	public Validate getModuleToValidate(final Student student, final Modules module);

	public boolean createValidate(final String dni, final int cod);
	
	public Optional<Validate> updateValidate(final String dni, final int cod, final String validated);
	
	public boolean deleteValidate(final String dni, final int cod);
	
	public boolean deleteValidateByStudent(final String dni);
	
	public boolean deleteValidateByModule(final int cod);
}
