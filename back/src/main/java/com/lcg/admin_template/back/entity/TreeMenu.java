package com.lcg.admin_template.back.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 树形菜单(TreeMenu)实体类
 *
 * @author makejava
 * @since 2020-06-30 09:37:25
 */
@Data
public class TreeMenu implements Serializable {
    private static final long serialVersionUID = -94109188163255892L;
    /**
    * 当前菜单ID
    */
    private Long menuId;
    /**
    * 菜单名
    */
    private String name;
    /**
    * 当前菜单的父菜单id
    */
    private Long parentMenuId;
    /**
    * 当前菜单的层级
    */
    private Integer menuLevel;
    /**
    * 排序
    */
    private Integer sort;

    /**
     * 用于保存一个菜单的子菜单
     */
    @TableField(exist = false)
    private List<TreeMenu> treeMenu;

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getParentMenuId() {
        return parentMenuId;
    }

    public void setParentMenuId(Long parentMenuId) {
        this.parentMenuId = parentMenuId;
    }

    public Integer getMenuLevel() {
        return menuLevel;
    }

    public void setMenuLevel(Integer menuLevel) {
        this.menuLevel = menuLevel;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }


}
