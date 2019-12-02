package com.koncana.validation.entity.resolver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.koncana.validation.entity.models.Users;
import com.koncana.validation.entity.services.UserServiceImpl;

@Component
public class UserMutation implements GraphQLMutationResolver {

	@Autowired
	private UserServiceImpl userService;

	public Users createUser(final String username, final String password, final String role, final String dni) {
		return this.userService.createUser(username, password, role, dni);
	}

	public boolean deleteUser(String username) {
		return this.userService.deleteUser(username);
	}

	public boolean updateUser(final String oldUsername, final String newUsername, final String password, final String role, final String dni) {
		return this.userService.updateUser(oldUsername, newUsername,password, role, dni);
	}

	public boolean saveStudentOnUser(final String username, final String dni) {
		return this.userService.saveStudentOnUser(username, dni);
	}

	public boolean deleteStudentOnUser(final String username) {
		return this.userService.deleteStudentOnUser(username);
	}

}
