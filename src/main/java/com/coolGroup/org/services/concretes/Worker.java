package com.coolGroup.org.services.concretes;

import com.coolGroup.org.services.abstracts.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Worker implements IWorker {
    private IStudentService studentService;
    private IStaffService staffService;
    private IModuleService moduleService;
    private IEnrollmentService enrollmentService;
    private IAnalyticsService analyticsService;
    private ILoginService loginService;
    private ILoggingService loggingService;

    @Autowired
    public Worker(IStudentService studentService, IStaffService staffService,
                  IModuleService moduleService, IEnrollmentService enrollmentService,
                  IAnalyticsService analyticsService, ILoginService loginService,
                  ILoggingService loggingService) {
        this.studentService = studentService;
        this.staffService = staffService;
        this.moduleService = moduleService;
        this.enrollmentService = enrollmentService;
        this.analyticsService = analyticsService;
        this.loginService=loginService;
        this.loggingService = loggingService;
    }

    @Override
    public IStudentService studentService() {
        return this.studentService;
    }

    @Override
    public IStaffService staffService() {
        return this.staffService;
    }

    @Override
    public IModuleService moduleService() {
        return this.moduleService;
    }
    @Override
    public ILoginService loginService() {
        return this.loginService;
    }

    @Override
    public IEnrollmentService enrollmentService() {
        return this.enrollmentService;
    }

    @Override
    public IAnalyticsService analyticsService() {
        return this.analyticsService;
    }

    @Override
    public ILoggingService log() {
        return this.loggingService;
    }
}
