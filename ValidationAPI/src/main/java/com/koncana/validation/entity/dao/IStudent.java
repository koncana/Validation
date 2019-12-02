package com.koncana.validation.entity.dao;


import org.springframework.data.repository.CrudRepository;

import com.koncana.validation.entity.models.Student;

public interface IStudent extends CrudRepository<Student, Long> {

	//Student findByDni(String dni);
	
//	@Query("SELECT s.belongedModules FROM ModuleValidate s WHERE s.cod = :cod")
//	public List<ModuleValidate> findAllModules(@Param("cod") long cod);
}
