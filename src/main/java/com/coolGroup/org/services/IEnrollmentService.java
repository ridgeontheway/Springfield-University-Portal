package com.coolGroup.org.services;

import com.coolGroup.org.models.*;
import com.coolGroup.org.models.Module;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IEnrollmentService {
    Iterable<Enrollment> get();
    Enrollment get(Integer id);
    void delete(Integer id);
    List<Enrollment> getEnrollmentForStudent(Integer studentId);
    List<Enrollment> getEnrollmentForModule(Integer moduleId);
    Enrollment getEnrollmentForStudentAndModule(Integer studentId, Integer moduleId);
    Enrollment assignGrade(Integer student, Integer module, String grade);
    Enrollment enroll(Integer studentId, Integer moduleId);
    void unenroll(Integer studentId, Integer moduleId);
    List<Module> getModulesForStudent(Integer student);
    List<Student> getStudentsForModule(Integer module);
}
