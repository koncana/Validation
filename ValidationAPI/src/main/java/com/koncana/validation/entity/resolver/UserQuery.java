package com.koncana.validation.entity.resolver;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.koncana.validation.entity.models.Student;
import com.koncana.validation.entity.models.Users;
import com.koncana.validation.entity.services.UserServiceImpl;

@Component
public class UserQuery implements GraphQLQueryResolver {

	@Autowired
	private UserServiceImpl userService;

	public List<Users> getUsers() {
		return this.userService.getUsers();
	}

	public Optional<Users> getUser(final String username) {
		return this.userService.getUser(username);
	}

	public Student getStudentFromUser(final String username) {
		return this.userService.getStudentFromUser(username);
	}
}
