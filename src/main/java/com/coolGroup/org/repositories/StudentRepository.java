package com.coolGroup.org.repositories;

import com.coolGroup.org.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}
