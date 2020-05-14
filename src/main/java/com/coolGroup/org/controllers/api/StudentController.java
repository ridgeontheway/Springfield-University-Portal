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
    public Iterable<Student> get() {
        Iterable<Student> students = worker.studentService().get();
        for (Student student : students) {
            List<ModuleForStudentDto> modules = worker.enrollmentService().getModulesForStudent(student.getId());
            student.setModules(modules);
        }
        return students;
    }

    @GetMapping(path = "{id}")
    public Student get(@PathVariable Integer id) {
        Student student = worker.studentService().get(id);
        List<ModuleForStudentDto> modules = worker.enrollmentService().getModulesForStudent(id);
        student.setModules(modules);

        return student;
    }

    @GetMapping(path = "email/{email}")
    public Student getByEmail(@PathVariable String email) {
        Student student = worker.studentService().getByEmail(email);
        List<ModuleForStudentDto> modules = worker.enrollmentService().getModulesForStudent(student.getId());
        student.setModules(modules);

        return student;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PATCH)
    public Student update(@PathVariable Integer id, @RequestBody Student student) {
        this.worker.log().updateStudent(id, student);
        return worker.studentService().update(id, student);
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:8080")
    @ResponseStatus(HttpStatus.CREATED)
    public Student create(@RequestBody final Student student) {
        Student newStudent = worker.studentService().create(student);
        this.worker.log().createStudent(newStudent);
        return newStudent;
    }

    @RequestMapping(path = "multiple", method = RequestMethod.POST)
    public void createMultiple(@RequestBody final Student[] students) {
        worker.studentService().createMultiple(students);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public Student delete(@PathVariable Integer id) {
        this.worker.log().deleteStudent(id);
        return worker.studentService().delete(id);
    }

    @RequestMapping(path = "payment", method = RequestMethod.PATCH)
    @ResponseStatus(HttpStatus.CREATED)
    public Student addPaymentAccount(@RequestBody PaymentAccountDto paymentAccountDto) {
        this.worker.log().addPaymentAccount(paymentAccountDto);
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
