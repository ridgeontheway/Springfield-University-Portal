package com.coolGroup.org.services.abstracts;

public interface IWorker {
    IStudentService studentService();

    ILoginService loginService();

    IStaffService staffService();

    IModuleService moduleService();

    IEnrollmentService enrollmentService();

    IAnalyticsService analyticsService();

    ILoggingService log();
}
