package com.coolGroup.org.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String email;
    private String password;
    private String userRole;
    public Login() {}

    public Login(Integer id, String email, String userRole) {
        this.id = id;
        this.email = email;
        this.userRole=userRole;
    }
    public Login(String email, String password, String user_role) {
        this.email = email;
        this.password=password;
        this.userRole=user_role;
    }


    public Integer getId() {
        return this.id;
    }
    public String getEmail() {
        return this.email;
    }
    public String getPassword() {
        return this.password;
    }
    public String getUserRole() {
        return this.userRole;
    }
}
