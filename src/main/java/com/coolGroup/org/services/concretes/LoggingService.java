package com.coolGroup.org.services.concretes;

import com.coolGroup.org.models.*;
import com.coolGroup.org.models.Module;
import com.coolGroup.org.models.abstracts.User;
import com.coolGroup.org.models.dtos.PaymentAccountDto;
import com.coolGroup.org.repositories.ModuleRepository;
import com.coolGroup.org.repositories.StaffRepository;
import com.coolGroup.org.repositories.StudentRepository;
import com.coolGroup.org.services.abstracts.ILoggingService;
import com.coolGroup.org.services.abstracts.ILoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoggingService implements ILoggingService {
    User current;

    private StudentRepository studentRepository;
    private ModuleRepository moduleRepository;
    private StaffRepository staffRepository;
    private ILoginService loginService;

    @Autowired
    public LoggingService(StudentRepository studentRepository, ModuleRepository moduleRepository,
                          StaffRepository staffRepository, ILoginService loginService) {
        this.studentRepository = studentRepository;
        this.moduleRepository = moduleRepository;
        this.staffRepository = staffRepository;
        this.loginService = loginService;
    }


    @Override
    public void loginUser() {
        Login login = this.loginService.getLoggedInUser();
        if (login.getUser_role().equals("student")) {
            this.current = this.studentRepository.getOne(login.getId());
        }
        else {
            this.current = this.staffRepository.getOne(login.getId());
        }
        System.out.println("LOGGER: " + this.current.getName() + " " +
                this.current.getSurname() + " has logged in. Role: " + login.getUser_role());
    }

    @Override
    public void loginFailed(Login login) {
        String message = "LOGGER: Login attempt failed. Email: " + login.getEmail() +
                ". Role: " + login.getUser_role();

        System.out.println(message);
    }

    @Override
    public void logoutUser() {
        if (this.current != null) {
            System.out.println("LOGGER: " + this.current.getName() + " " +
                    this.current.getSurname() + " has logged out.");
        }
    }

    @Override
    public void trackIp(String ip, int count) {
        StringBuilder message = new StringBuilder();
        String base = "LOGGER: IP address " + ip + " has " + count + " failed logins.";
        message.append(base);
        if (count > 2) {
            message.append("\nLOGGER: For security purposes, this IP will now be locked" +
                    " from future login attempts.");
        }
        System.out.println(message.toString());
    }

    @Override
    public void ipBlocked(String ip) {
        System.out.println("LOGGER: The IP address " + ip + " has exceeded the " +
                "allowed number of failed login attempts and is now blocked.");
    }

    @Override
    public void insufficientPrivileges(String action) {
        System.out.println("LOGGER: User has insufficient privileges to perform action: " + action);
    }

    @Override
    public void enrollment(Enrollment enrollment) {
        StringBuilder message = new StringBuilder();
        if (enrollment.getModule() > 0 && enrollment.getStudent() > 0) {
            int moduleId = enrollment.getModule();
            Module module = this.moduleRepository.getOne(moduleId);
            message.append("LOGGER: Student ");
            message.append(this.current.getName());
            message.append(" ");
            message.append(this.current.getSurname());
            message.append(" has enrolled in module ");
            message.append(module.getModule_id());
            message.append(": ");
            message.append(module.getName());
            message.append("\nLOGGER: Number enrolled: ");
            message.append(module.getCurrent_number_enrolled());
        }
        else {
            message.append(enrollmentFailed(enrollment));
        }
        System.out.println(message.toString());
    }

    @Override
    public void unenrollment(Enrollment enrollment) {
        if (enrollment != null) {
            int moduleId = enrollment.getModule();
            Module module = this.moduleRepository.getOne(moduleId);
            String message = "LOGGER: Student " + current.getName() + " " +
                    this.current.getSurname() + " has unenrolled from module "
                    + module.getName() + "\nNumber enrolled: " +
                    module.getCurrent_number_enrolled();
            System.out.println(message);
        }
    }

    @Override
    public void assignGrade(Enrollment enrollment) {
        int moduleId = enrollment.getModule();
        Module module = this.moduleRepository.getOne(moduleId);
        int studentId = enrollment.getStudent();
        Student student = this.studentRepository.getOne(studentId);
        String user = this.current.getName() + " " + this.current.getSurname();
        String grade = enrollment.getGrade();

        System.out.println("LOGGER: " + user + " has assigned student " + student.getName() +
                " a grade of " + grade + " in module " + module.getName());
    }

    @Override
    public void updateModule(Integer id, Module module) {
        Module old = this.moduleRepository.getOne(id);
        StringBuilder message = new StringBuilder();
        message.append("LOGGER: Module ");
        message.append(id);
        message.append(" Updated");
        if (!old.getName().equals(module.getName())) {
            message.append("\nLOGGER: Name:\t");
            message.append(old.getName());
            message.append("\t->\t");
            message.append(module.getName());
        }
        if (!old.getCoordinator_name().equals(module.getCoordinator_name())) {
            message.append("\nLOGGER: Module Coordinator:\t");
            message.append(old.getCoordinator_name());
            message.append("\t->\t");
            message.append(module.getCoordinator_name());
        }
        if (old.getCost() != module.getCost()) {
            message.append("\nLOGGER: Cost:\t");
            message.append(old.getCost());
            message.append("\t->\t");
            message.append(module.getCost());
        }
        if (old.getMax_number_enrolled() != module.getMax_number_enrolled()) {
            message.append("\nLOGGER: Max Enrollment:\t");
            message.append(old.getMax_number_enrolled());
            message.append("\t->\t");
            message.append(module.getMax_number_enrolled());
        }
        System.out.println(message.toString());
    }

    @Override
    public void createModule(Module module) {
        if (module == null) {
            System.out.println("LOGGER: An error occurred while creating a module.");
        }
        else {
            String message = "LOGGER: Module #" + module.getModule_id() + ": " +
                    module.getName() + " has been created.";
            System.out.println(message);
        }
    }

    @Override
    public void deleteModule(int moduleId) {
        Module module = this.moduleRepository.getOne(moduleId);
        String message = "LOGGER: Module #" + moduleId + ": " +
                module.getName() + " has been deleted.";
        System.out.println(message);
    }

    @Override
    public void createStaff(Staff staff) {
        System.out.println("LOGGER: Staff member created: " + staff.getName());
    }

    @Override
    public void deleteStaff(int staffId) {
        Staff staff = this.staffRepository.getOne(staffId);
        System.out.println("LOGGER: Staff member deleted: " + staff.getName());
    }

    @Override
    public void createStudent(Student student) {
        System.out.println("LOGGER: Student created: " + student.getName() +
                " " + this.current.getSurname());
    }

    @Override
    public void updateStudent(int studentId, Student student) {
        Student old = this.studentRepository.getOne(studentId);
        StringBuilder message = new StringBuilder();
        message.append("LOGGER: Module ");
        message.append(studentId);
        message.append(" Updated");
        if (!old.getName().equals(student.getName())) {
            message.append("\nLOGGER: First Name:\t");
            message.append(old.getName());
            message.append("\t->\t");
            message.append(student.getName());
        }
        if (!old.getSurname().equals(student.getSurname())) {
            message.append("\nLOGGER: Surname:\t");
            message.append(old.getSurname());
            message.append("\t->\t");
            message.append(student.getSurname());
        }
        if (!old.getGender().equals(student.getGender())) {
            message.append("\nLOGGER: Gender:\t");
            message.append(old.getGender());
            message.append("\t->\t");
            message.append(student.getGender());
        }
        if (!old.getEmail().equals(student.getEmail())) {
            message.append("\nLOGGER: Email:\t");
            message.append(old.getEmail());
            message.append("\t->\t");
            message.append(student.getEmail());
        }
        if (!old.getAddress().equals(student.getAddress())) {
            message.append("\nLOGGER: Address:\t");
            message.append(old.getAddress());
            message.append("\t->\t");
            message.append(student.getAddress());
        }
        if (!old.getPhone_number().equals(student.getPhone_number())) {
            message.append("\nLOGGER: Phone Number:\t");
            message.append(old.getPhone_number());
            message.append("\t->\t");
            message.append(student.getPhone_number());
        }
        if (!old.getNationality().equals(student.getNationality())) {
            message.append("\nLOGGER: Nationality:\t");
            message.append(old.getNationality());
            message.append("\t->\t");
            message.append(student.getNationality());
        }
        System.out.println(message.toString());
    }

    @Override
    public void deleteStudent(int studentId) {
        Student student = this.studentRepository.getOne(studentId);
        String message = "LOGGER: Student #" + studentId + ": " +
                student.getName() + " " +
                this.current.getSurname() + " has been deleted.";
        System.out.println(message);
    }

    @Override
    public void addPaymentAccount(PaymentAccountDto account) {
        String student = account.getStudent();
        String accountNumber = account.getAccount_number();
        String balance = account.getBalance();

        String message = "LOGGER: Account #" + accountNumber +
                "opened for student " + student + ". Balance: " + balance;

        System.out.println(message);
    }

    @Override
    public void error(Exception e) {
        System.out.println("LOGGER: An error has occured: " + e.getMessage());
    }

    private String enrollmentFailed(Enrollment enrollment) {
        StringBuilder message = new StringBuilder();
        message.append("LOGGER: Enrollment failed. Reason(s):");
        if (enrollment.getStudent() < 0) {
            message.append("\nLOGGER: \tInsufficient funds");
        }
        if (enrollment.getModule() < 0) {
            message.append("\nLOGGER: \tThe module is full");
        }
        return message.toString();
    }
}
