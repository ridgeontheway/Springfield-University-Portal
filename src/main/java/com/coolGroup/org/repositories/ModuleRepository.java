package com.coolGroup.org.repositories;

import com.coolGroup.org.models.Module;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModuleRepository extends JpaRepository<Module, Integer> {
}
