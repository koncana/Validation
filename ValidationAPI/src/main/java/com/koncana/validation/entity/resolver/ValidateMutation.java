package com.koncana.validation.entity.resolver;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.koncana.validation.entity.models.Validate;
import com.koncana.validation.entity.services.ValidateServiceImpl;

@Component
public class ValidateMutation implements GraphQLMutationResolver {
	
	@Autowired
	private ValidateServiceImpl validateService;
	
	public boolean createValidate(final String dni, final int cod) {
		return this.validateService.createValidate(dni, cod);
	}

	public Optional<Validate> updateValidate(final String dni, final int cod, final String status) {
		return this.validateService.updateValidate(dni, cod, status);
	}
	
	public boolean deleteValidate(final String dni, final int cod) {
		return this.validateService.deleteValidate(dni, cod);
	}
	
	public boolean deleteValidateByStudent(final String dni) {
		return this.validateService.deleteValidateByStudent(dni);
	}
	
	public boolean deleteValidateByModule(final int cod) {
		return this.validateService.deleteValidateByModule(cod);
	}
}
