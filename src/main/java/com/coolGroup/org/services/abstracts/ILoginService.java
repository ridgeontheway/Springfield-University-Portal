package com.coolGroup.org.services.abstracts;

import com.coolGroup.org.models.Login;
import org.springframework.stereotype.Service;

@Service
public interface ILoginService {

    Login getLoggedInUser();

    Login loginUser(Login loggedIn);

    void logoutUser();

    String getRole();
}