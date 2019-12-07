package com.koncana.validation.entity.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.koncana.validation.entity.models.Modules;
import com.koncana.validation.entity.models.Student;
import com.koncana.validation.entity.repository.IModuleRepository;
import com.koncana.validation.entity.repository.IStudentRepository;

@Service
public class StudentServiceImpl implements IStudentService {

	@Autowired
	private IStudentRepository studentRepository;

	@Autowired
	private IModuleRepository moduleRepository;

	@Override
	@Transactional
	public Student createStudent(final String dni, final String studentName, final String firstSurname,
			final String secondSurname, final String dateOfBirth, final int telephone, final String cycle, final String shift, final String group, final String course) {
		final Student student = new Student();
		student.setDni(dni);
		student.setStudentName(studentName);
		student.setFirstSurname(firstSurname);
		student.setSecondSurname(secondSurname);
		try {
			Date date = new SimpleDateFormat("yyyy-MM-dd").parse(dateOfBirth);
			student.setDateOfBirth(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		student.setTelephone(telephone);
		student.setCycle(cycle);
		student.setShift(shift);
		student.setGroup(group);
		student.setCourse(course);
		return this.studentRepository.save(student);
	}

	@Override
	@Transactional
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public boolean updateStudent(final String oldDni, final String newDni, final String studentName,
			final String firstSurname, final String secondSurname, final String dateOfBirth) {
		studentRepository.findById(oldDni).ifPresent((x) -> {
			final Student student = new Student();
			studentRepository.deleteById(oldDni);
			student.setDni(newDni);
			student.setStudentName(studentName);
			student.setFirstSurname(firstSurname);
			student.setSecondSurname(secondSurname);
			try {
				Date date = new SimpleDateFormat("yyyy-MM-dd").parse(dateOfBirth);
				student.setDateOfBirth(date);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			this.studentRepository.save(student);
		});
		return true;
	}

	@Override
	@Transactional
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public void deleteStudent(final String dni) {
		this.studentRepository.deleteById(dni);
	}

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@Transactional(readOnly = true)
	public List<Student> getStudents() {
		return (List<Student>) this.studentRepository.findAll();
	}

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@Transactional(readOnly = true)
	public Optional<Student> getStudent(final String dni) {
		return this.studentRepository.findById(dni);
	}

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@Transactional
	public boolean saveModuleOnStudent(final int cod, final String dni) {
		moduleRepository.findById(cod).ifPresent((moduleFound) -> {
			studentRepository.findById(dni).ifPresent((studentFound) -> {
				studentFound.getBelongedModules().add(moduleFound);
				studentRepository.save(studentFound);
			});
		});
		return true;
	}

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@Transactional
	public List<Modules> getModulesFromStudent(final String dni) {
		return studentRepository.findAllModulesFromStudent(dni);
	}

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@Transactional
	public boolean deleteModuleOnStudent(final int cod, final String dni) {
		moduleRepository.findById(cod).ifPresent((moduleFound) -> {
			studentRepository.findById(dni).ifPresent((studentFound) -> {
				studentFound.getBelongedModules().remove(moduleFound);
				studentRepository.save(studentFound);
			});
		});
		return true;	
	}
}
