package com.coolGroup.org.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Worker implements IWorker {
    private IStudentService studentService;
    private IModuleService moduleService;
    private IEnrollmentService enrollmentService;

    @Autowired
    public Worker(IStudentService studentService,
                  IModuleService moduleService, IEnrollmentService enrollmentService) {
        this.studentService = studentService;
        this.moduleService = moduleService;
        this.enrollmentService = enrollmentService;
    }

    @Override
    public IStudentService studentService() { return this.studentService; }

    @Override
    public IModuleService moduleService() { return this.moduleService; }

    @Override
    public IEnrollmentService enrollmentService() { return this.enrollmentService; }
}
