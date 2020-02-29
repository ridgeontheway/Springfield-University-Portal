package com.coolGroup.org.services;

import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.Module;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IStudentService {
    Iterable<Student> get();

    Student get(Integer id);

    Student create(final Student student);

    void createMultiple(final Student[] students);

    Student delete(Integer id);
}