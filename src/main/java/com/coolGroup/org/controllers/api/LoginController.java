package com.coolGroup.org.controllers.api;

import com.coolGroup.org.config.PasswordHandler;
import com.coolGroup.org.models.Login;
import com.coolGroup.org.services.abstracts.IUtility;
import com.coolGroup.org.services.abstracts.IWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
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
        Login login;
        if (this.utility.ip().isIpBlocked()) {
            this.worker.log().ipBlocked(this.utility.ip().getCurrentIp());
            login = null;
        }
        else {
            login = this.worker.loginService().loginUser(user);
            if (login == null || login.getId() == -1) {
                this.worker.log().loginFailed(user);
                this.utility.ip().trackIp();
                this.worker.log().trackIp(this.utility.ip().getCurrentIp(),
                        this.utility.ip().getInvalidLoginsCount());
                login = null;
            }
            else {
                this.worker.log().loginUser();
            }
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