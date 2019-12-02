package com.koncana.validation.entity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.koncana.validation.entity.models.Modules;
import com.koncana.validation.entity.models.Student;


public interface IStudentRepository extends CrudRepository<Student, String>{
	
	@Query("SELECT s.belongedModules FROM Student s WHERE s.dni = :dni")
	public List<Modules> findAllModulesFromStudent(@Param("dni") String dni);
}
