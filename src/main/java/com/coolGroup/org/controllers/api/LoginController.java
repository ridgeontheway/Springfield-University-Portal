package com.coolGroup.org.controllers.api;

import com.coolGroup.org.models.Login;
import com.coolGroup.org.services.abstracts.IWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/login")
public class LoginController {
    private IWorker worker;

    @Autowired
    public LoginController(IWorker worker) { this.worker = worker; }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Login loginUser(@RequestBody Login user) {
        return this.worker.loginService().loginUser(user);
    }

    @GetMapping(path = "logout")
    public void logoutUser() { this.worker.loginService().logoutUser(); }

    @GetMapping
    public Login getLoggedInUser() {
        return this.worker.loginService().getLoggedInUser();
    }

}