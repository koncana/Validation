package com.koncana.validation.entity.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.koncana.validation.entity.models.Modules;
import com.koncana.validation.entity.repository.IModuleRepository;

@Service
public class ModuleServiceImpl implements IModuleService {
	
	@Autowired
	private IModuleRepository moduleRepository;

	@Override
	@Transactional
	@PreAuthorize("hasRole('ADMIN')")
	public Modules createModule(final int toValidateCod, final String moduleName) {
		final Modules module = new Modules();
		module.setCod(toValidateCod);
		module.setModuleName(moduleName);
		return this.moduleRepository.save(module);
	}

	@Override
	@Transactional
	@PreAuthorize("hasRole('ADMIN')")
	public boolean updateModule(final int oldCod, final int newCod, final String moduleName) {
		moduleRepository.findById(oldCod).ifPresent((x) -> {
			final Modules module = new Modules();
			moduleRepository.deleteById(oldCod);
			module.setCod(newCod);
			module.setModuleName(moduleName);
			this.moduleRepository.save(module);
		});
		return true;
	}

	@Override
	@Transactional
	@PreAuthorize("hasRole('ADMIN', 'USER')")
	public void deleteModule(int cod) {
		this.moduleRepository.deleteById(cod);
	}

	@Override
	@Transactional(readOnly = true)
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public List<Modules> getAllModules() {
		return (List<Modules>) this.moduleRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Optional<Modules> getModule(final int cod) {
		return this.moduleRepository.findById(cod);
	}
}
