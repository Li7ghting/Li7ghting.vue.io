package com.lcg.admin_template.back.service.impl;

import com.lcg.admin_template.back.entity.TreeMenu;
import com.lcg.admin_template.back.dao.TreeMenuDao;
import com.lcg.admin_template.back.service.TreeMenuService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

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

    /**
     * 查询数据库所有数据
     * @return 对象列表
     */
    @Override
    public List<TreeMenu> queryAll() {
        return treeMenuDao.queryAll(null);
    }

    /**
     * 查询数据库数据，并处理后返回 树形数据
     * @return 树形数据
     */
    @Override
    public List<TreeMenu> listWithTree() {
        // 查找所有菜单数据
        List<TreeMenu> lists = treeMenuDao.queryAll(null);
        // 把数据组合成树形结构
        List<TreeMenu> result = lists.stream()
                // 查找第一级菜单
                .filter(meun -> meun.getMenuLevel() == 1)
                // 查找子菜单并放到第一级菜单中
                .map(menu -> {
                    menu.setTreeMenu(getChildren(menu, lists));
                    return menu;
                })
                // 根据排序字段排序
                .sorted((menu1, menu2) -> {
                    return (menu1.getSort() == null ? 0 : menu1.getSort()) - (menu2.getSort() == null ? 0 : menu2.getSort());
                })
                // 把处理结果收集成一个 List 集合
                .collect(Collectors.toList());
        return result;
    }

    /**
     * 递归获取子菜单
     * @param root 当前菜单
     * @param all 总的数据
     * @return 子菜单
     */
    public List<TreeMenu> getChildren(TreeMenu root, List<TreeMenu> all) {
        List<TreeMenu> children = all.stream()
                // 根据 父菜单 ID 查找当前菜单 ID，以便于找到 当前菜单的子菜单
                .filter(menu -> menu.getParentMenuId() == root.getMenuId())
                // 递归查找子菜单的子菜单
                .map((menu) -> {
                    menu.setTreeMenu(getChildren(menu, all));
                    return menu;
                })
                // 根据排序字段排序
                .sorted((menu1, menu2) -> {
                    return (menu1.getSort() == null ? 0 : menu1.getSort()) - (menu2.getSort() == null ? 0 : menu2.getSort());
                })
                // 把处理结果收集成一个 List 集合
                .collect(Collectors.toList());
        return children;
    }
}
