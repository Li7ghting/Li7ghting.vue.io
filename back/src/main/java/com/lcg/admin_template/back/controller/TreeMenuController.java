package com.lcg.admin_template.back.controller;

import com.lcg.admin_template.back.common.exception.GlobalException;
import com.lcg.admin_template.back.common.utils.Result;
import com.lcg.admin_template.back.entity.TreeMenu;
import com.lcg.admin_template.back.service.TreeMenuService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 树形菜单(TreeMenu)表控制层
 *
 * @author makejava
 * @since 2020-06-30 09:37:25
 */
@RestController
@RequestMapping("treeMenu")
public class TreeMenuController {
    /**
     * 服务对象
     */
    @Resource
    private TreeMenuService treeMenuService;

    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("selectOne")
    public Result selectOne(Long id) {
        TreeMenu tm = this.treeMenuService.queryById(id);
        if (id == null) {
            throw new NullPointerException();
        }
        if (id == -1) {
            throw new GlobalException("参数异常", 400);
        }
        if (tm == null){
            return Result.error().message("用户不存在");
        }
        return Result.ok().data("item",tm).message("查询成功");
    }

    /**
     * @return 获取所有数据
     */
    @GetMapping("selectAll")
    public Result selectAll(){
        return Result.ok().data("items",treeMenuService.queryAll());
    }

    /**
     * 获取数据库数据，并处理成树形结构
     * @return 树形结构数据
     */
    @GetMapping("selectAllWithTree")
    public Result selectAllWithTree() {
        return Result.ok().data("items", treeMenuService.listWithTree());
    }
}
