package com.coolGroup.org.controllers;

import com.coolGroup.org.models.Student;
import com.coolGroup.org.services.IWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.coolGroup.org.models.Module;

@RestController
@RequestMapping(path = "/api/students")
public class StudentController {
    private IWorker worker;

    @Autowired
    public StudentController(IWorker worker) {
        this.worker = worker;
    }

    @GetMapping
    public @ResponseBody Iterable<Student> get() { return worker.studentService().get(); }

    @GetMapping(path = "{id}")
    public @ResponseBody Student get(@PathVariable Integer id) { return worker.studentService().get(id); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody Student create(@RequestBody final Student student) {
        System.out.println("I have got a request!!");
        System.out.println(student.toString());
        return worker.studentService().create(student);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public @ResponseBody Student delete(@PathVariable Integer id) {
        return worker.studentService().delete(id);
    }

    @RequestMapping(value = "{id}/enroll", method = RequestMethod.PATCH)
    public Student enroll(@PathVariable Integer id, @RequestBody int module_id) {
        Student student = worker.studentService().get(id);
        Integer value = module_id;
        Module module = worker.moduleService().get(value);
        worker.moduleService().enroll(student, module);
        return worker.studentService().enroll(student, module);
    }

    @RequestMapping(value = "{id}/unenroll", method = RequestMethod.PATCH)
    public Student unenroll(@PathVariable Integer id, @RequestBody int module_id) {
        Student student = worker.studentService().get(id);
        Integer value = module_id;
        Module module = worker.moduleService().get(value);
        worker.moduleService().unenroll(student, module);
        return worker.studentService().unenroll(student, module);
    }
}
