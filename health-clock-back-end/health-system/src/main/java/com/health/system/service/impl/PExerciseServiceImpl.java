package com.health.system.service.impl;

import java.util.List;

import cn.hutool.core.util.ObjectUtil;
import com.health.common.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.health.system.mapper.PExerciseMapper;
import com.health.system.domain.PExercise;
import com.health.system.service.IPExerciseService;

/**
 * 运动库信息Service业务层处理
 * 
 * @author health
 * @date 2022-06-04
 */
@Service
public class PExerciseServiceImpl implements IPExerciseService 
{
    @Autowired
    private PExerciseMapper pExerciseMapper;

    /**
     * 查询运动库信息
     * 
     * @param id 运动库信息主键
     * @return 运动库信息
     */
    @Override
    public PExercise selectPExerciseById(Long id)
    {
        return pExerciseMapper.selectPExerciseById(id);
    }

    /**
     * 查询运动库信息列表
     * 
     * @param pExercise 运动库信息
     * @return 运动库信息
     */
    @Override
    public List<PExercise> selectPExerciseList(PExercise pExercise)
    {
        return pExerciseMapper.selectPExerciseList(pExercise);
    }

    /**
     * 新增运动库信息
     * 
     * @param pExercise 运动库信息
     * @return 结果
     */
    @Override
    public int insertPExercise(PExercise pExercise)
    {
        PExercise pExercise1 = pExerciseMapper.selectPExerciseByExerciseNameAdd(pExercise);
        if(ObjectUtil.isNotNull(pExercise1)){
            throw new RuntimeException("名称已存在!");
        }else {
            pExercise.setCreateTime(DateUtils.getNowDate());
            return pExerciseMapper.insertPExercise(pExercise);
        }

    }

    /**
     * 修改运动库信息
     * 
     * @param pExercise 运动库信息
     * @return 结果
     */
    @Override
    public int updatePExercise(PExercise pExercise)
    {
        PExercise pExercise1 = pExerciseMapper.selectPExerciseByExerciseNameEdit(pExercise);
        if(ObjectUtil.isNotNull(pExercise1)){
            throw new RuntimeException("名称已存在!");
        }else {
            return pExerciseMapper.updatePExercise(pExercise);
        }

    }

    /**
     * 批量删除运动库信息
     * 
     * @param ids 需要删除的运动库信息主键
     * @return 结果
     */
    @Override
    public int deletePExerciseByIds(Long[] ids)
    {
        return pExerciseMapper.deletePExerciseByIds(ids);
    }

    /**
     * 删除运动库信息信息
     * 
     * @param id 运动库信息主键
     * @return 结果
     */
    @Override
    public int deletePExerciseById(Long id)
    {
        return pExerciseMapper.deletePExerciseById(id);
    }
}
