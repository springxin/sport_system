package com.health.system.service;

import java.util.List;
import com.health.system.domain.PPunchClock;

/**
 * 打卡记录信息Service接口
 * 
 * @author health
 * @date 2022-05-27
 */
public interface IPPunchClockService 
{
    /**
     * 查询打卡记录信息
     * 
     * @param id 打卡记录信息主键
     * @return 打卡记录信息
     */
    public PPunchClock selectPPunchClockById(Long id);

    /**
     * 查询打卡记录信息列表
     * 
     * @param pPunchClock 打卡记录信息
     * @return 打卡记录信息集合
     */
    public List<PPunchClock> selectPPunchClockList(PPunchClock pPunchClock);

    /**
     * 统计打卡记录信息
     *
     * @param pPunchClock 打卡记录信息
     * @return 打卡记录信息集合
     */
    public List<PPunchClock> selectPPunchClockStatisticsList(PPunchClock pPunchClock);

    /**
     * 新增打卡记录信息
     * 
     * @param pPunchClock 打卡记录信息
     * @return 结果
     */
    public int insertPPunchClock(PPunchClock pPunchClock);

    /**
     * 修改打卡记录信息
     * 
     * @param pPunchClock 打卡记录信息
     * @return 结果
     */
    public int updatePPunchClock(PPunchClock pPunchClock);

    /**
     * 批量删除打卡记录信息
     * 
     * @param ids 需要删除的打卡记录信息主键集合
     * @return 结果
     */
    public int deletePPunchClockByIds(Long[] ids);

    /**
     * 删除打卡记录信息信息
     * 
     * @param id 打卡记录信息主键
     * @return 结果
     */
    public int deletePPunchClockById(Long id);
}
