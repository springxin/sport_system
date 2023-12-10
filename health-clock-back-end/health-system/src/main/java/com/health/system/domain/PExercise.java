package com.health.system.domain;

import com.health.common.annotation.Excel;
import com.health.common.core.domain.BaseEntity;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * 运动库信息对象 p_exercise
 * 
 * @author health
 * @date 2022-06-04
 */
public class PExercise extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 主键ID */
    private Long id;

    /** 运动名称 */
    @Excel(name = "运动名称")
    private String exerciseName;

    public void setId(Long id) 
    {
        this.id = id;
    }

    public Long getId() 
    {
        return id;
    }
    public void setExerciseName(String exerciseName) 
    {
        this.exerciseName = exerciseName;
    }

    public String getExerciseName() 
    {
        return exerciseName;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
            .append("id", getId())
            .append("exerciseName", getExerciseName())
            .append("createBy", getCreateBy())
            .append("createTime", getCreateTime())
            .toString();
    }
}
