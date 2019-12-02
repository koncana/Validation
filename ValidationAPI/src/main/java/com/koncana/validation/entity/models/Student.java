package com.koncana.validation.entity.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@EqualsAndHashCode
@Entity
@Table(schema="validation", name = "student")
public class Student implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(nullable = false)
	private String dni;

	@Column(name = "student_name", nullable = false)
	private String studentName;

	@Column(name = "first_surname", nullable = false)
	private String firstSurname;

	@Column(name = "second_surname")
	private String secondSurname;

	@Column(name = "date_of_birth", nullable = false)
	private Date dateOfBirth;
	
	@Column(nullable = false)
	private int telephone;
	
	@Column(nullable = false)
	private String cycle;
	
	@Column(name="student_group", nullable = false)
	private String group;

	@Column(nullable = false)
	private String shift;
	
	@Column(nullable = false)
	private String course;
	
	@ManyToMany
	@JoinTable(schema="validation", name = "contribute", joinColumns = @JoinColumn(name = "student_dni"), inverseJoinColumns = @JoinColumn(name = "contribute_cod"))
	private Set<Modules> belongedModules = new HashSet<Modules>();
	
	@OneToOne(mappedBy = "student")
    private Users user;
	
	public Student() {
	}

	public Student(String dni, String studentName, String firstSurname, String secondSurname, Date dateOfBirth,
			int telephone, String cycle, String shift, String group, String course, Set<Modules> belongedModules, Users user) {
		super();
		this.dni = dni;
		this.studentName = studentName;
		this.firstSurname = firstSurname;
		this.secondSurname = secondSurname;
		this.dateOfBirth = dateOfBirth;
		this.telephone = telephone;
		this.cycle = cycle;
		this.group = group;
		this.shift = shift;
		this.course = course;
		this.belongedModules = belongedModules;
		this.user = user;
	}
	
	public void setStudent(Student student) {
		setDni(dni);
		setStudentName(student.getStudentName());
		setFirstSurname(student.getFirstSurname());
		setSecondSurname(student.getSecondSurname());
		setDateOfBirth(student.getDateOfBirth());
		setTelephone(student.getTelephone());
		setCycle(student.getCycle());
		setShift(student.getShift());
		setGroup(student.getGroup());
		setCourse(student.getCourse());
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getFirstSurname() {
		return firstSurname;
	}

	public void setFirstSurname(String firstSurname) {
		this.firstSurname = firstSurname;
	}

	public String getSecondSurname() {
		return secondSurname;
	}

	public void setSecondSurname(String secondSurname) {
		this.secondSurname = secondSurname;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getStudentName() {
		return studentName;
	}
	
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public Set<Modules> getBelongedModules() {
		return belongedModules;
	}

	public void setBelongedModules(Set<Modules> belongedModules) {
		this.belongedModules = belongedModules;
	}

	public int getTelephone() {
		return telephone;
	}

	public void setTelephone(int telephone) {
		this.telephone = telephone;
	}

	public String getCycle() {
		return cycle;
	}

	public void setCycle(String cycle) {
		this.cycle = cycle;
	}

	public String getShift() {
		return shift;
	}

	public void setShift(String shift) {
		this.shift = shift;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public String getCourse() {
		return course;
	}

	public void setCourse(String course) {
		this.course = course;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}
	
}
