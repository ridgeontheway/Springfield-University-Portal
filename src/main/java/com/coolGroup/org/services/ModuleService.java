package com.coolGroup.org.services;

import com.coolGroup.org.models.Module;
import com.coolGroup.org.repositories.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
