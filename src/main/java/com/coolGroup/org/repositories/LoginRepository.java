package com.coolGroup.org.repositories;

import com.coolGroup.org.models.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, Integer> {

}
