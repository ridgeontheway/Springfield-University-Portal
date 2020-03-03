package com.coolGroup.org.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Worker implements IWorker {
    private IStudentService studentService;
    private IModuleService moduleService;
    private IEnrollmentService enrollmentService;
    private IStaffService staffService;

    @Autowired
    public Worker(IStudentService studentService, IModuleService moduleService,
                  IEnrollmentService enrollmentService, IStaffService staffService) {
        this.studentService = studentService;
        this.moduleService = moduleService;
        this.enrollmentService = enrollmentService;
        this.staffService = staffService;
    }

    @Override
    public IStudentService studentService() { return this.studentService; }

    @Override
    public IModuleService moduleService() { return this.moduleService; }

    @Override
    public IEnrollmentService enrollmentService() { return this.enrollmentService; }

    @Override
    public IStaffService staffService() { return this.staffService; }
}
