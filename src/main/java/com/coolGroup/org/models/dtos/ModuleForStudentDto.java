package com.coolGroup.org.models.dtos;

public class ModuleForStudentDto {
    private Integer module_id;
    private String name;
    private String coordinator_name;
    private String grade;

    public ModuleForStudentDto(Integer module_id, String name, String coordinator_name, String grade) {
        this.module_id = module_id;
        this.name = name;
        this.coordinator_name = coordinator_name;
        this.grade = grade;
    }

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

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}
