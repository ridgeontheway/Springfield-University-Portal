package com.coolGroup.org.services;

import com.coolGroup.org.models.PaymentAccount;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.dtos.PaymentAccountDto;
import com.coolGroup.org.repositories.StudentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService implements IStudentService {
    private StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Iterable<Student> get() {
        return studentRepository.findAll();
    }

    @Override
    public Student get(Integer id) {
        return studentRepository.getOne(id);
    }

    @Override
    public Student create(Student student) {
        return studentRepository.saveAndFlush(student);
    }

    @Override
    public void createMultiple(final Student[] students) {
        for (Student student : students) {
            create(student);
        }
    }

    @Override
    public Student delete(Integer id) {
        Student deleted = studentRepository.getOne(id);
        studentRepository.delete(deleted);
        return deleted;
    }

    @Override
    public Student saveChanges(Student student) {
        Student existingStudent = this.studentRepository.getOne(student.getStudent_id());
        BeanUtils.copyProperties(student, existingStudent, "student_id");
        return this.studentRepository.saveAndFlush(existingStudent);
    }

    @Override
    public Student addPaymentAccount(PaymentAccountDto dto) {
        Student student = (get(Integer.parseInt(dto.getStudent())));
        student.setPaymentAccount(new PaymentAccount(dto));
        return this.studentRepository.saveAndFlush(student);
    }

    @Override
    public double deposit(Student student, double amount) {
        PaymentAccount account = student.getPaymentAccount();
        account.setBalance(account.getBalance() + amount);
        student.setPaymentAccount(account);
        saveChanges(student);
        return student.getPaymentAccount().getBalance();
    }

    @Override
    public double withdraw(Student student, double amount) {
        PaymentAccount account = student.getPaymentAccount();
        // We'll get a negative number back if invalid but we won't withdraw the money
        double difference = account.getBalance() - amount;
        if (difference >= 0) {
            account.setBalance(difference);
            student.setPaymentAccount(account);
            saveChanges(student);
        }
        return difference;
    }

    @Override
    public boolean hasSufficientFunds(Student student, double cost) {
        return student.getPaymentAccount().getBalance() >= cost;
    }
}
