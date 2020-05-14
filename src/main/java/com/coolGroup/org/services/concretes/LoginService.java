package com.coolGroup.org.services.concretes;

import com.coolGroup.org.config.PasswordHandler;
import com.coolGroup.org.models.Login;
import com.coolGroup.org.models.Staff;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.services.abstracts.ILoginService;
import com.coolGroup.org.services.abstracts.IStaffService;
import com.coolGroup.org.services.abstracts.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService implements ILoginService {
    private IStudentService studentService;
    private IStaffService staffService;
    private Login login;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public LoginService(IStudentService studentService, IStaffService staffService) {
        this.studentService = studentService;
        this.staffService = staffService;
        login = null;
        this.passwordEncoder = PasswordHandler.passwordEncoder();
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
            try {
                Staff staff = this.staffService.getByEmail(loggedIn.getEmail());
                if (staff.getEmail().equals(loggedIn.getEmail()) &&
                        passwordEncoder.matches(loggedIn.getPassword(), staff.getPassword())) {
                    login = new Login(staff.getId(), staff.getEmail(),
                            "***", loggedIn.getUser_role());
                }
            } catch (Exception e) {
                login = handleInavlidLogin(loggedIn);
            }
        }

        if (loggedIn.getUser_role().equals("student")) {
            try {
                Student student = this.studentService.getByEmail(loggedIn.getEmail());
                if (student.getEmail().equals(loggedIn.getEmail()) &&
                        passwordEncoder.matches(loggedIn.getPassword(), student.getPassword())) {
                    login = new Login(student.getId(), student.getEmail(),
                            "***", loggedIn.getUser_role());
                }
            } catch (Exception e) {
                login = handleInavlidLogin(loggedIn);
            }

        }
        return login;
    }

    private Login handleInavlidLogin(Login loggedIn) {
        return new Login(
                -1,
                loggedIn.getEmail(),
                loggedIn.getPassword(),
                loggedIn.getUser_role()
        );
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