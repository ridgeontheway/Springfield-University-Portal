package com.coolGroup.org.services.abstracts;

import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.dtos.PaymentAccountDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IStudentService {
    Iterable<Student> get();

    Student get(Integer id);

    Student getByEmail(String email);

    List<Student> getByGender(String gender);

    List<Student> getByNationality(String nationality);

    Student update(Integer id, Student student);

    Student create(final Student student);

    void createMultiple(final Student[] students);

    Student delete(Integer id);

    Student saveChanges(Student student);

    Student addPaymentAccount(PaymentAccountDto dto);

    double depositFunds(Student student, double amount);

    double withdrawFunds(Student student, double amount);

    boolean hasSufficientFunds(Student student, double cost);
}