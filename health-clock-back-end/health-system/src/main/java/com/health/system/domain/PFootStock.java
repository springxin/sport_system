package com.health.system.domain;

import com.health.common.annotation.Excel;
import com.health.common.core.domain.BaseEntity;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * 食物库信息对象 p_foot_stock
 * 
 * @author health
 * @date 2022-05-27
 */
public class PFootStock extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 主键ID */
    private Long id;

    /** 品牌名称 */
    @Excel(name = "品牌名称")
    private String brandName;

    /** 用户ID */
    private Long userId;

    /** 用户姓名 */
    @Excel(name = "用户姓名")
    private String userName;

    /** 食物名称 */
    @Excel(name = "食物名称")
    private String footName;

    /** 状态（0待审核 1通过 2驳回） */
    private String status;

    /** 删除标志（0代表存在 2代表删除） */
    private String delFlag;

    /** 驳回原因 */
    private String rejectCause;

    /** 食物分类 */
    @Excel(name = "食物分类", readConverterExp = "1=乳制品,2=豆制品,3=肉制品,4=饮品")
    private Long footType;

    /** 热量（单位 ：千卡） */
    @Excel(name = "热量（千卡）")
    private String heat;

    public void setId(Long id) 
    {
        this.id = id;
    }

    public Long getId() 
    {
        return id;
    }
    public void setBrandName(String brandName) 
    {
        this.brandName = brandName;
    }

    public String getBrandName() 
    {
        return brandName;
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
    public void setFootName(String footName) 
    {
        this.footName = footName;
    }

    public String getFootName() 
    {
        return footName;
    }
    public void setStatus(String status) 
    {
        this.status = status;
    }

    public String getStatus() 
    {
        return status;
    }
    public void setDelFlag(String delFlag) 
    {
        this.delFlag = delFlag;
    }

    public String getDelFlag() 
    {
        return delFlag;
    }
    public void setRejectCause(String rejectCause) 
    {
        this.rejectCause = rejectCause;
    }

    public String getRejectCause() 
    {
        return rejectCause;
    }
    public void setFootType(Long footType) 
    {
        this.footType = footType;
    }

    public Long getFootType() 
    {
        return footType;
    }
    public void setHeat(String heat) 
    {
        this.heat = heat;
    }

    public String getHeat() 
    {
        return heat;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
            .append("id", getId())
            .append("brandName", getBrandName())
            .append("userId", getUserId())
            .append("userName", getUserName())
            .append("footName", getFootName())
            .append("status", getStatus())
            .append("delFlag", getDelFlag())
            .append("createTime", getCreateTime())
            .append("updateBy", getUpdateBy())
            .append("updateTime", getUpdateTime())
            .append("rejectCause", getRejectCause())
            .append("footType", getFootType())
            .append("heat", getHeat())
            .toString();
    }
}
