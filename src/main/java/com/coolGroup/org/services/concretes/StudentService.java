package com.coolGroup.org.services.concretes;

import com.coolGroup.org.config.PasswordHandler;
import com.coolGroup.org.models.PaymentAccount;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.dtos.PaymentAccountDto;
import com.coolGroup.org.repositories.StudentRepository;
import com.coolGroup.org.services.abstracts.IStudentService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import static java.lang.Math.round;

@Service
public class StudentService implements IStudentService {
    private StudentRepository studentRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = PasswordHandler.passwordEncoder();
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
    public List<Student> getByGender(String gender) {
        Optional<List<Student>> students = this.studentRepository.getAllByGender(gender);
        List<Student> result = null;
        if (students.isPresent()) {
            result = students.get();
        }
        return result;
    }

    @Override
    public List<Student> getByNationality(String nationality) {
        Optional<List<Student>> students = this.studentRepository.getAllByNationality(nationality);
        List<Student> result = null;
        if (students.isPresent()) {
            result = students.get();
        }
        return result;
    }

    @Override
    public Student getByEmail(String email) {
        Optional<Student> student = this.studentRepository.getByEmail(email);
        Student result = null;
        if (student.isPresent()) {
            result = student.get();
        }
        return result;
    }

    @Override
    public Student update(Integer id, Student student) {
        Student existingStudent = this.studentRepository.getOne(id);
        BeanUtils.copyProperties(student, existingStudent, "id", "modules", "payment_account");
        return this.studentRepository.saveAndFlush(existingStudent);
    }

    @Override
    public Student create(Student student) {
        Student result = null;
        Iterable<Student> emailMatches = this.studentRepository
                .findAll().stream()
                .filter(s -> s.getEmail().equals(student.getEmail()))
                .collect(Collectors.toList());
        if (((List<Student>) emailMatches).isEmpty()) {
            student.setPassword(this.passwordEncoder.encode(student.getPassword()));
            Student withPaymentAccount = assignRandomPaymentAccount(student);
            result = studentRepository.saveAndFlush(withPaymentAccount);
        }
        return result;
    }

    private Student assignRandomPaymentAccount(Student student) {
        Random rand = new Random();

        student = studentRepository.saveAndFlush(student);
        PaymentAccount newPaymentAccount = new PaymentAccount(
                student.getId(),
                student.getSurname() + student.getName().substring(0, 1),
                round(rand.nextDouble() * 100000)
        );
        student.setPayment_account(newPaymentAccount);

        return student;
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
        Student existingStudent = this.studentRepository.getOne(student.getId());
        BeanUtils.copyProperties(student, existingStudent, "id");
        return this.studentRepository.saveAndFlush(existingStudent);
    }

    @Override
    public Student addPaymentAccount(PaymentAccountDto dto) {
        Student student = (get(Integer.parseInt(dto.getStudent())));
        student.setPayment_account(new PaymentAccount(dto));
        return this.studentRepository.saveAndFlush(student);
    }

    @Override
    public double depositFunds(Student student, double amount) {
        PaymentAccount account = student.getPayment_account();
        account.setBalance(account.getBalance() + amount);
        student.setPayment_account(account);
        saveChanges(student);
        return student.getPayment_account().getBalance();
    }

    @Override
    public double withdrawFunds(Student student, double amount) {
        PaymentAccount account = student.getPayment_account();
        // We'll get a negative number back if invalid but we won't withdraw the money
        double difference = account.getBalance() - amount;
        if (difference >= 0) {
            account.setBalance(difference);
            student.setPayment_account(account);
            saveChanges(student);
        }
        return difference;
    }

    @Override
    public boolean hasSufficientFunds(Student student, double cost) {
        return student.getPayment_account().getBalance() >= cost;
    }
}
