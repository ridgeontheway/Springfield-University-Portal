package com.coolGroup.org.services.concretes;

import com.coolGroup.org.config.IpHandler;
import com.coolGroup.org.config.PermissionUtility;
import com.coolGroup.org.services.abstracts.IUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Utility implements IUtility {
    private PermissionUtility permissionUtility;
    private IpHandler ipHandler;

    @Autowired
    public Utility(PermissionUtility permissionUtility, IpHandler ipHandler) {
        this.permissionUtility = permissionUtility;
        this.ipHandler = ipHandler;
    }

    @Override
    public PermissionUtility permission() {
        return this.permissionUtility;
    }

    @Override
    public IpHandler ip() {
        return this.ipHandler;
    }
}
