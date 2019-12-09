package com.koncana.validation.entity.services;

import java.util.List;
import java.util.Optional;

import com.koncana.validation.entity.models.Modules;
import com.koncana.validation.entity.models.Student;

public interface IStudentService {

	public Student createStudent(final String dni, final String studentName, final String firstSurname,
			final String secondSurname, final String dateOfBirth, final int telephone, final String cycle,
			final String shift, final String group, final String course);

	public boolean updateStudentAll(final String oldDni, final String newDni, final String studentName,
			final String firstSurname, final String secondSurname, final String dateOfBirth, final int telephone,
			final String cycle, final String shift, final String group, final String course);

	public void deleteStudent(final String dni);

	public List<Student> getStudents();

	public Optional<Student> getStudent(final String dni);

	public boolean saveModuleOnStudent(int cod, String dni);

	public List<Modules> getModulesFromStudent(final String dni);

	public boolean deleteModuleOnStudent(final int cod, final String dni);
	
	public boolean updateStudent(final String dni, final String studentName, final String firstSurname,
			final String secondSurname, final String dateOfBirth, final int telephone, final String cycle,
			final String shift, final String group, final String course);
}
