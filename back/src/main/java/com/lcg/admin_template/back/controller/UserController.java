package com.lcg.admin_template.back.controller;

import com.lcg.admin_template.back.common.exception.GlobalException;
import com.lcg.admin_template.back.common.utils.ExceptionUtil;
import com.lcg.admin_template.back.common.utils.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test_mybatis_plus/user")
@Slf4j
public class UserController {

    @GetMapping("/test")
    public Result test(){
        try {
            System.out.println(1/0);
        }catch (Exception e){
            throw new GlobalException(ExceptionUtil.getMessage(e));
        }
        return Result.ok().data("item","");
    }
}
