package com.lcg.admin_template.back.dao;

import com.lcg.admin_template.back.entity.TreeMenu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 * 树形菜单(TreeMenu)表数据库访问层
 *
 * @author makejava
 * @since 2020-06-30 09:37:25
 */
@Mapper
public interface TreeMenuDao {

    /**
     * 通过ID查询单条数据
     *
     * @param menuId 主键
     * @return 实例对象
     */
    TreeMenu queryById(Long menuId);

    /**
     * 查询指定行数据
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return 对象列表
     */
    List<TreeMenu> queryAllByLimit(@Param("offset") int offset, @Param("limit") int limit);


    /**
     * 通过实体作为筛选条件查询
     *
     * @param treeMenu 实例对象
     * @return 对象列表
     */
    List<TreeMenu> queryAll(TreeMenu treeMenu);

    /**
     * 新增数据
     *
     * @param treeMenu 实例对象
     * @return 影响行数
     */
    int insert(TreeMenu treeMenu);

    /**
     * 修改数据
     *
     * @param treeMenu 实例对象
     * @return 影响行数
     */
    int update(TreeMenu treeMenu);

    /**
     * 通过主键删除数据
     *
     * @param menuId 主键
     * @return 影响行数
     */
    int deleteById(Long menuId);

}
