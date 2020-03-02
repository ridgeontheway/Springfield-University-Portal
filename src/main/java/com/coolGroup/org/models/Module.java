package com.coolGroup.org.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Module implements Serializable {
//    module name, the module topics, the name of the module coordinator,
// and view module statistics (number of enrolled students, grades distributions
// for previous editions of the module, max students).

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer module_id;
    private String name;
    private String coordinator_name;
    private int current_number_enrolled;
    private int max_number_enrolled;
    @Transient
    List<Student> students;

    public Module() {}

    public Integer getModule_id() {
        return module_id;
    }

    public void setModule_id(Integer module_id) {
        this.module_id = module_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCoordinator_name() {
        return coordinator_name;
    }

    public void setCoordinator_name(String coordinator_name) {
        this.coordinator_name = coordinator_name;
    }

    public int getCurrent_number_enrolled() {
        return current_number_enrolled;
    }

    public void setCurrent_number_enrolled(int current_number_enrolled) {
        this.current_number_enrolled = current_number_enrolled;
    }

    public int getMax_number_enrolled() {
        return max_number_enrolled;
    }

    public void setMax_number_enrolled(int max_number_enrolled) {

        this.max_number_enrolled = max_number_enrolled;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.setCurrent_number_enrolled(students.size());
        this.students = students;
    }
}
