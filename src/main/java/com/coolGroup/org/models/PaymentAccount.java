package com.coolGroup.org.models;

import javax.persistence.*;

@Entity
public class PaymentAccount {
    private Integer id;
    private Integer student;
    private String account_number;
    private double balance;


    public PaymentAccount() {}

    public PaymentAccount(Integer id, Integer student, String account_number, double balance) {
        this.id = id;
        this.student = student;
        this.account_number = account_number;
        this.balance = balance;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getStudent() {
        return this.student;
    }

    public void setStudent(Integer student) {
        this.student = student;
    }

    public String getAccount_number() {
        return this.account_number;
    }

    public void setAccount_number(String account_number) {
        this.account_number = account_number;
    }

    public double getBalance() {
        return this.balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}
