package com.coolGroup.org.services;

import com.coolGroup.org.models.Module;
import org.springframework.stereotype.Service;

@Service
public interface IModuleService {
    Iterable<Module> get();

    Module get(Integer id);

    Module create(final Module module);

    void createMultiple(final Module[] modules);

    Module delete(Integer id);

    boolean hasRoom(Integer id);

    Integer addStudent(Integer id);

    Integer removeStudent(Integer id);
}