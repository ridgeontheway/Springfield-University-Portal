package com.coolGroup.org.models;

import javax.persistence.*;

@Entity
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer student;
    private Integer module;
    private String grade;

    public Enrollment() {
    }

    public Enrollment(Integer student, Integer module) {
        this.student = student;
        this.module = module;
    }

    public Enrollment(Integer student, Integer module, String grade) {
        this.student = student;
        this.module = module;
        this.grade = grade;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getStudent() {
        return student;
    }

    public void setStudent(Integer student) {
        this.student = student;
    }

    public Integer getModule() {
        return module;
    }

    public void setModule(Integer module) {
        this.module = module;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}
