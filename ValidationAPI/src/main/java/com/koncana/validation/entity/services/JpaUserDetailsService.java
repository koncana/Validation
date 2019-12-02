	package com.koncana.validation.entity.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.koncana.validation.entity.repository.IUserRepository;
import com.koncana.validation.entity.models.Users;

@Service("JpaUserDetailsService")
public class JpaUserDetailsService implements UserDetailsService {

	@Autowired
	private IUserRepository userRepository;

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Users user = userRepository.findUserByUsername(username);

		if (user == null) {
			throw new UsernameNotFoundException("User " + username + " doesn't exist");
		}

		List<GrantedAuthority> authorities = new ArrayList<>();

		if (user.getRole() != null) {
			authorities.add(new SimpleGrantedAuthority(user.getRole()));
		}

		return new User(user.getUsername(), user.getPassword(), true, true, true, true, authorities);
	}
}
