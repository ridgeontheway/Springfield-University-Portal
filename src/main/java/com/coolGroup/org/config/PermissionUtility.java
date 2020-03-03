package com.coolGroup.org.config;

import com.coolGroup.org.models.enums.Permission;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class PermissionUtility {
    private static final HashMap<String, List<Permission>> permissionMap =
            new HashMap<String, List<Permission>>() {{
                put("Student", new ArrayList<>(
                        Arrays.asList(Permission.ENROLL,
                                Permission.UNENROLL,
                                Permission.VIEW_SCHOOL_STATISTICS)));
                put("Staff", new ArrayList<>(
                        Arrays.asList(Permission.ASSIGN_GRADE,
                                Permission.EDIT_MODULE)));
            }};

    public static boolean hasPermission(Object role, Permission permission) {
        return permissionMap.get(role.getClass().toString()).contains(permission);
    }

}
