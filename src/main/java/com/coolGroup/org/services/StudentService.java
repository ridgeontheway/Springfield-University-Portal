package com.coolGroup.org.services;

import com.coolGroup.org.models.Student;
import com.coolGroup.org.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService implements IStudentService {
    private StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Iterable<Student> get() {
        return studentRepository.findAll();
    }

    @Override
    public Student get(Integer id) {
        return studentRepository.getOne(id);
    }

    @Override
    public Student create(Student student) {
        return studentRepository.saveAndFlush(student);
    }

    @Override
    public void createMultiple(final Student[] students) {
        for (Student student : students) {
            create(student);
        }
    }

    @Override
    public Student delete(Integer id) {
        Student deleted = studentRepository.getOne(id);
        studentRepository.delete(deleted);
        return deleted;
    }
}
