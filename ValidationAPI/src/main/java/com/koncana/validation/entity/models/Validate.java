package com.koncana.validation.entity.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import com.koncana.validation.entity.models.Modules;
import com.koncana.validation.entity.models.Student;
import com.koncana.validation.entity.models.ValidateKey;

@Data
@EqualsAndHashCode
@Entity
@Table(schema = "validation", name = "validate")
public class Validate implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	private ValidateKey validateId;

	@ManyToOne
	@MapsId("student_dni")
	@JoinColumn(name="student_dni", nullable = false)
	private Student student;

	@ManyToOne
	@MapsId("module_cod")
	@JoinColumn(name="module_cod", nullable = false)
	private Modules module;

	@Column
	private String status;
	
	public Validate() {
		
	}
	
	public Validate(ValidateKey validateId, Student dni, Modules module, String status) {
		super();
		this.validateId = validateId;
		this.student = dni;
		this.module = module;
		this.status = status;
	}


	public Student getStudent() {
		return student;
	}

	public void setStudent(Student dni) {
		this.student = dni;
	}

	public Modules getModule() {
		return module;
	}

	public void setModule(Modules module) {
		this.module = module;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public ValidateKey getValidateId() {
		return validateId;
	}

	public void setValidateId(ValidateKey validateId) {
		this.validateId = validateId;
	}
}
