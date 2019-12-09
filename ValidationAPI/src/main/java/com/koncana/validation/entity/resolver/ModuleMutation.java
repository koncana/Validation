package com.koncana.validation.entity.resolver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.koncana.validation.entity.models.Modules;
import com.koncana.validation.entity.services.ModuleServiceImpl;

@Component
public class ModuleMutation implements GraphQLMutationResolver {
	
	@Autowired
	private ModuleServiceImpl moduleService;

	public Modules createModule(final int cod, final String moduleName) {
		return moduleService.createModule(cod, moduleName);
	}
	
	public boolean updateModuleAll(final int oldCod, final int newCod, final String moduleName) {
		return moduleService.updateModuleAll(oldCod, newCod, moduleName);
	}
	
	public boolean updateModule(final int cod, final String moduleName) {
		return moduleService.updateModule(cod, moduleName);
	}

	public boolean deleteModule(final int cod) {
		return moduleService.deleteModule(cod);
	}
	
}
