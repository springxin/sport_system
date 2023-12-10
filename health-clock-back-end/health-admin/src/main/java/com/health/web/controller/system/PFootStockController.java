package com.health.web.controller.system;

import java.util.List;
import java.util.Objects;
import javax.servlet.http.HttpServletResponse;

import cn.hutool.core.util.ObjectUtil;
import com.health.common.core.domain.model.LoginUser;
import com.health.common.exception.base.BaseException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.health.common.annotation.Log;
import com.health.common.core.controller.BaseController;
import com.health.common.core.domain.AjaxResult;
import com.health.common.enums.BusinessType;
import com.health.system.domain.PFootStock;
import com.health.system.service.IPFootStockService;
import com.health.common.utils.poi.ExcelUtil;
import com.health.common.core.page.TableDataInfo;

/**
 * 食物库信息Controller
 * 
 * @author health
 * @date 2022-05-27
 */
@RestController
@RequestMapping("/system/stock")
public class PFootStockController extends BaseController
{
    @Autowired
    private IPFootStockService pFootStockService;

    /**
     * 查询食物库信息列表
     */
    @PreAuthorize("@ss.hasPermi('system:stock:list')")
    @GetMapping("/list")
    public TableDataInfo list(PFootStock pFootStock)
    {
        startPage();
        List<PFootStock> list = pFootStockService.selectPFootStockList(pFootStock);
        return getDataTable(list);
    }

    /**
     * 导出食物库信息列表
     */
    @PreAuthorize("@ss.hasPermi('system:stock:export')")
    @Log(title = "食物库信息", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, PFootStock pFootStock)
    {
        List<PFootStock> list = pFootStockService.selectPFootStockList(pFootStock);
        ExcelUtil<PFootStock> util = new ExcelUtil<PFootStock>(PFootStock.class);
        util.exportExcel(response, list, "食物库信息数据");
    }

    /**
     * 获取食物库信息详细信息
     */
    @PreAuthorize("@ss.hasPermi('system:stock:query')")
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable("id") Long id)
    {
        return AjaxResult.success(pFootStockService.selectPFootStockById(id));
    }

    /**
     * 新增食物库信息
     */
    @PreAuthorize("@ss.hasPermi('system:stock:add')")
    @Log(title = "食物库信息", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody PFootStock pFootStock)
    {
        pFootStock.setUserId(getUserId());
        pFootStock.setUserName(getUsername());
        return toAjax(pFootStockService.insertPFootStock(pFootStock));
    }

    /**
     * 修改食物库信息
     */
    @PreAuthorize("@ss.hasPermi('system:stock:edit')")
    @Log(title = "食物库信息", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody PFootStock pFootStock)
    {
        LoginUser loginUser = getLoginUser();
        if(!loginUser.getUser().isAdmin()){
            if(ObjectUtil.isNotNull(pFootStock.getUserId())){
                if(!pFootStock.getUserId().equals(loginUser.getUserId())){
                    throw new BaseException("只能修改自己创建的食物信息");
                }
            }
        }
        return toAjax(pFootStockService.updatePFootStock(pFootStock));
    }

    /**
     * 删除食物库信息
     */
    @PreAuthorize("@ss.hasPermi('system:stock:remove')")
    @Log(title = "食物库信息", businessType = BusinessType.DELETE)
	@DeleteMapping("/{ids}")
    public AjaxResult remove(@PathVariable Long[] ids)
    {
        LoginUser loginUser = getLoginUser();
        for (Long id : ids) {
            PFootStock pFootStock = pFootStockService.selectPFootStockById(id);
            if(!loginUser.getUser().isAdmin()){
                if(ObjectUtil.isNotNull(pFootStock.getUserId())){
                    if(!pFootStock.getUserId().equals(loginUser.getUserId())){
                        throw new BaseException("只能删除自己创建的食物信息");
                    }
                }
            }
        }
        return toAjax(pFootStockService.deletePFootStockByIds(ids));
    }
}
