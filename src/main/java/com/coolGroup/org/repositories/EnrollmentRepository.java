package com.coolGroup.org.repositories;

import com.coolGroup.org.models.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
    Optional<Enrollment> findByStudentAndModule(Integer student, Integer module);
    void deleteEnrollmentById(Integer id);
    Optional<List<Enrollment>> findAllByStudent(Integer student);
    Optional<List<Enrollment>> findAllByModule(Integer module);
}
