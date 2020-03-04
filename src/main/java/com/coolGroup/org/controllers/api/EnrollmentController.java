package com.coolGroup.org.controllers.api;

import com.coolGroup.org.config.PermissionUtility;
import com.coolGroup.org.models.Enrollment;
import com.coolGroup.org.models.Staff;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.dtos.ModuleForStudentDto;
import com.coolGroup.org.models.dtos.StudentAndModuleDto;
import com.coolGroup.org.models.enums.Permission;
import com.coolGroup.org.services.abstracts.IWorker;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/enrollments")
public class EnrollmentController {
    private IWorker worker;
    private final PermissionUtility userPermissions;

    public EnrollmentController(IWorker worker, PermissionUtility userPermissions) {
        this.worker = worker;
        this.userPermissions = userPermissions;
    }

    /*
    enrollment.getModule() == -1    --> Module is full
    enrollment.getStudent() == -1   --> Student has insufficient funds
     */
    @PostMapping
    public Enrollment enroll(@RequestBody StudentAndModuleDto dto) {
        Enrollment enrollment = new Enrollment();
        if (userPermissions.hasPermission(Permission.ENROLL)) {
            enrollment = this.worker.enrollmentService()
                    .enroll(dto.getStudent(), dto.getModule());
        }
        return enrollment;
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public Enrollment unenroll(@RequestBody StudentAndModuleDto dto) {
        Enrollment enrollment = null;
        if (userPermissions.hasPermission(Permission.UNENROLL)) {
            enrollment = this.worker.enrollmentService()
                    .unenroll(dto.getStudent(), dto.getModule());
        }
        return enrollment;
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
    public Enrollment assignGrade(@RequestBody Enrollment enrollment) {
        Enrollment result = null;
        if (userPermissions.hasPermission(Permission.ASSIGN_GRADE)) {
            this.worker.enrollmentService().assignGrade(
                    enrollment.getStudent(),
                    enrollment.getModule(),
                    enrollment.getGrade()
            );
            result = enrollment;
        }
        return result;
    }
}
