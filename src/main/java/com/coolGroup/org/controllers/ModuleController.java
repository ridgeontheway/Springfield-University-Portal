package com.coolGroup.org.controllers;

import com.coolGroup.org.config.PermissionUtility;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.enums.Permission;
import com.coolGroup.org.services.IWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.coolGroup.org.models.Module;

import java.util.List;

@RestController
@RequestMapping(path = "/api/modules")
public class ModuleController {
    private IWorker worker;

    @Autowired
    public ModuleController(IWorker worker) {
        this.worker = worker;
    }

    @GetMapping
    public @ResponseBody Iterable<Module> get() {
        Iterable<Module> modules = worker.moduleService().get();
        for (Module module : modules) {
            List<Student> students = worker.enrollmentService().getStudentsForModule(module.getModule_id());
            module.setStudents(students);
        }
        return modules;
    }

    @GetMapping(path = "{id}")
    public @ResponseBody Module get(@PathVariable Integer id) {
        Module module = worker.moduleService().get(id);
        List<Student> students = worker.enrollmentService().getStudentsForModule(id);
        module.setStudents(students);
        return module;
    }

    @RequestMapping(method = RequestMethod.PATCH)
    public Module edit(@RequestBody final Module module) {
        Module newModule = null;
        if (PermissionUtility.hasPermission("Staff", Permission.EDIT_MODULE)) {
            newModule = worker.moduleService().edit(module);
        }
        return newModule;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Module create(@RequestBody final Module module) {
        return worker.moduleService().create(module);
    }

    @RequestMapping(path = "multiple", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody final Module[] modules) {
        worker.moduleService().createMultiple(modules);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public @ResponseBody Module delete(@PathVariable Integer id) {
        return worker.moduleService().delete(id);
    }
}
