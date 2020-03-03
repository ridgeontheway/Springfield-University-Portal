package com.coolGroup.org.services.concretes;

import com.coolGroup.org.models.Staff;
import com.coolGroup.org.repositories.StaffRepository;
import com.coolGroup.org.services.abstracts.IStaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService implements IStaffService {
    private StaffRepository staffRepository;

    @Autowired
    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    @Override
    public Iterable<Staff> get() {
        return staffRepository.findAll();
    }

    @Override
    public Staff get(Integer id) {
        return staffRepository.getOne(id);
    }

    @Override
    public Staff create(Staff staff) {
        return staffRepository.saveAndFlush(staff);
    }

    @Override
    public void createMultiple(final Staff[] staffs) {
        for (Staff staff : staffs) {
            create(staff);
        }
    }

    @Override
    public Staff delete(Integer id) {
        Staff deleted = staffRepository.getOne(id);
        staffRepository.delete(deleted);
        return deleted;
    }

    @Override
    public List<Staff> getByGender(String gender) {
        Optional<List<Staff>> staffs = this.staffRepository.getAllByGender(gender);
        List<Staff> result = null;
        if (staffs.isPresent()) {
            result = staffs.get();
        }
        return result;
    }
}
