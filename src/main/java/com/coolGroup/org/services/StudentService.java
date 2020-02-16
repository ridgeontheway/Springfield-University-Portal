package com.coolGroup.org.services;

import com.coolGroup.org.models.Module;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.repositories.StudentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

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
    public Student delete(Integer id) {
        Student deleted = studentRepository.getOne(id);
        studentRepository.delete(deleted);
        return deleted;
    }

    @Override
    public Student enroll(Student student, Module module) {
        Set<Module> modules = student.getModules();
        if (!modules.contains(module)) {
            modules.add(module);
            student.setModules(modules);
        }
        Student existingStudent = studentRepository.getOne(student.getStudent_id());
        BeanUtils.copyProperties(student, existingStudent, "student_id");
        return studentRepository.saveAndFlush(existingStudent);
    }

    @Override
    public Student unenroll(Student student, Module module) {
        Set<Module> modules = student.getModules();
        if (modules.contains(module)) {
            modules.remove(module);
            student.setModules(modules);
        }
        Student existingStudent = studentRepository.getOne(student.getStudent_id());
        BeanUtils.copyProperties(student, existingStudent, "student_id");
        return studentRepository.saveAndFlush(existingStudent);
    }
}
