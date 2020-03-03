package com.coolGroup.org.services.concretes;

import com.coolGroup.org.models.Staff;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.services.abstracts.IAnalyticsService;
import com.coolGroup.org.services.abstracts.IStaffService;
import com.coolGroup.org.services.abstracts.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService implements IAnalyticsService {
    private IStudentService studentService;
    private IStaffService staffService;

    @Autowired
    public AnalyticsService(IStudentService studentService, IStaffService staffService) {
        this.studentService = studentService;
        this.staffService = staffService;
    }

    @Override
    public Map<String, Map<String, Integer>> getGenderDistributions() {
        Map<String, Map<String, Integer>> distributions = new HashMap<>();
        distributions.put("students", getStudentGenderDistributions());
        distributions.put("staff", getStaffGenderDistributions());
        return distributions;
    }

    @Override
    public Map<String, Integer> getStudentGenderDistributions() {
        Map<String, Integer> distributions = new HashMap<>();
        List<Student> maleStudents = this.studentService.getByGender("Male");
        List<Student> femaleStudents = this.studentService.getByGender("Female");
        distributions.put("male", maleStudents != null ? maleStudents.size() : 0);
        distributions.put("female", femaleStudents != null ? femaleStudents.size() : 0);

        return distributions;
    }

    @Override
    public Map<String, Integer> getStaffGenderDistributions() {
        Map<String, Integer> distributions = new HashMap<>();
        List<Staff> maleStaff = this.staffService.getByGender("Male");
        List<Staff> femaleStaff = this.staffService.getByGender("Female");
        distributions.put("male", maleStaff != null ? maleStaff.size() : 0);
        distributions.put("female", femaleStaff != null ? femaleStaff.size() : 0);

        return distributions;
    }

    @Override
    public Map<String, Integer> getNationalityDistributions() {
        Map<String, Integer> distributions = new HashMap<>();
        Iterable<Student> students = this.studentService.get();
        for (Student student : students) {
            String nationality = student.getNationality();
            if (!distributions.containsKey(nationality)) {
                distributions.put(nationality, 0);
            }
            distributions.put(nationality, distributions.get(nationality) + 1);
        }

        return distributions;
    }
}
