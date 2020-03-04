package com.coolGroup.org.models;

public class Login {
    private int id;
    private String email;
    private String password;
    private String user_role;

    public Login(int id, String email, String password, String user_role) {
        this.id=id;
        this.email = email;
        this.password = password;
        this.user_role = user_role;
    }

    public int getId() {
        return id;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUser_role() {
        return user_role;
    }

    public void setUser_role(String user_role) {
        this.user_role = user_role;
    }
}
