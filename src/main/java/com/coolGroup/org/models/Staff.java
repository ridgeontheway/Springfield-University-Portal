package com.coolGroup.org.models;

import com.coolGroup.org.models.abstracts.IUser;
import com.coolGroup.org.models.abstracts.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Staff extends User implements IUser {

    public Staff() { }

    public Staff(String name, String surname, String email,
                 String password, String gender) {
        super(name, surname, gender, email, password);
    }
}
