package com.coolGroup.org.services.abstracts;

import com.coolGroup.org.models.Enrollment;
import com.coolGroup.org.models.Module;
import com.coolGroup.org.models.Staff;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.dtos.PaymentAccountDto;

public interface ILoggingService {
    void loginUser(int id);
    void logoutUser();
    void insufficientPrivileges(String action);
    void enrollment(Enrollment enrollment);
    void unenrollment(Enrollment enrollment);
    void assignGrade(Enrollment enrollment);
    void updateModule(Integer id, Module module);
    void createModule(Module module);
    void deleteModule(int moduleId);
    void createStaff(Staff staff);
    void deleteStaff(int staffId);
    void createStudent(Student student);
    void updateStudent(int studentId, Student student);
    void deleteStudent(int studentId);
    void addPaymentAccount(PaymentAccountDto account);
    void error(Exception e);
}
