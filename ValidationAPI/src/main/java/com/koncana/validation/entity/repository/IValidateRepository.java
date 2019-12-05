package com.koncana.validation.entity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.koncana.validation.entity.models.Modules;
import com.koncana.validation.entity.models.Validate;
import com.koncana.validation.entity.models.Student;
import com.koncana.validation.entity.models.ValidateKey;

public interface IValidateRepository extends CrudRepository<Validate, ValidateKey> {

	public List<Validate> findByStudent(Student student);
	
	public List<Validate> findByModule(Modules module);
	
	public Validate findByStudentAndModule(Student student, Modules module);
	
	@Query("SELECT DISTINCT s FROM Student s INNER JOIN Validate v ON s.dni=v.student")
	public List<Student> findAllValidations();
	
	@Query("SELECT DISTINCT s FROM Student s where s.dni=dni")
	public Student findValidation(@Param("dni") String dni);
}
