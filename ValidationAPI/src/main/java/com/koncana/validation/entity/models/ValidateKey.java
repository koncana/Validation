package com.koncana.validation.entity.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.EqualsAndHashCode;

@EqualsAndHashCode
@Embeddable
public class ValidateKey implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Column(name="student_dni")
	private String dni;
	
	@Column(name="module_cod")
	private int cod;
	
	public ValidateKey() {}
	
	public ValidateKey(String dni, int cod) {
		super();
		this.dni = dni;
		this.cod = cod;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public int getCod() {
		return cod;
	}

	public void setCod(int cod) {
		this.cod = cod;
	}
}
