package com.health.web.controller.system;

import com.health.common.annotation.Log;
import com.health.common.core.controller.BaseController;
import com.health.common.core.domain.AjaxResult;
import com.health.common.core.page.TableDataInfo;
import com.health.common.enums.BusinessType;
import com.health.system.domain.PFootStock;
import com.health.system.service.IPFootStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 食物库信息Controller
 *
 * @author health
 * @date 2022-05-27
 */
@RestController
@RequestMapping("/system/stock/mini")
public class MiniPFootStockController extends BaseController
{
    @Autowired
    private IPFootStockService pFootStockService;

    /**
     * 查询食物库信息列表
     */
    @GetMapping("/list")
    public TableDataInfo list(PFootStock pFootStock)
    {
        startPage();
        List<PFootStock> list = pFootStockService.selectPFootStockList(pFootStock);
        return getDataTable(list);
    }

    /**
     * 获取食物库信息详细信息
     */
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable("id") Long id)
    {
        return AjaxResult.success(pFootStockService.selectPFootStockById(id));
    }

    /**
     * 新增食物库信息
     */
    @Log(title = "食物库信息", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody PFootStock pFootStock)
    {
        return toAjax(pFootStockService.insertPFootStock(pFootStock));
    }

    /**
     * 修改食物库信息
     */
    @Log(title = "食物库信息", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody PFootStock pFootStock)
    {
        return toAjax(pFootStockService.updatePFootStock(pFootStock));
    }

    /**
     * 删除食物库信息
     */
    @Log(title = "食物库信息", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ids}")
    public AjaxResult remove(@PathVariable Long[] ids)
    {
        return toAjax(pFootStockService.deletePFootStockByIds(ids));
    }
}
