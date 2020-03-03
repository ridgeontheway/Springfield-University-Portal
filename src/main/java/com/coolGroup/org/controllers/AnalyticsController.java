package com.coolGroup.org.controllers;

import com.coolGroup.org.services.IWorker;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(path = "api/analytics")
public class AnalyticsController {
    private IWorker worker;

    public AnalyticsController(IWorker worker) {
        this.worker = worker;
    }

    @GetMapping(path = "gender")
    public Map<String, Map<String, Integer>> getGenderDistributions() {
        return this.worker.analyticsService().getGenderDistributions();
    }

    @GetMapping(path = "gender/student")
    public Map<String, Integer> getStudentGenderDistributions() {
        return this.worker.analyticsService().getStudentGenderDistributions();
    }

    @GetMapping(path = "gender/staff")
    public Map<String, Integer> getStaffGenderDistributions() {
        return this.worker.analyticsService().getStaffGenderDistributions();
    }

    @GetMapping(path = "nationality")
    public Map<String, Integer> getNationalityDistributions() {
        return this.worker.analyticsService().getNationalityDistributions();
    }
}
