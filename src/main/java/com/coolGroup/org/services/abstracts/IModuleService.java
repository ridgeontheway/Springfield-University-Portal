package com.coolGroup.org.services.abstracts;

import com.coolGroup.org.models.Module;
import org.springframework.stereotype.Service;

@Service
public interface IModuleService {
    Iterable<Module> get();

    Module get(Integer id);

    Module update(Integer id, Module module);

    Module create(final Module module);

    void createMultiple(final Module[] modules);

    Module delete(Integer id);

    boolean hasRoom(Integer id);

    Integer addStudent(Integer id);

    Integer removeStudent(Integer id);
}