package com.sibi.Smartlocker.Controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactController {
    @GetMapping(value = { "/**/{path:[^\\.]*}"})
    public String index() {
        return "forward:/";
    }
}
