package com.koncana.validation.entity.resolver;

import com.coxautodev.graphql.tools.GraphQLResolver;
import com.koncana.validation.entity.dao.IStudent;
import com.koncana.validation.entity.models.Student;

import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class Query implements GraphQLResolver<Object> {

	private IStudent studentRepository;

//	public Query(IStudent studentRepository) {
//		this.studentRepository = studentRepository;
//	}

	public Optional<Student> student(Long dni) {
		return studentRepository.findById(dni);
	}

	public Iterable<Student> findAllStudents() {
		return studentRepository.findAll();
	}
}