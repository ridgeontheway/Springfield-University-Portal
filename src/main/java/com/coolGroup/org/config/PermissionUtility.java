package com.coolGroup.org.config;

import com.coolGroup.org.models.enums.Permission;
import com.coolGroup.org.services.abstracts.ILoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Service
public class PermissionUtility {
    private ILoginService loginService;

    @Autowired
    public PermissionUtility(ILoginService loginService) {
        this.loginService = loginService;
    }

    private final HashMap<String, List<Permission>> permissionMap =
            new HashMap<String, List<Permission>>() {{
                put("student", new ArrayList<>(
                        Arrays.asList(Permission.ENROLL,
                                Permission.UNENROLL,
                                Permission.VIEW_SCHOOL_STATISTICS)));
                put("staff", new ArrayList<>(
                        Arrays.asList(Permission.ASSIGN_GRADE,
                                Permission.EDIT_MODULE)));
            }};

    public boolean hasPermission(Permission permission) {
        String role = loginService.getRole();
        return permissionMap
                .get(role)
                .contains(permission);
    }
}
