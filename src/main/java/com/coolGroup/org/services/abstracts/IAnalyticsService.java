package com.coolGroup.org.services.abstracts;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface IAnalyticsService {
    Map<String, Map<String, Integer>> getGenderDistributions();

    Map<String, Integer> getStudentGenderDistributions();

    Map<String, Integer> getStaffGenderDistributions();

    Map<String, Integer> getNationalityDistributions();
}
