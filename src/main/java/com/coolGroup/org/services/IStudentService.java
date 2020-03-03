package com.coolGroup.org.services;

import com.coolGroup.org.models.PaymentAccount;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.dtos.PaymentAccountDto;
import org.springframework.stereotype.Service;

@Service
public interface IStudentService {
    Iterable<Student> get();

    Student get(Integer id);

    Student create(final Student student);

    void createMultiple(final Student[] students);

    Student delete(Integer id);

    Student saveChanges(Student student);

    Student addPaymentAccount(PaymentAccountDto dto);

    double deposit(Student student, double amount);

    double withdraw(Student student, double amount);

    boolean hasSufficientFunds(Student student, double cost);
}