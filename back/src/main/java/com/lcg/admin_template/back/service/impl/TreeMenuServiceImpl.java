package com.lcg.admin_template.back.service.impl;

import com.lcg.admin_template.back.entity.TreeMenu;
import com.lcg.admin_template.back.dao.TreeMenuDao;
import com.lcg.admin_template.back.service.TreeMenuService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 树形菜单(TreeMenu)表服务实现类
 *
 * @author makejava
 * @since 2020-06-30 09:37:25
 */
@Service("treeMenuService")
public class TreeMenuServiceImpl implements TreeMenuService {
    @Resource
    private TreeMenuDao treeMenuDao;

    /**
     * 通过ID查询单条数据
     *
     * @param menuId 主键
     * @return 实例对象
     */
    @Override
    public TreeMenu queryById(Long menuId) {
        return this.treeMenuDao.queryById(menuId);
    }

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return 对象列表
     */
    @Override
    public List<TreeMenu> queryAllByLimit(int offset, int limit) {
        return this.treeMenuDao.queryAllByLimit(offset, limit);
    }

    /**
     * 新增数据
     *
     * @param treeMenu 实例对象
     * @return 实例对象
     */
    @Override
    public TreeMenu insert(TreeMenu treeMenu) {
        this.treeMenuDao.insert(treeMenu);
        return treeMenu;
    }

    /**
     * 修改数据
     *
     * @param treeMenu 实例对象
     * @return 实例对象
     */
    @Override
    public TreeMenu update(TreeMenu treeMenu) {
        this.treeMenuDao.update(treeMenu);
        return this.queryById(treeMenu.getMenuId());
    }

    /**
     * 通过主键删除数据
     *
     * @param menuId 主键
     * @return 是否成功
     */
    @Override
    public boolean deleteById(Long menuId) {
        return this.treeMenuDao.deleteById(menuId) > 0;
    }
}