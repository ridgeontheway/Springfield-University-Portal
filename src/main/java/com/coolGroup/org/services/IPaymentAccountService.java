package com.coolGroup.org.services;

import com.coolGroup.org.models.PaymentAccount;
import org.springframework.stereotype.Service;

@Service
public interface IPaymentAccountService {
    double deposit(PaymentAccount account, double amount);
    double withdraw(PaymentAccount account, double amount);
    boolean hasSufficientFunds(PaymentAccount account, double cost);
}