package com.coolGroup.org.models;

import com.coolGroup.org.models.abstracts.IUser;
import com.coolGroup.org.models.abstracts.User;
import com.coolGroup.org.models.dtos.ModuleForStudentDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Student extends User implements IUser {
    private String email;
    private String address;
    private String phone_number;
    private String nationality;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="account_number")
    private PaymentAccount paymentAccount;
    @Transient
    private List<ModuleForStudentDto> modules;

    public Student() {}

    public Student(String name, String surname, String email, String password, String address,
                   String phone_number, String gender, String nationality) {
        super(name, surname, gender, email, password);
        this.address = address;
        this.phone_number = phone_number;
        this.nationality = nationality;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public List<ModuleForStudentDto> getModules() {
        return modules;
    }

    public void setModules(List<ModuleForStudentDto> modules) {
        this.modules = modules;
    }

    public PaymentAccount getPaymentAccount() {
        return paymentAccount;
    }    

    public void setPaymentAccount(PaymentAccount paymentAccount) {
        this.paymentAccount = paymentAccount;
    }
}
