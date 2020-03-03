package com.coolGroup.org.services;

import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.Module;
import org.springframework.stereotype.Service;

@Service
public interface IStudentService {
    Iterable<Student> get();
    Student get(Integer id);
    Student create(final Student student);
    Student delete(Integer id);
    Student enroll(Student student, Module module);
    Student unenroll(Student student, Module module);
}
