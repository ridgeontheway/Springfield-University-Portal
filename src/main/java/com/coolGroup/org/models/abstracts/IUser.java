package com.coolGroup.org.models.abstracts;

public interface IUser {
    Integer getId();

    void setId(Integer id);

    String getName();

    void setName(String name);

    String getSurname();

    void setSurname(String surname);

    String getEmail();

    void setEmail(String email);

    String getPassword();

    void setPassword(String password);

    String getGender();

    void setGender(String gender);
}
