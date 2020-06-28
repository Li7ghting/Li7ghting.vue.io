package com.lcg.admin_template.back.common.exception;

import com.lcg.admin_template.back.common.utils.Result;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理类。
 * 使用 slf4j 保存日志信息。
 * 此处使用了 统一结果处理 类 Result 用于包装异常信息。
 * 使用 @Slf4j 标注类。
 * 使用 log.error() 打印日志信息。
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    private Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * 处理 Exception 异常
     * @param e 异常
     * @return 处理结果
     */
    @ExceptionHandler(Exception.class)
    public Result handlerException(Exception e) {
//        logger.error(e.getMessage(), e);
        log.error(e.getMessage());
        return Result.error().message("系统异常");
    }

    /**
     * 处理空指针异常
     * @param e 异常
     * @return 处理结果
     */
    @ExceptionHandler(NullPointerException.class)
    public Result handlerNullPointerException(NullPointerException e) {
//        logger.error(e.getMessage(), e);
        log.error(e.getMessage());
        return Result.error().message("空指针异常");
    }

    /**
     * 处理自定义异常
     * @param e 异常
     * @return 处理结果
     */
    @ExceptionHandler(GlobalException.class)
    public Result handlerGlobalException(GlobalException e) {
//        logger.error(e.getMessage(), e);
        log.error(e.getMessage());
        return Result.error().message(e.getMessage()).code(e.getCode());
    }
}
