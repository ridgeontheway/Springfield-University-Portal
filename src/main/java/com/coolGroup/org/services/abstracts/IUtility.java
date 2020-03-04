package com.coolGroup.org.services.abstracts;

import com.coolGroup.org.config.PermissionUtility;
import org.springframework.stereotype.Service;

@Service
public interface IUtility {
    PermissionUtility permission();
}
