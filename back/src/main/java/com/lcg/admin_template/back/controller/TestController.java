package com.lcg.admin_template.back.controller;

import com.lcg.admin_template.back.common.exception.GlobalException;
import com.lcg.admin_template.back.common.utils.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 用于测试环境搭建各个功能是否成功
 */
@RestController
@RequestMapping("/test")
@Api(tags = "测试页面")
public class TestController {

    /**
     * 用于测试 Result 是否能够正常返回指定格式的数据
     * @return
     */
    @GetMapping("/testResult")
    public Result testResult(){
        return Result.ok();
    }

    /**
     * 用于测试 异常 是否能被统一处理，并返回指定格式的数据
     * @return
     */
    @GetMapping("/testGlobalException")
    public Result testGlobalException() {
        try {
            int test = 10 / 0;
        } catch (Exception e) {
            throw new GlobalException(e.getMessage());
        }
        return Result.ok();
    }

    /**
     * 用于测试 Swagger 是否整合成功
     * @return
     */
    @ApiOperation(value = "测试 Swagger")
    @GetMapping("/testSwagger")
    public Result testSwagger() {
        return Result.ok();
    }
}
