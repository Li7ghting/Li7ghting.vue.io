package com.lcg.admin_template.back.controller;

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
    public TreeMenu selectOne(Long id) {
        return this.treeMenuService.queryById(id);
    }

}