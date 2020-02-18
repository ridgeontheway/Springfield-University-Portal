# Springfield-University-Portal

## Development Setup

Before running the application, a local MySQL Database needs to be created.

### MySQL Setup
**Step 1:** Ensure MySQL is intalled, and open a shell

**Step 2:** Create DB
    *  ```mysql> CREATE DATABASE su_portal;```

**Step 3:** Switch to DB
    *  ```mysql> use su_portal;```

**Step 4:** Create 'admin' user with default password
    *  ```mysql> CREATE USER 'admin'@'%' IDENTIFIED BY 'password';```

**Step 5:** Assign permissions to 'admin' user
    *  ```GRANT ALL ON su_portal.* to 'admin';```

### Running the Spring-Boot Application

**Step 1:** Ensure Maven, and Java, are installed

**Step 2:** Clean existing instances and install the app using maven
    * ```mvn clean && mvn install```

**Step 3:** Run the spring-boot application
    * ```./mvnw spring-boot:run```

**Step 4:** Visit the website through a web-browser
    * ```http://localhost:8080/```
