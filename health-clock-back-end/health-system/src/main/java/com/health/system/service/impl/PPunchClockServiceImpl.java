package com.health.system.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.concurrent.TimeUnit;

import cn.hutool.core.date.DateTime;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.health.common.core.redis.RedisCache;
import com.health.common.exception.base.BaseException;
import com.health.common.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.health.system.mapper.PPunchClockMapper;
import com.health.system.domain.PPunchClock;
import com.health.system.service.IPPunchClockService;

/**
 * 打卡记录信息Service业务层处理
 * 
 * @author health
 * @date 2022-05-27
 */
@Service
public class PPunchClockServiceImpl implements IPPunchClockService 
{
    @Autowired
    private PPunchClockMapper pPunchClockMapper;

    @Autowired
    private RedisCache redisCache;
    /**
     * 查询打卡记录信息
     * 
     * @param id 打卡记录信息主键
     * @return 打卡记录信息
     */
    @Override
    public PPunchClock selectPPunchClockById(Long id)
    {
        return pPunchClockMapper.selectPPunchClockById(id);
    }

    /**
     * 查询打卡记录信息列表
     * 
     * @param pPunchClock 打卡记录信息
     * @return 打卡记录信息
     */
    @Override
    public List<PPunchClock> selectPPunchClockList(PPunchClock pPunchClock)
    {
        return pPunchClockMapper.selectPPunchClockList(pPunchClock);
    }

    @Override
    public List<PPunchClock> selectPPunchClockStatisticsList(PPunchClock pPunchClock) {
        return pPunchClockMapper.selectPPunchClockStatisticsList(pPunchClock);
    }

    /**
     * 新增打卡记录信息
     * 
     * @param pPunchClock 打卡记录信息
     * @return 结果
     */
    @Override
    public int insertPPunchClock(PPunchClock pPunchClock)
    {
        String key = StrUtil.format("{}:{}","signIn", pPunchClock.getUserId());
        Object cacheObject = redisCache.getCacheObject(key);
        if(ObjectUtil.isNull(cacheObject)){
            System.out.println("打卡");
            Long dateSumSec = DateUtils.getDateSumSec();
            redisCache.setCacheObject(key,true,120, TimeUnit.SECONDS);
            pPunchClock.setCreateTime(DateUtils.getNowDate());
            return pPunchClockMapper.insertPPunchClock(pPunchClock);

        }else {
            System.out.println("已打卡");
            throw new BaseException("已打卡");
        }
    }

    /**
     * 修改打卡记录信息
     * 
     * @param pPunchClock 打卡记录信息
     * @return 结果
     */
    @Override
    public int updatePPunchClock(PPunchClock pPunchClock)
    {
        pPunchClock.setUpdateTime(DateUtils.getNowDate());
        return pPunchClockMapper.updatePPunchClock(pPunchClock);
    }

    /**
     * 批量删除打卡记录信息
     * 
     * @param ids 需要删除的打卡记录信息主键
     * @return 结果
     */
    @Override
    public int deletePPunchClockByIds(Long[] ids)
    {
        return pPunchClockMapper.deletePPunchClockByIds(ids);
    }

    /**
     * 删除打卡记录信息信息
     * 
     * @param id 打卡记录信息主键
     * @return 结果
     */
    @Override
    public int deletePPunchClockById(Long id)
    {
        return pPunchClockMapper.deletePPunchClockById(id);
    }
}
