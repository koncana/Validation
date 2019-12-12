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
			final String secondSurname, final String dateOfBirth, final int telephone, final String cycle,
			final String shift, final String group, final String course) {
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
	public boolean updateStudentAll(final String oldDni, final String newDni, final String studentName,
			final String firstSurname, final String secondSurname, final String dateOfBirth, final int telephone,
			final String cycle, final String shift, final String group, final String course) {
		studentRepository.findById(oldDni).ifPresent((x) -> {
			String oldStudentName = x.getStudentName();
			String oldFirstSurname = x.getFirstSurname();
			String oldSecondSurname = x.getSecondSurname();
			Date oldDateOfBirth = x.getDateOfBirth();
			int oldTelephone = x.getTelephone();
			String oldCycle = x.getCycle();
			String oldShift = x.getGroup();
			String oldGroup = x.getGroup();
			String oldCourse = x.getCourse();
			studentRepository.deleteById(oldDni);
			final Student student = new Student();
			student.setDni(newDni);
			if (studentName.isEmpty()) {
				student.setStudentName(oldStudentName);
			} else {
				student.setStudentName(studentName);
			}
			if (firstSurname.isEmpty()) {
				student.setFirstSurname(oldFirstSurname);
			} else {
				student.setFirstSurname(firstSurname);
			}
			if (secondSurname.isEmpty()) {
				student.setSecondSurname(oldSecondSurname);
			} else {
				student.setSecondSurname(secondSurname);
			}
			if (dateOfBirth.isEmpty()) {
				student.setDateOfBirth(oldDateOfBirth);
			} else {
				try {
					Date date = new SimpleDateFormat("yyyy-MM-dd").parse(dateOfBirth);
					student.setDateOfBirth(date);
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			if (telephone == 0) {
				student.setTelephone(oldTelephone);
			} else {
				student.setTelephone(telephone);
			}
			if (cycle.isEmpty()) {
				student.setCycle(oldCycle);
			} else {
				student.setCycle(cycle);
			}
			if (shift.isEmpty()) {
				student.setShift(oldShift);
			} else {
				student.setShift(shift);
			}
			if (group.isEmpty()) {
				student.setGroup(oldGroup);
			} else {
				student.setGroup(group);
			}
			if (course.isEmpty()) {
				student.setCourse(oldCourse);
			} else {
				student.setCourse(course);
			}
			studentRepository.save(student);
		});
		return true;
	}

	@Override
	@Transactional
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public boolean updateStudent(final String dni, final String studentName, final String firstSurname,
			final String secondSurname, final String dateOfBirth, final int telephone, final String cycle,
			final String shift, final String group, final String course) {
		studentRepository.findById(dni).ifPresent((student) -> {
			if (studentName.isEmpty()) {
				student.setStudentName(student.getStudentName());
			} else {
				student.setStudentName(studentName);
			}
			if (firstSurname.isEmpty()) {
				student.setFirstSurname(student.getFirstSurname());
			} else {
				student.setFirstSurname(firstSurname);
			}
			if (secondSurname.isEmpty()) {
				student.setSecondSurname(student.getSecondSurname());
			} else {
				student.setSecondSurname(secondSurname);
			}
			if (dateOfBirth.isEmpty()) {
				student.setDateOfBirth(student.getDateOfBirth());
			} else {
				try {
					Date date = new SimpleDateFormat("yyyy-MM-dd").parse(dateOfBirth);
					student.setDateOfBirth(date);
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			if (telephone == 0) {
				student.setTelephone(student.getTelephone());
			} else {
				student.setTelephone(telephone);
			}
			if (cycle.isEmpty()) {
				student.setCycle(student.getCycle());
			} else {
				student.setCycle(cycle);
			}
			if (shift.isEmpty()) {
				student.setShift(student.getShift());
			} else {
				student.setShift(shift);
			}
			if (group.isEmpty()) {
				student.setGroup(student.getGroup());
			} else {
				student.setGroup(group);
			}
			if (course.isEmpty()) {
				student.setCourse(student.getCourse());
			} else {
				student.setCourse(course);
			}
			studentRepository.save(student);
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
