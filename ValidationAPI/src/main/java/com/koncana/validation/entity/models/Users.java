package com.koncana.validation.entity.models;

import java.io.Serializable;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
@Entity
@Table(schema="validation", name = "user")
public class Users implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(nullable = false)
	private String username;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private String role;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "student_dni", referencedColumnName = "dni")
	private Student student;

	public Users() {
	}

	public Users(String username, String password, String role) {
		super();
		this.username = username;
		this.password = password;
		this.role = "ROLE_" + role.toUpperCase();
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setOldRole(String role) {
		this.role = role;
	}
	
	public void setRole(String role) {
		this.role = "ROLE_" + role.toUpperCase();
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}	
}
