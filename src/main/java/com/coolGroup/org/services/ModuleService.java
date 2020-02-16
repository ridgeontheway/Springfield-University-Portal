package com.coolGroup.org.services;

import com.coolGroup.org.models.Module;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.repositories.ModuleRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class ModuleService implements IModuleService {
    private ModuleRepository moduleRepository;

    @Autowired
    public ModuleService(ModuleRepository moduleRepository) { this.moduleRepository = moduleRepository; }

    @Override
    public Iterable<Module> get() {
        return moduleRepository.findAll();
    }

    @Override
    public Module get(Integer id) {
        return moduleRepository.getOne(id);
    }

    @Override
    public Module create(Module module) {
        return moduleRepository.saveAndFlush(module);
    }

    @Override
    public Module delete(Integer id) {
        Module deleted = moduleRepository.getOne(id);
        moduleRepository.delete(deleted);
        return deleted;
    }

    @Override
    public Module enroll(Student student, Module module) {
        Set<Student> studentsEnrolled = module.getStudents();
        if (!studentsEnrolled.contains(student)) {
            studentsEnrolled.add(student);
            module.setStudents(studentsEnrolled);
        }
        Module existingModule = this.moduleRepository.getOne(module.getModule_id());
        BeanUtils.copyProperties(module, existingModule, "module_id");
        return moduleRepository.saveAndFlush(existingModule);
    }

    @Override
    public Module unenroll(Student student, Module module) {
        Set<Student> studentsEnrolled = module.getStudents();
        if (studentsEnrolled.contains(student)) {
            studentsEnrolled.remove(student);
            module.setStudents(studentsEnrolled);
        }
        Module existingModule = this.moduleRepository.getOne(module.getModule_id());
        BeanUtils.copyProperties(module, existingModule, "module_id");
        return moduleRepository.saveAndFlush(existingModule);
    }
}
