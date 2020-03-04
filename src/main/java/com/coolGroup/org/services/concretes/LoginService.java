package com.coolGroup.org.services.concretes;
import com.coolGroup.org.models.Login;
import com.coolGroup.org.models.Staff;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.repositories.LoginRepository;
import com.coolGroup.org.repositories.StudentRepository;
import com.coolGroup.org.services.abstracts.ILoginService;
import com.coolGroup.org.services.abstracts.IStaffService;
import com.coolGroup.org.services.abstracts.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService implements ILoginService {
    private IStudentService studentService;
    private IStaffService staffService;
    private StudentRepository studentRepository;
    private LoginRepository loginRepository;
    private Login login  = new Login();

    @Autowired
    public LoginService(LoginRepository loginRepository , IStudentService studentService) {
        this.loginRepository = loginRepository;
        this.studentService = studentService;
        //this.staffService = staffService;
    }

    @Override
    public Login get() {
        return login;
    }


    @Override
    public Login user(Login user) {
        // If null is returned, the login is incorrect

        if (!user.getEmail().equals("")) {
            if (user.getUserRole().equals("staff")) {
                Staff staff = this.staffService.getByEmail(user.getEmail());
                if (staff.getEmail().equals(user.getEmail()) && user.getPassword().equals(staff.getPassword())) {

                    login = new Login(staff.getId(), staff.getEmail(), user.getUserRole());
                    // login = this.loginRepository.saveAndFlush(login);
                } else {

                    login = null;
                }
            }

            if (user.getUserRole().equals("student")) {
                Student student = this.studentService.getByEmail(user.getEmail());
                if (student.getEmail().equals(user.getEmail()) && user.getPassword().equals(student.getPassword())) {

                    login = new Login(student.getId(), student.getEmail(), user.getUserRole());
                    // login = this.loginRepository.saveAndFlush(login);
                } else {
                    login = null;
                }
            }
        }

        return login;
    }

}