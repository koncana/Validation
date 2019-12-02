package com.koncana.validation.entity.models;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
@Entity
@Table(schema = "validation", name = "module")
public class Modules implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(nullable = false)
	private int cod;

	@Column(name = "module_name", nullable = false)
	private String moduleName;

	@JsonIgnore
	@ManyToMany(mappedBy = "belongedModules")
	private Set<Student> belong = new HashSet<Student>();

	public Modules() {
	}

	public Modules(int cod, String moduleName) {
		super();
		this.cod = cod;
		this.moduleName = moduleName;
	}

	public int getCod() {
		return cod;
	}

	public void setCod(int cod) {
		this.cod = cod;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
}
