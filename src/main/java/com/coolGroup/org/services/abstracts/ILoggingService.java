package com.coolGroup.org.services.abstracts;

import com.coolGroup.org.models.*;
import com.coolGroup.org.models.Module;
import com.coolGroup.org.models.dtos.PaymentAccountDto;

public interface ILoggingService {
    void loginUser();
    void loginFailed(Login login);
    void logoutUser();
    void trackIp(String ip, int count);
    void ipBlocked(String ip);
    void insufficientPrivileges(String action);
    void enrollment(Enrollment enrollment);
    void unenrollment(Enrollment enrollment);
    void assignGrade(Enrollment enrollment);
    void updateModule(Integer id, Module module);
    void createModule(Module module);
    void deleteModule(int moduleId);
    void createStaff(Staff staff);
    void deleteStaff(int staffId);
    void createStudent(String email);
    void updateStudent(int studentId, Student student);
    void deleteStudent(Student student);
    void addPaymentAccount(PaymentAccountDto account);
    void error(Exception e);
}
