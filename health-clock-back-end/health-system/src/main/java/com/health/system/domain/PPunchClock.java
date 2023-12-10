package com.health.system.domain;

import java.math.BigDecimal;
import com.health.common.annotation.Excel;
import com.health.common.core.domain.BaseEntity;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * 打卡记录信息对象 p_punch_clock
 * 
 * @author health
 * @date 2022-06-04
 */
public class PPunchClock extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 主键ID */
    private Long id;

    /** 用户ID */
    @Excel(name = "用户ID")
    private Long userId;

    /** 用户姓名 */
    @Excel(name = "用户姓名")
    private String userName;

    /** 摄入卡路里 */
    @Excel(name = "摄入卡路里")
    private Double intakeCalorie;

    /** 消耗卡路里 */
    @Excel(name = "消耗卡路里")
    private Double consumeCalorie;

    /** 运动类型 */
    @Excel(name = "运动类型")
    private Long exerciseType;

    /** 食物 */
    @Excel(name = "食物")
    private String eatFoot;

    private PExercise pExercise;

    public PExercise getpExercise() {
        return pExercise;
    }

    public void setpExercise(PExercise pExercise) {
        this.pExercise = pExercise;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public Long getId() 
    {
        return id;
    }
    public void setUserId(Long userId) 
    {
        this.userId = userId;
    }

    public Long getUserId() 
    {
        return userId;
    }
    public void setUserName(String userName) 
    {
        this.userName = userName;
    }

    public String getUserName() 
    {
        return userName;
    }
    public void setIntakeCalorie(Double intakeCalorie)
    {
        this.intakeCalorie = intakeCalorie;
    }

    public Double getIntakeCalorie()
    {
        return intakeCalorie;
    }
    public void setConsumeCalorie(Double consumeCalorie)
    {
        this.consumeCalorie = consumeCalorie;
    }

    public Double getConsumeCalorie()
    {
        return consumeCalorie;
    }
    public void setExerciseType(Long exerciseType) 
    {
        this.exerciseType = exerciseType;
    }

    public Long getExerciseType() 
    {
        return exerciseType;
    }
    public void setEatFoot(String eatFoot) 
    {
        this.eatFoot = eatFoot;
    }

    public String getEatFoot() 
    {
        return eatFoot;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
            .append("id", getId())
            .append("userId", getUserId())
            .append("userName", getUserName())
            .append("intakeCalorie", getIntakeCalorie())
            .append("createTime", getCreateTime())
            .append("updateTime", getUpdateTime())
            .append("consumeCalorie", getConsumeCalorie())
            .append("exerciseType", getExerciseType())
            .append("eatFoot", getEatFoot())
            .toString();
    }
}
