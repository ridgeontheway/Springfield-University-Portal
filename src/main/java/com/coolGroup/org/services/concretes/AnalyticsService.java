package com.coolGroup.org.services.concretes;

import com.coolGroup.org.models.Staff;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.services.abstracts.IAnalyticsService;
import com.coolGroup.org.services.abstracts.IStaffService;
import com.coolGroup.org.services.abstracts.IStudentService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService implements IAnalyticsService {
    private IStudentService studentService;
    private IStaffService staffService;

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
        List<Student> otherStudents = this.studentService.getByGender("Other");
        distributions.put("male", maleStudents.size());
        distributions.put("female", femaleStudents.size());
        distributions.put("other", otherStudents.size());

        return distributions;
    }

    @Override
    public Map<String, Integer> getStaffGenderDistributions() {
        Map<String, Integer> distributions = new HashMap<>();
        List<Staff> maleStaff = this.staffService.getByGender("Male");
        List<Staff> femaleStaff = this.staffService.getByGender("Female");
        List<Staff> otherStaff = this.staffService.getByGender("Other");
        distributions.put("male", maleStaff.size());
        distributions.put("female", femaleStaff.size());
        distributions.put("other", otherStaff.size());

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
