package com.coolGroup.org.controllers.api;

import com.coolGroup.org.models.Staff;
import com.coolGroup.org.services.abstracts.IWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/staff")
public class StaffController {
    private IWorker worker;

    @Autowired
    public StaffController(IWorker worker) {
        this.worker = worker;
    }

    @GetMapping
    public Iterable<Staff> get() {
        return this.worker.staffService().get();
    }

    @GetMapping(path = "{id}")
    public Staff get(@PathVariable Integer id) {
        return worker.staffService().get(id);
    }

    @GetMapping(path = "email/{email}")
    public Staff getByEmail(@PathVariable String email) {
        return worker.staffService().getByEmail(email);
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:8080")
    @ResponseStatus(HttpStatus.CREATED)
    public Staff create(@RequestBody final Staff staff) {
        Staff newStaff = worker.staffService().create(staff);
        this.worker.log().createStaff(newStaff);
        return newStaff;
    }

    @RequestMapping(path = "multiple", method = RequestMethod.POST)
    public void createMultiple(@RequestBody final Staff[] staffs) {
        worker.staffService().createMultiple(staffs);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public Staff delete(@PathVariable Integer id) {
        this.worker.log().deleteStaff(id);
        return worker.staffService().delete(id);
    }
}
