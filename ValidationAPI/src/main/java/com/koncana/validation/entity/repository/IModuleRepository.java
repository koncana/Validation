package com.koncana.validation.entity.repository;

import org.springframework.data.repository.CrudRepository;
import com.koncana.validation.entity.models.Modules;

public interface IModuleRepository extends CrudRepository<Modules, Integer>{
	
}
