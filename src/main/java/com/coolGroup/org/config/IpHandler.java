package com.coolGroup.org.config;

import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.StringTokenizer;

@Service
public class IpHandler {
    public String getClientIpAddress() {
        HttpServletRequest request =
                ((ServletRequestAttributes)RequestContextHolder
                        .getRequestAttributes()).getRequest();
        String xForwardedForHeader = request.getHeader("X-Forwarded-For");
        if (xForwardedForHeader == null) {
            return request.getRemoteAddr();
        } else {
            return new StringTokenizer(xForwardedForHeader, ",").nextToken().trim();
        }
    }
}
