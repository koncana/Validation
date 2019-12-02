package com.koncana.validation.entity.services;

import java.util.List;
import java.util.Optional;

import com.koncana.validation.entity.models.Student;
import com.koncana.validation.entity.models.Users;

public interface IUserService {
	
	public Users createUser(final String username, final String password, final String role, final String dni);
	
	public boolean deleteUser(String username);
	
	public List<Users> getUsers();
	
	public Optional<Users> getUser(final String dni);
	
	public boolean updateUser(final String oldUsername, final String newUsername, final String password, final String role, final String dni);
	
	public boolean saveStudentOnUser(final String username, final String dni);
	
	public boolean deleteStudentOnUser(final String username);
	
	public Student getStudentFromUser(final String username);
}
