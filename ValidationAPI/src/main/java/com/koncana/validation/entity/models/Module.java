package com.koncana.validation.entity.models;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "ModuleValidate")
public class Module implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column
	private int cod;

	@JsonIgnore
	@ManyToMany(mappedBy = "belongedModules")
	private Set<Student> belong = new HashSet<Student>();

	@Column
	@NotEmpty
	private String name;

	public Module() {
	}

	public Module(int cod, Set<Student> belong, @NotEmpty String name) {
		super();
		this.cod = cod;
		this.belong = belong;
		this.name = name;
	}

	public long getCod() {
		return cod;
	}

	public void setCod(int cod) {
		this.cod = cod;
	}

	public Set<Student> getBelong() {
		return belong;
	}

	public void setBelong(Set<Student> belong) {
		this.belong = belong;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
