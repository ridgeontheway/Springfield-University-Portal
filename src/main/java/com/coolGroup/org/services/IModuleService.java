package com.coolGroup.org.services;

import com.coolGroup.org.models.Module;
import com.coolGroup.org.models.Student;
import org.springframework.stereotype.Service;

@Service
public interface IModuleService {
    Iterable<Module> get();
    Module get(Integer id);
    Module create(final Module student);
    Module delete(Integer id);
    Module enroll(Student student, Module module);
    Module unenroll(Student student, Module module);
}
