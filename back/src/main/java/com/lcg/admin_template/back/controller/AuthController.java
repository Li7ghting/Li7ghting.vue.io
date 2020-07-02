package com.lcg.admin_template.back.controller;

import com.lcg.admin_template.back.common.utils.Result;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @RequestMapping("/token")
    public Result getToken() {
        return Result.ok().data("token", "admin");
    }
}
