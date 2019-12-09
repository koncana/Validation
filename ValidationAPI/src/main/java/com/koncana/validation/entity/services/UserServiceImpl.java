package com.koncana.validation.entity.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.koncana.validation.entity.models.Student;
import com.koncana.validation.entity.models.Users;
import com.koncana.validation.entity.repository.IStudentRepository;
import com.koncana.validation.entity.repository.IUserRepository;

@Service
public class UserServiceImpl implements IUserService {

	private Student student = null;

	@Autowired
	private IUserRepository userRepository;

	@Autowired
	private IStudentRepository studentRepository;

	@Override
	@Transactional
	public Users createUser(final String username, final String password, final String role, final String dni) {
		final Users user = new Users();
		user.setUsername(username);
		user.setPassword(passwordEncoder(password));
		if (role.isEmpty()) {
			user.setRole("user");
		} else {
			user.setRole(role);
		}
		if (dni.isEmpty()) {
			user.setStudent(null);
		} else {

			studentRepository.findById(dni).ifPresent((student) -> {
				user.setStudent(student);
			});
		}
		return this.userRepository.save(user);
	}

	@Override
	@Transactional
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public boolean deleteUser(String username) {
		this.userRepository.deleteById(username);
		return true;
	}

	@Override
	@Transactional(readOnly = true)
	@PreAuthorize("hasAnyRole('ADMIN')")
	public List<Users> getUsers() {
		return (List<Users>) this.userRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Optional<Users> getUser(final String username) {
		return this.userRepository.findById(username);
	}

	@Override
	@Transactional
	public boolean updateUser(final String username, final String password, final String role, final String dni) {
		userRepository.findById(username).ifPresent((user) -> {
			if (password.isEmpty()) {
				user.setPassword(user.getPassword());
			} else {
				user.setPassword(passwordEncoder(password));
			}
			if (role.isEmpty()) {
				user.setOldRole(user.getRole());
			} else {
				user.setRole(role);
			}
			if (!dni.isEmpty()) {
				studentRepository.findById(dni).ifPresent((student) -> {
					user.setStudent(student);
				});
			}
			if (dni.equals(" ")) {
				user.setStudent(null);
			}

			userRepository.save(user);
		});
		return true;
	}

	@Override
	@Transactional
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public boolean updateUserAll(final String oldUsername, final String newUsername, final String password,
			final String role, final String dni) {
		userRepository.findById(oldUsername).ifPresent((oldUser) -> {
			String oldRole = oldUser.getRole();
			String oldPassword = oldUser.getPassword();
			Student oldStudent = oldUser.getStudent();
			userRepository.deleteById(oldUsername);
			final Users user = new Users();
			user.setUsername(newUsername);
			if (password.isEmpty()) {
				user.setPassword(oldPassword);
			} else {
				user.setPassword(passwordEncoder(password));
			}
			if (role.isEmpty()) {
				user.setOldRole(oldRole);
			} else {
				user.setRole(role);
			}
			if (dni.isEmpty()) {
				studentRepository.findById(oldStudent.getDni()).ifPresent((student) -> {
					user.setStudent(student);
				});
			} else {
				studentRepository.findById(dni).ifPresent((student) -> {
					user.setStudent(student);
				});
			}
			userRepository.save(user);
		});
		return true;
	}

	@Override
	@Transactional
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public boolean saveStudentOnUser(final String username, final String dni) {
		userRepository.findById(username).ifPresent((userFound) -> {
			studentRepository.findById(dni).ifPresent((studentFound) -> {
				userFound.setStudent(studentFound);
				userRepository.save(userFound);
			});
		});
		return true;
	}

	@Override
	@Transactional
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public boolean deleteStudentOnUser(final String username) {
		userRepository.findById(username).ifPresent((userFound) -> {
			userFound.setStudent(null);
			userRepository.save(userFound);

		});
		return true;
	}

	@Override
	@Transactional
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Student getStudentFromUser(final String username) {
		userRepository.findById(username).ifPresent((userFound) -> {
			this.student = userFound.getStudent();
		});
		return this.student;
	}

	private String passwordEncoder(String password) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		return passwordEncoder.encode(password);
	}

}
