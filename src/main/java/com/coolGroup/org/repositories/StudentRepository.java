package com.coolGroup.org.repositories;

import com.coolGroup.org.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    Optional<List<Student>> getAllByGender(String gender);

    Optional<List<Student>> getAllByNationality(String nationality);

    Optional<Student> getByEmail(String email);
}
