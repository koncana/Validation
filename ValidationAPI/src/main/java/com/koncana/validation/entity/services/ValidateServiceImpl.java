package com.koncana.validation.entity.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.koncana.validation.entity.models.Modules;
import com.koncana.validation.entity.models.Student;
import com.koncana.validation.entity.models.Validate;
import com.koncana.validation.entity.models.ValidateKey;
import com.koncana.validation.entity.repository.IModuleRepository;
import com.koncana.validation.entity.repository.IStudentRepository;
import com.koncana.validation.entity.repository.IValidateRepository;

@Service
public class ValidateServiceImpl implements IValidateService {

	@Autowired
	private IValidateRepository validateRepository;

	@Autowired
	private IStudentRepository studentRepository;

	@Autowired
	private IModuleRepository moduleRepository;

	@Override
	@Transactional(readOnly = true)
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public List<Validate> getAllModulesToValidate(final Student student) {
		return this.validateRepository.findByStudent(student);
	}

	@Override
	@Transactional(readOnly = true)
	@PreAuthorize("hasRole('ADMIN')")
	public List<Validate> getAllValidations() {
		return (List<Validate>) this.validateRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Validate getModuleToValidate(final Student student, final Modules module) {
		return this.validateRepository.findByStudentAndModule(student, module);
	}

	@Override
	@Transactional
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public boolean createValidate(final String dni, final int cod) {
		studentRepository.findById(dni).ifPresent((studentFound) -> {
			moduleRepository.findById(cod).ifPresent((moduleFound) -> {
				final ValidateKey validateKey = new ValidateKey();
				validateKey.setDni(dni);
				validateKey.setCod(cod);
				final Validate validate = new Validate();
				validate.setValidateId(validateKey);
				validate.setStudent(studentFound);
				validate.setModule(moduleFound);
				validate.setStatus("");
				this.validateRepository.save(validate);
			});
		});
		return true;
	}

	@Override
	@Transactional
	@PreAuthorize("hasAnyRole('ADMIN')")
	public Optional<Validate> updateValidate(final String dni, final int cod, final String status) {
		final ValidateKey validateKey = new ValidateKey();
		validateKey.setCod(cod);
		validateKey.setDni(dni);
		Optional<Validate> validate  = validateRepository.findById(validateKey);
		validate.ifPresent((validateFound) -> {
			validateFound.setStatus(status);
			this.validateRepository.save(validateFound);

		});
		return validate;
	}

	@Override
	@Transactional
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public boolean deleteValidate(final String dni, final int cod) {
		final ValidateKey validateKey = new ValidateKey();
		validateKey.setCod(cod);
		validateKey.setDni(dni);
		validateRepository.findById(validateKey).ifPresent((validateFound) -> {
			validateRepository.deleteById(validateKey);
		});
		return true;
	}

	@Override
	@Transactional
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public boolean deleteValidateByStudent(final String dni) {
		final Student student = new Student();
		student.setDni(dni);
		final List<Validate> validate = validateRepository.findByStudent(student);
		if (!validate.isEmpty()) {
			validateRepository.deleteAll(validate);
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public boolean deleteValidateByModule(final int cod) {
		final Modules module = new Modules();
		module.setCod(cod);
		final List<Validate> validate = validateRepository.findByModule(module);
		if (!validate.isEmpty()) {
			validateRepository.deleteAll(validate);
			return true;
		} else {
			return false;
		}
	}

}
