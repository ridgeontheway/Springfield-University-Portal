package com.coolGroup.org.controllers.api;

import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.dtos.ModuleForStudentDto;
import com.coolGroup.org.models.dtos.PaymentAccountDto;
import com.coolGroup.org.services.abstracts.IWorker;
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
    public @ResponseBody
    Iterable<Student> get() {
        Iterable<Student> students = worker.studentService().get();
        for (Student student : students) {
            List<ModuleForStudentDto> modules = worker.enrollmentService()
                    .getModulesForStudent(student.getId());
            student.setModules(modules);
        }
        return students;
    }

    @GetMapping(path = "{id}")
    public @ResponseBody
    Student get(@PathVariable Integer id) {
        Student student = worker.studentService().get(id);
        List<ModuleForStudentDto> modules = worker.enrollmentService().getModulesForStudent(id);
        student.setModules(modules);

        return student;
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:8080")
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    Student create(@RequestBody final Student student) {
        return worker.studentService().create(student);
    }

    @RequestMapping(path = "multiple", method = RequestMethod.POST)
    public void createMultiple(@RequestBody final Student[] students) {
        worker.studentService().createMultiple(students);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    Student delete(@PathVariable Integer id) {
        return worker.studentService().delete(id);
    }

    @RequestMapping(path = "payment", method = RequestMethod.PATCH)
    @ResponseStatus(HttpStatus.CREATED)
    public Student addPaymentAccount(@RequestBody PaymentAccountDto paymentAccountDto) {
        return this.worker.studentService().addPaymentAccount(paymentAccountDto);
    }

    @RequestMapping(path = "payments", method = RequestMethod.PATCH)
    @ResponseStatus(HttpStatus.CREATED)
    public void addPaymentAccounts(@RequestBody PaymentAccountDto[] paymentAccountsDto) {
        for (PaymentAccountDto account : paymentAccountsDto) {
            addPaymentAccount(account);
        }
    }
}
