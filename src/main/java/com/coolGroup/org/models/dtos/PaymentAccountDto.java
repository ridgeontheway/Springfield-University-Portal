package com.coolGroup.org.models.dtos;

public class PaymentAccountDto {
    private String student;
    private String account_number;
    private String balance;

    public PaymentAccountDto(String student, String account_number, String balance) {
        this.student = student;
        this.account_number = account_number;
        this.balance = balance;
    }

    public String getStudent() {
        return student;
    }

    public void setStudent(String student) {
        this.student = student;
    }

    public String getAccount_number() {
        return account_number;
    }

    public void setAccount_number(String account_number) {
        this.account_number = account_number;
    }

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }
}
