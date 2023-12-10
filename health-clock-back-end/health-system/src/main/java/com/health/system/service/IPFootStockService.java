package com.health.system.service;

import java.util.List;
import com.health.system.domain.PFootStock;

/**
 * 食物库信息Service接口
 * 
 * @author health
 * @date 2022-05-27
 */
public interface IPFootStockService 
{
    /**
     * 查询食物库信息
     * 
     * @param id 食物库信息主键
     * @return 食物库信息
     */
    public PFootStock selectPFootStockById(Long id);

    /**
     * 查询食物库信息列表
     * 
     * @param pFootStock 食物库信息
     * @return 食物库信息集合
     */
    public List<PFootStock> selectPFootStockList(PFootStock pFootStock);

    /**
     * 新增食物库信息
     * 
     * @param pFootStock 食物库信息
     * @return 结果
     */
    public int insertPFootStock(PFootStock pFootStock);

    /**
     * 修改食物库信息
     * 
     * @param pFootStock 食物库信息
     * @return 结果
     */
    public int updatePFootStock(PFootStock pFootStock);

    /**
     * 批量删除食物库信息
     * 
     * @param ids 需要删除的食物库信息主键集合
     * @return 结果
     */
    public int deletePFootStockByIds(Long[] ids);

    /**
     * 删除食物库信息信息
     * 
     * @param id 食物库信息主键
     * @return 结果
     */
    public int deletePFootStockById(Long id);
}
