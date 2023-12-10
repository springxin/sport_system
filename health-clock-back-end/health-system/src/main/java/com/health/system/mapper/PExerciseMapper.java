package com.health.system.mapper;

import java.util.List;
import com.health.system.domain.PExercise;

/**
 * 运动库信息Mapper接口
 * 
 * @author health
 * @date 2022-06-04
 */
public interface PExerciseMapper 
{
    /**
     * 查询运动库信息
     * 
     * @param id 运动库信息主键
     * @return 运动库信息
     */
    public PExercise selectPExerciseById(Long id);

    /**
     * 新增查询运动库信息
     *
     * @param pExercise 运动库信息
     * @return 运动库信息
     */
    public PExercise selectPExerciseByExerciseNameAdd(PExercise pExercise);

    /**
     * 修改查询运动库信息
     *
     * @param pExercise 运动库信息主键
     * @return 运动库信息
     */
    public PExercise selectPExerciseByExerciseNameEdit(PExercise pExercise);

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
     * 删除运动库信息
     * 
     * @param id 运动库信息主键
     * @return 结果
     */
    public int deletePExerciseById(Long id);

    /**
     * 批量删除运动库信息
     * 
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
    public int deletePExerciseByIds(Long[] ids);
}
