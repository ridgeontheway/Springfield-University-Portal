package com.coolGroup.org.controllers.utils;


import com.coolGroup.org.config.BootstrapperUtility;
import com.coolGroup.org.services.abstracts.IWorker;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api")
public class BootstrapperUtilityController {
    public IWorker worker;

    public BootstrapperUtilityController(IWorker worker) {
        this.worker = worker;
    }

    @GetMapping(path = "bootstrap")
    @ResponseStatus(HttpStatus.CREATED)
    public String bootstrap() {
        BootstrapperUtility bsu = new BootstrapperUtility(this.worker);
        return bsu.init();
    }
}
