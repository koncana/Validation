package com.koncana.validation.entity.services;

import java.util.List;
import java.util.Optional;

import com.koncana.validation.entity.models.Modules;

public interface IModuleService {
	
	public Modules createModule(final int cod, final String studentName);
	
	public boolean deleteModule(final int cod);
	
	public List<Modules> getAllModules();
	
	public Optional<Modules> getModule(final int cod);
	
	public boolean updateModuleAll(final int oldCod, final int newCod, final String moduleName);
	
	public boolean updateModule(final int cod, final String moduleName);
	
}
