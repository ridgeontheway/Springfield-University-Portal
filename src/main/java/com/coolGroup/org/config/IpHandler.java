package com.coolGroup.org.config;

import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.StringTokenizer;

@Service
public class IpHandler {
    private String current;
    private int count;

    public String getCurrentIp() {
        return this.current;
    }

    public int getInvalidLoginsCount() {
        return this.count;
    }

    // Code from: https://stackoverflow.com/questions/9767480/accessing-httpservletrequest-object-in-a-normal-java-class-from-spring
    public void getClientIpAddress() {
        HttpServletRequest request =
                ((ServletRequestAttributes)RequestContextHolder
                        .getRequestAttributes()).getRequest();
        String xForwardedForHeader = request.getHeader("X-Forwarded-For");
        if (xForwardedForHeader == null) {
            this.current = request.getRemoteAddr();
        } else {
            this.current = new StringTokenizer(xForwardedForHeader, ",").nextToken().trim();
        }
    }

    public int trackIp() {
        String oldIp = this.current;
        getClientIpAddress();
        if (!this.current.equals(oldIp)) {
            count = 0;
        }
        count++;
        return count;
    }

    public boolean isIpBlocked() {
        return this.count > 2;
    }
}
