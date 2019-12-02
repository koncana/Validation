package com.koncana.validation.entity.resolver;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.koncana.validation.entity.dao.IStudent;
import com.koncana.validation.entity.models.Student;

import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.Optional;

@Component
public class Mutation implements GraphQLMutationResolver {

	@Autowired
	private IStudent studentRepository;

//	public Mutation(IStudent studentRepository) {
//		this.studentRepository = studentRepository;
//	}

	public Student newStudent(long dni, String name, String surname1, String surname2, Date date_of_birth) {
		Student student = new Student();
		student.setDni(dni);
		student.setName(name);
		student.setSurname1(surname1);
		student.setSurname2(surname2);
		student.setDate_of_birth(date_of_birth);

		studentRepository.save(student);

		return student;
	}

	public Optional<Student> updateStudent(long dni, String name, String surname1, String surname2, Date date_of_birth) {
		Optional<Student> student = studentRepository.findById(dni);

		student.ifPresent(a -> {
			a.setName(name);
			a.setSurname1(surname1);
			a.setSurname2(surname2);
			a.setDate_of_birth(date_of_birth);
			studentRepository.save(a);
		});

		return student;
	}

	public boolean deleteStudent(long dni) {
		studentRepository.deleteById(dni);
		return true;
	}
}