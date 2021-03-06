package com.coolGroup.org.controllers.api;

import com.coolGroup.org.config.PermissionUtility;
import com.coolGroup.org.models.Staff;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.enums.Permission;
import com.coolGroup.org.services.abstracts.IWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.coolGroup.org.models.Module;

import java.util.List;

@RestController
@RequestMapping(path = "/api/modules")
public class ModuleController {
    private IWorker worker;
    private PermissionUtility userPermissions;

    @Autowired
    public ModuleController(IWorker worker, PermissionUtility userPermissions) {
        this.worker = worker;
        this.userPermissions = userPermissions;
    }

    @GetMapping
    public @ResponseBody
    Iterable<Module> get() {
        Iterable<Module> modules = worker.moduleService().get();
        for (Module module : modules) {
            List<Student> students = worker.enrollmentService().getStudentsForModule(module.getModule_id());
            module.setStudents(students);
        }
        return modules;
    }

    @GetMapping(path = "{id}")
    public @ResponseBody
    Module get(@PathVariable Integer id) {
        Module module = worker.moduleService().get(id);
        List<Student> students = worker.enrollmentService().getStudentsForModule(id);
        module.setStudents(students);
        return module;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PATCH)
    public Module update(@PathVariable Integer id, @RequestBody Module module) {
        Module newModule = null;
        if (userPermissions.hasPermission(Permission.EDIT_MODULE)) {
            newModule = worker.moduleService().update(id, module);
            this.worker.log().updateModule(id, module);
        }
        else {
            this.worker.log().insufficientPrivileges("update module");
        }
        return newModule;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Module create(@RequestBody final Module module) {
        Module result = null;
        try {
            result = worker.moduleService().create(module);
        } catch (Exception e) {
            this.worker.log().error(e);
        }
        this.worker.log().createModule(module);
        return result;
    }

    @RequestMapping(path = "multiple", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody final Module[] modules) {
        worker.moduleService().createMultiple(modules);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    Module delete(@PathVariable Integer id) {
        this.worker.log().deleteModule(id);
        return worker.moduleService().delete(id);
    }
}
