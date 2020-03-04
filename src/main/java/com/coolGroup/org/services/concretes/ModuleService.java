package com.coolGroup.org.services.concretes;

import com.coolGroup.org.models.Module;
import com.coolGroup.org.repositories.ModuleRepository;
import com.coolGroup.org.services.abstracts.IModuleService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ModuleService implements IModuleService {
    private ModuleRepository moduleRepository;

    @Autowired
    public ModuleService(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    @Override
    public Iterable<Module> get() {
        return moduleRepository.findAll();
    }

    @Override
    public Module get(Integer id) {
        return moduleRepository.getOne(id);
    }

    @Override
    public Module update(Integer id, Module module) {
        Module existingModule = this.moduleRepository.getOne(id);
        BeanUtils.copyProperties(module, existingModule, "module_id", "students");
        return this.moduleRepository.saveAndFlush(existingModule);
    }

    @Override
    public Module create(Module module) {
        return moduleRepository.saveAndFlush(module);
    }

    @Override
    public void createMultiple(Module[] modules) {
        for (Module module : modules) {
            create(module);
        }
    }

    @Override
    public Module delete(Integer id) {
        Module deleted = moduleRepository.getOne(id);
        moduleRepository.delete(deleted);
        return deleted;
    }

    @Override
    public boolean hasRoom(Integer id) {
        Module module = get(id);
        return module.getCurrent_number_enrolled()
                < module.getMax_number_enrolled();
    }

    @Override
    public Integer addStudent(Integer id) {
        Module module = get(id);
        module.setCurrent_number_enrolled(module.getCurrent_number_enrolled() + 1);
        return module.getCurrent_number_enrolled();
    }

    @Override
    public Integer removeStudent(Integer id) {
        Module module = get(id);
        module.setCurrent_number_enrolled(module.getCurrent_number_enrolled() - 1);
        return module.getCurrent_number_enrolled();
    }
}
