package com.coolGroup.org.controllers.api;

import com.coolGroup.org.models.Login;
import com.coolGroup.org.services.abstracts.IWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/Login")
public class LoginController {
    private IWorker worker;

    @Autowired
    public LoginController(IWorker worker) { this.worker = worker; }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Login user(@RequestBody Login user) {
        return this.worker.loginService().user(user);
    }
    @GetMapping
    public @ResponseBody
    Login get() {

        return this.worker.loginService().get();
    }

}