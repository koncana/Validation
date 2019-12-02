package com.koncana.validation.entity.resolver;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.koncana.validation.entity.models.Modules;
import com.koncana.validation.entity.services.ModuleServiceImpl;


@Component
public class ModuleQuery implements GraphQLQueryResolver {
	@Autowired
	private ModuleServiceImpl moduleService;

	public List<Modules> getAllModules() {
		return this.moduleService.getAllModules();
	}

	public Optional<Modules> getModule(final int cod) {
		return this.moduleService.getModule(cod);
	}
	
}
