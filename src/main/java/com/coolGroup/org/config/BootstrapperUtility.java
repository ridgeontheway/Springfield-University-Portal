package com.coolGroup.org.config;

import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.Module;
import com.coolGroup.org.models.dtos.PaymentAccountDto;
import com.coolGroup.org.services.abstracts.IWorker;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class BootstrapperUtility {
    private List<Student> students = new ArrayList<>();
    private List<Module> modules = new ArrayList<>();

    private IWorker worker;

    public BootstrapperUtility(IWorker worker) {
        this.worker = worker;
    }

    private void initStudents() {
        students.add(new Student("Julius", "Caesar", "jcaesar@su.edu",
                "Ancient Rome", "1234567", "Male", "Roman"));
        students.add(new Student("Lucius", "Sulla", "lsulla@su.edu",
                "Ancient Rome", "2345678", "Male", "Roman"));
        students.add(new Student("Genghis", "Khan", "gkhan@su.edu",
                "Mongolia", "3456789", "Male", "Mongolian"));
        students.add(new Student("Marie", "Curie", "mcurie@su.edu",
                "Poland", "4567890", "Female", "Polish"));
        students.add(new Student("George", "Washington", "gwashington@su.edu",
                "The White House", "7654321", "Male", "American"));
    }

    private void initModules() {
        modules.add(new Module("Programming", "Liliana Pasquale", 0, 50, 100.00));
        modules.add(new Module("History", "Bob Dole", 0, 50, 100.00));
        modules.add(new Module("Maths", "Alan Turing", 0, 50, 100.00));
        modules.add(new Module("Geography", "Ferdinand Magellan", 0, 50, 100.00));
        modules.add(new Module("Biology", "Bill Nye", 0, 50, 100.00));
    }

    private void initPaymentAccounts() {
        Random random = new Random();
        for (Student student : students) {
            this.worker.studentService().addPaymentAccount(new PaymentAccountDto(
                    student.getStudent_id().toString(),
                    String.valueOf(random.nextInt(899999) + 100000),
                    "100000"
            ));
        }
    }

    private void initEnrollments() {
        Random random = new Random();
        int minModuleNumber = modules.get(0).getModule_id();
        int maxModuleNumber = modules.get(modules.size() - 1).getModule_id();

        for (Student student : students) {
            int enrollmentCount = random.nextInt(modules.size() / 2);
            for (int i = 0; i <= enrollmentCount; i++) {
                int nextModule = random.nextInt(maxModuleNumber - minModuleNumber) + minModuleNumber;
                this.worker.enrollmentService().enroll(student.getStudent_id(), nextModule);
            }
        }
    }

    private void writeStudentsAndModules() {
        initStudents();
        for (Student student : students) {
            this.worker.studentService().create(student);
        }
        initModules();
        for (Module module : modules) {
            this.worker.moduleService().create(module);
        }
    }

    public String init() {
        writeStudentsAndModules();
        initPaymentAccounts();
        initEnrollments();

        return "Success!";
    }
}
