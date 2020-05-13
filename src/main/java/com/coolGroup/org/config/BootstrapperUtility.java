package com.coolGroup.org.config;

import com.coolGroup.org.models.Staff;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.Module;
import com.coolGroup.org.models.dtos.PaymentAccountDto;
import com.coolGroup.org.services.abstracts.IWorker;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class BootstrapperUtility {
    private List<Student> students = new ArrayList<>();
    private List<Staff> staff = new ArrayList<>();
    private List<Module> modules = new ArrayList<>();

    private IWorker worker;

    public BootstrapperUtility(IWorker worker) {
        this.worker = worker;
    }

    private void initStudents() {
        students.add(new Student("Julius", "Caesar", "jcaesar@su.edu", "password123",
                "Ancient Rome", "1234567", "Male", "Roman"));
        students.add(new Student("Lucius", "Sulla", "lsulla@su.edu", "password123",
                "Ancient Rome", "2345678", "Male", "Roman"));
        students.add(new Student("Genghis", "Khan", "gkhan@su.edu", "password123",
                "Mongolia", "3456789", "Male", "Mongolian"));
        students.add(new Student("Marie", "Curie", "mcurie@su.edu", "password123",
                "Poland", "4567890", "Female", "Polish"));
        students.add(new Student("George", "Washington", "gwashington@su.edu", "password123",
                "The White House", "7654321", "Male", "American"));
    }

    private void initModules() {
        modules.add(new Module("Programming", "Liliana Pasquale", 0, 50, 100.00));
        modules.add(new Module("History", "Bob Dole", 0, 50, 100.00));
        modules.add(new Module("Maths", "Alan Turing", 0, 50, 100.00));
        modules.add(new Module("Geography", "Ferdinand Magellan", 0, 50, 100.00));
        modules.add(new Module("Biology", "Bill Nye", 0, 50, 100.00));
        modules.add(new Module("Flagmaking", "Betsy Ross", 0, 50, 100.00));
    }

    private void initPaymentAccounts() {
        Random random = new Random();
        for (Student student : students) {
            this.worker.studentService().addPaymentAccount(new PaymentAccountDto(
                    student.getId().toString(),
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
                this.worker.enrollmentService().enroll(student.getId(), nextModule);
            }
        }
    }

    private void writeStudentsAndModules() {
        initStudents();
        for (Student student : this.students) {
            this.worker.studentService().create(student);
        }
        initModules();
        for (Module module : this.modules) {
            this.worker.moduleService().create(module);
        }
    }

    private void initStaff() {
        staff.add(new Staff("Lilliana", "Pasquale",
                "lpasquale@su.com", "password4321", "Female"));
        staff.add(new Staff("Alan", "Turing",
                "aturing@su.com", "password4321", "Male"));
        staff.add(new Staff("Bob", "Dole",
                "bdole@su.com", "password4321", "Male"));
        staff.add(new Staff("Ferdinand", "Magellan",
                "fmagellan@su.com", "password4321", "Male"));
        staff.add(new Staff("Betsy", "Ross",
                "bross@su.com", "password4321", "Female"));
        staff.add(new Staff("Bill", "Nye",
                "bnye@su.com", "password4321", "Male"));
    }

    private void writeStaff() {
        initStaff();
        for (Staff staffMember : this.staff) {
            this.worker.staffService().create(staffMember);
        }
    }

    public String init() {
        writeStudentsAndModules();
        initPaymentAccounts();
        initEnrollments();
        writeStaff();

        return "Success!";
    }
}
