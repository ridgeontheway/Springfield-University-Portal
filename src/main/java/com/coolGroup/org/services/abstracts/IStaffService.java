package com.coolGroup.org.services.abstracts;

import com.coolGroup.org.models.Staff;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IStaffService {
    Iterable<Staff> get();

    Staff get(Integer id);

    Staff create(final Staff staff);

    void createMultiple(final Staff[] staffs);

    Staff delete(Integer id);

    List<Staff> getByGender(String gender);

    Staff getByEmail(String email);
}
