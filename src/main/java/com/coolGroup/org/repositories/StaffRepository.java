package com.coolGroup.org.repositories;

import com.coolGroup.org.models.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Integer> {
    Optional<List<Staff>> getAllByGender(String gender);
}
