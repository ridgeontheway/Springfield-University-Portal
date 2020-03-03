package com.coolGroup.org.services;

public interface IWorker {
    IStudentService studentService();
    IStaffService staffService();
    IModuleService moduleService();
    IEnrollmentService enrollmentService();
    IAnalyticsService analyticsService();
}
