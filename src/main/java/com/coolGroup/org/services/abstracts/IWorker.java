package com.coolGroup.org.services.abstracts;

public interface IWorker {
    IStudentService studentService();
    IStaffService staffService();
    IModuleService moduleService();
    IEnrollmentService enrollmentService();
    IAnalyticsService analyticsService();
}
