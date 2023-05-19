package com.sibi.Smartlocker.Configuration;

import com.sibi.Smartlocker.Filter.AuthenticationFilter;
import com.sibi.Smartlocker.Service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
    @Autowired
    SessionService sessionService;
    @Bean
    public FilterRegistrationBean someFilterRegistration() {

        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new AuthenticationFilter(sessionService));
        registration.addUrlPatterns("/api/*");
        registration.addUrlPatterns("/user/mobile_number/*");
        registration.setName("AuthenticationFilter");
        registration.setOrder(1);
        return registration;
    }
}
