package com.lcg.admin_template.back.service;

import com.lcg.admin_template.back.entity.TreeMenu;
import java.util.List;

/**
 * 树形菜单(TreeMenu)表服务接口
 *
 * @author makejava
 * @since 2020-06-30 09:37:25
 */
public interface TreeMenuService {

    /**
     * 通过ID查询单条数据
     *
     * @param menuId 主键
     * @return 实例对象
     */
    TreeMenu queryById(Long menuId);

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return 对象列表
     */
    List<TreeMenu> queryAllByLimit(int offset, int limit);

    /**
     * 新增数据
     *
     * @param treeMenu 实例对象
     * @return 实例对象
     */
    TreeMenu insert(TreeMenu treeMenu);

    /**
     * 修改数据
     *
     * @param treeMenu 实例对象
     * @return 实例对象
     */
    TreeMenu update(TreeMenu treeMenu);

    /**
     * 通过主键删除数据
     *
     * @param menuId 主键
     * @return 是否成功
     */
    boolean deleteById(Long menuId);

    /**
     * 查询全部数据
     * @return 对象列表
     */
    List<TreeMenu> queryAll();

    /**
     * 查询数据库数据，并处理后返回 树形数据
     * @return 树形数据
     */
    List<TreeMenu> listWithTree();
}
