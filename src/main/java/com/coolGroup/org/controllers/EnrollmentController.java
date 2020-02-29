package com.coolGroup.org.controllers;

import com.coolGroup.org.models.Enrollment;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.Module;
import com.coolGroup.org.services.IWorker;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/enrollments")
public class EnrollmentController {
    private IWorker worker;

    public EnrollmentController(IWorker worker) { this.worker = worker; }

    @PostMapping
    public Enrollment enroll(@RequestBody Enrollment enrollment) {
        return this.worker.enrollmentService()
                .enroll(enrollment.getStudent(), enrollment.getModule());
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void unenroll(@RequestBody Enrollment enrollment) {
        this.worker.enrollmentService()
                .unenroll(enrollment.getStudent(), enrollment.getModule());
    }

    @GetMapping(path = "student/{id}")
    public List<Module> getModulesForStudent(@PathVariable Integer id) {
        return this.worker.enrollmentService().getModulesForStudent(id);
    }

    @GetMapping(path = "module/{id}")
    public List<Student> getStudentsForModule(@PathVariable Integer id) {
        return this.worker.enrollmentService().getStudentsForModule(id);
    }
}
