package com.health.system.service.impl;

import java.util.List;
import com.health.common.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.health.system.mapper.PFootStockMapper;
import com.health.system.domain.PFootStock;
import com.health.system.service.IPFootStockService;

/**
 * 食物库信息Service业务层处理
 * 
 * @author health
 * @date 2022-05-27
 */
@Service
public class PFootStockServiceImpl implements IPFootStockService 
{
    @Autowired
    private PFootStockMapper pFootStockMapper;

    /**
     * 查询食物库信息
     * 
     * @param id 食物库信息主键
     * @return 食物库信息
     */
    @Override
    public PFootStock selectPFootStockById(Long id)
    {
        return pFootStockMapper.selectPFootStockById(id);
    }

    /**
     * 查询食物库信息列表
     * 
     * @param pFootStock 食物库信息
     * @return 食物库信息
     */
    @Override
    public List<PFootStock> selectPFootStockList(PFootStock pFootStock)
    {
        return pFootStockMapper.selectPFootStockList(pFootStock);
    }

    /**
     * 新增食物库信息
     * 
     * @param pFootStock 食物库信息
     * @return 结果
     */
    @Override
    public int insertPFootStock(PFootStock pFootStock)
    {
        pFootStock.setCreateTime(DateUtils.getNowDate());
        return pFootStockMapper.insertPFootStock(pFootStock);
    }

    /**
     * 修改食物库信息
     * 
     * @param pFootStock 食物库信息
     * @return 结果
     */
    @Override
    public int updatePFootStock(PFootStock pFootStock)
    {
        pFootStock.setUpdateTime(DateUtils.getNowDate());
        return pFootStockMapper.updatePFootStock(pFootStock);
    }

    /**
     * 批量删除食物库信息
     * 
     * @param ids 需要删除的食物库信息主键
     * @return 结果
     */
    @Override
    public int deletePFootStockByIds(Long[] ids)
    {
        return pFootStockMapper.deletePFootStockByIds(ids);
    }

    /**
     * 删除食物库信息信息
     * 
     * @param id 食物库信息主键
     * @return 结果
     */
    @Override
    public int deletePFootStockById(Long id)
    {
        return pFootStockMapper.deletePFootStockById(id);
    }
}
