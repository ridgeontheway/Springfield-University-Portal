package com.coolGroup.org.services;

public interface IWorker {
    IStudentService studentService();
    IModuleService moduleService();
    IEnrollmentService enrollmentService();
    IStaffService staffService();
    IAnalyticsService analyticsService();
}
