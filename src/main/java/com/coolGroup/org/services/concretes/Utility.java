package com.coolGroup.org.services.concretes;

import com.coolGroup.org.config.PermissionUtility;
import com.coolGroup.org.services.abstracts.IUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Utility implements IUtility {
    private PermissionUtility permissionUtility;

    @Autowired
    public Utility(PermissionUtility permissionUtility) {
        this.permissionUtility = permissionUtility;
    }

    @Override
    public PermissionUtility permission() {
        return permissionUtility;
    }
}
