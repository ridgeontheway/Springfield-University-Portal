package com.coolGroup.org.services;

import org.springframework.stereotype.Service;

@Service
public class Worker implements IWorker {
    private IStudentService studentService;
    private IStaffService staffService;
    private IModuleService moduleService;
    private IEnrollmentService enrollmentService;
    private IAnalyticsService analyticsService;

    @Autowired
    public Worker(IStudentService studentService, IStaffService staffService,
                  IModuleService moduleService, IEnrollmentService enrollmentService,
                  IAnalyticsService analyticsService) {
        this.studentService = studentService;
        this.staffService = staffService;
        this.moduleService = moduleService;
        this.enrollmentService = enrollmentService;
        this.analyticsService = analyticsService;
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
    public IEnrollmentService enrollmentService() {
        return this.enrollmentService;
    }

    @Override
    public IAnalyticsService analyticsService() {
        return this.analyticsService;
    }
}
