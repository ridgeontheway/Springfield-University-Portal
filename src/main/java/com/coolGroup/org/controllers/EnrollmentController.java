package com.coolGroup.org.controllers;

import com.coolGroup.org.models.Enrollment;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.dtos.ModuleForStudentDto;
import com.coolGroup.org.models.dtos.StudentAndModuleDto;
import com.coolGroup.org.services.IWorker;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/enrollments")
public class EnrollmentController {
    private IWorker worker;

    public EnrollmentController(IWorker worker) { this.worker = worker; }

    @PostMapping
    public Enrollment enroll(@RequestBody StudentAndModuleDto dto) {
        return this.worker.enrollmentService()
                .enroll(dto.getStudent(), dto.getModule());
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public Enrollment unenroll(@RequestBody StudentAndModuleDto dto) {
        return this.worker.enrollmentService()
                .unenroll(dto.getStudent(), dto.getModule());
    }

    @GetMapping(path = "student/{id}")
    public List<ModuleForStudentDto> getModulesForStudent(@PathVariable Integer id) {
        return this.worker.enrollmentService().getModulesForStudent(id);
    }

    @GetMapping(path = "module/{id}")
    public List<Student> getStudentsForModule(@PathVariable Integer id) {
        return this.worker.enrollmentService().getStudentsForModule(id);
    }

    @GetMapping(path = "enrollment")
    public Enrollment getEnrollmentForStudentAndModule(@RequestBody StudentAndModuleDto dto) {
        return this.worker.enrollmentService()
                .getEnrollmentForStudentAndModule(
                        dto.getStudent(), dto.getModule());
    }

    @RequestMapping(path = "grade", method = RequestMethod.PATCH)
    public void assignGrade(@RequestBody Enrollment enrollment) {
        this.worker.enrollmentService().assignGrade(
                enrollment.getStudent(),
                enrollment.getModule(),
                enrollment.getGrade()
        );
    }
}
