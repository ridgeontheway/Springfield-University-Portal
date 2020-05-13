package com.coolGroup.org.services.concretes;

import com.coolGroup.org.models.Login;
import com.coolGroup.org.models.Staff;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.services.abstracts.ILoginService;
import com.coolGroup.org.services.abstracts.IStaffService;
import com.coolGroup.org.services.abstracts.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService implements ILoginService {
    private IStudentService studentService;
    private IStaffService staffService;
    private Login login;

    @Autowired
    public LoginService(IStudentService studentService, IStaffService staffService) {
        this.studentService = studentService;
        this.staffService = staffService;
        login = null;
    }

    @Override
    public Login getLoggedInUser() {
        return login;
    }

    @Override
    public Login loginUser(Login loggedIn) {
        login = null;
        loggedIn.setUser_role(loggedIn.getUser_role().toLowerCase());
        if (loggedIn.getUser_role().equals("staff")) {
            Staff staff = this.staffService.getByEmail(loggedIn.getEmail());
            if (staff.getEmail().equals(loggedIn.getEmail()) && loggedIn.getPassword().equals(staff.getPassword())) {
                login = new Login(staff.getId(), staff.getEmail(), "***", loggedIn.getUser_role());
            }
        }

        if (loggedIn.getUser_role().equals("student")) {
            Student student = this.studentService.getByEmail(loggedIn.getEmail());
            if (student.getEmail().equals(loggedIn.getEmail()) && loggedIn.getPassword().equals(student.getPassword())) {
                login = new Login(student.getId(), student.getEmail(), "***", loggedIn.getUser_role());
            }
        }
        return login;
    }

    @Override
    public void logoutUser() {
        this.login = null;
    }

    @Override
    public String getRole() {
        return login != null ? login.getUser_role() : "";
    }

}