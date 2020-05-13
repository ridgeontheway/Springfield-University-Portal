package com.coolGroup.org.controllers.api;

import com.coolGroup.org.models.Login;
import com.coolGroup.org.services.abstracts.IUtility;
import com.coolGroup.org.services.abstracts.IWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/login")
public class LoginController {
    private IWorker worker;
    private IUtility utility;

    @Autowired
    public LoginController(IWorker worker, IUtility utility) {
        this.worker = worker;
        this.utility = utility;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Login loginUser(@RequestBody Login user) {
        System.out.println(this.utility.ip().getClientIpAddress());
        Login login = this.worker.loginService().loginUser(user);
        System.out.println(login);
        if (login == null || login.getId() == -1) {
            this.worker.log().loginFailed(user);
            login = null;
        }
        else {
            this.worker.log().loginUser();
        }
        return login;
    }

    @GetMapping(path = "logout")
    public void logoutUser() {
        this.worker.log().logoutUser();
        this.worker.loginService().logoutUser();
    }

    @GetMapping
    public Login getLoggedInUser() {
        return this.worker.loginService().getLoggedInUser();
    }

}