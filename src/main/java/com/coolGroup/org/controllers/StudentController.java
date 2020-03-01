package com.coolGroup.org.controllers;

import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.Module;
import com.coolGroup.org.services.IWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/students")
public class StudentController {
    private IWorker worker;

    @Autowired
    public StudentController(IWorker worker) {
        this.worker = worker;
    }

    @GetMapping
    public @ResponseBody Iterable<Student> get() {
        Iterable<Student> students = worker.studentService().get();
        for (Student student : students) {
            List<Module> modules = worker.enrollmentService()
                    .getModulesForStudent(student.getStudent_id());
            student.setModules(modules);
        }
        return students;
    }

    @GetMapping(path = "{id}")
    public @ResponseBody Student get(@PathVariable Integer id) {
        Student student = worker.studentService().get(id);
        List<Module> modules = worker.enrollmentService().getModulesForStudent(id);
        student.setModules(modules);

        return student;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student create(@RequestBody final Student student) {
        return worker.studentService().create(student);
    }

    @RequestMapping(path = "multiple", method = RequestMethod.POST)
    public void createMultiple(@RequestBody final Student[] students) { worker.studentService().createMultiple(students); }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public @ResponseBody Student delete(@PathVariable Integer id) {
        return worker.studentService().delete(id);
    }
}
