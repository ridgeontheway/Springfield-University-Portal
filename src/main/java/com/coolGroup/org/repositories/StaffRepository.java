package com.coolGroup.org.repositories;

import com.coolGroup.org.models.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, Integer> {
}
