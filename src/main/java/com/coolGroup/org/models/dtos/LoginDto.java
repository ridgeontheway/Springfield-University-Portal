package com.coolGroup.org.models.dtos;
public class LoginDto {
    private Integer Student_id;
    private String email;
    private String password;
    private String userRole;

    public LoginDto(String email, String password, String user_role) {
        this.email=email;
        this.password=password;
        this.userRole=user_role;
    }
    public int getStudentId() {
        return Student_id;
    }
    public String getbyEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
    public String getUserRole() { return userRole;
    }
}