package com.health.system.service;

import java.util.List;
import com.health.system.domain.PExercise;

/**
 * 运动库信息Service接口
 * 
 * @author health
 * @date 2022-06-04
 */
public interface IPExerciseService 
{
    /**
     * 查询运动库信息
     * 
     * @param id 运动库信息主键
     * @return 运动库信息
     */
    public PExercise selectPExerciseById(Long id);

    /**
     * 查询运动库信息列表
     * 
     * @param pExercise 运动库信息
     * @return 运动库信息集合
     */
    public List<PExercise> selectPExerciseList(PExercise pExercise);

    /**
     * 新增运动库信息
     * 
     * @param pExercise 运动库信息
     * @return 结果
     */
    public int insertPExercise(PExercise pExercise);

    /**
     * 修改运动库信息
     * 
     * @param pExercise 运动库信息
     * @return 结果
     */
    public int updatePExercise(PExercise pExercise);

    /**
     * 批量删除运动库信息
     * 
     * @param ids 需要删除的运动库信息主键集合
     * @return 结果
     */
    public int deletePExerciseByIds(Long[] ids);

    /**
     * 删除运动库信息信息
     * 
     * @param id 运动库信息主键
     * @return 结果
     */
    public int deletePExerciseById(Long id);
}
