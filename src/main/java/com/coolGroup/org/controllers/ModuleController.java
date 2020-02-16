package com.coolGroup.org.controllers;

import com.coolGroup.org.repositories.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.coolGroup.org.models.Module;

@RestController
@RequestMapping(path = "/api/modules")
public class ModuleController {
    private ModuleRepository moduleRepository;

    @Autowired
    public ModuleController(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    @GetMapping
    public @ResponseBody
    Iterable<Module> get() {
        return moduleRepository.findAll();
    }

    @GetMapping(path = "{id}")
    public @ResponseBody Module get(@PathVariable Integer id) {
        return moduleRepository.getOne(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Module create(@RequestBody final Module module) {
        return moduleRepository.saveAndFlush(module);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public @ResponseBody Module delete(@PathVariable Integer id) {
        Module deleted = moduleRepository.getOne(id);
        moduleRepository.delete(deleted);
        return deleted;
    }

}
