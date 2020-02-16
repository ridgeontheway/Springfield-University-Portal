package com.coolGroup.org.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Worker implements IWorker {
    private IStudentService studentService;
    private IModuleService moduleService;

    @Autowired
    public Worker(IStudentService studentService,
                  IModuleService moduleService) {
        this.studentService = studentService;
        this.moduleService = moduleService;
    }

    @Override
    public IStudentService studentService() {
        return this.studentService;
    }

    @Override
    public IModuleService moduleService() { return this.moduleService; }
}
