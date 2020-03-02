package com.coolGroup.org.services;

import com.coolGroup.org.models.Student;
import org.springframework.stereotype.Service;

@Service
public interface IStudentService {
    Iterable<Student> get();

    Student get(Integer id);

    Student create(final Student student);

    void createMultiple(final Student[] students);

    Student delete(Integer id);
}