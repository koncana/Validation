package com.koncana.validation.entity.repository;

import org.springframework.data.repository.CrudRepository;

import com.koncana.validation.entity.models.Users;

public interface IUserRepository extends CrudRepository<Users, String> {
	
	public Users findUserByUsername(String username);

}
