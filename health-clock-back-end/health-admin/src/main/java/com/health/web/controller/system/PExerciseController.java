package com.health.web.controller.system;

import java.util.List;
import javax.servlet.http.HttpServletResponse;
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
import com.health.system.domain.PExercise;
import com.health.system.service.IPExerciseService;
import com.health.common.utils.poi.ExcelUtil;
import com.health.common.core.page.TableDataInfo;

/**
 * 运动库信息Controller
 * 
 * @author health
 * @date 2022-06-04
 */
@RestController
@RequestMapping("/system/exercise")
public class PExerciseController extends BaseController
{
    @Autowired
    private IPExerciseService pExerciseService;

    /**
     * 查询运动库信息列表
     */
//    @PreAuthorize("@ss.hasPermi('system:exercise:list')")
    @GetMapping("/list")
    public TableDataInfo list(PExercise pExercise)
    {
        startPage();
        List<PExercise> list = pExerciseService.selectPExerciseList(pExercise);
        return getDataTable(list);
    }

    /**
     * 导出运动库信息列表
     */
    @PreAuthorize("@ss.hasPermi('system:exercise:export')")
    @Log(title = "运动库信息", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, PExercise pExercise)
    {
        List<PExercise> list = pExerciseService.selectPExerciseList(pExercise);
        ExcelUtil<PExercise> util = new ExcelUtil<PExercise>(PExercise.class);
        util.exportExcel(response, list, "运动库信息数据");
    }

    /**
     * 获取运动库信息详细信息
     */
    @PreAuthorize("@ss.hasPermi('system:exercise:query')")
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable("id") Long id)
    {
        return AjaxResult.success(pExerciseService.selectPExerciseById(id));
    }

    /**
     * 新增运动库信息
     */
    @PreAuthorize("@ss.hasPermi('system:exercise:add')")
    @Log(title = "运动库信息", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody PExercise pExercise)
    {
        pExercise.setCreateBy(getUsername());
        return toAjax(pExerciseService.insertPExercise(pExercise));
    }

    /**
     * 修改运动库信息
     */
    @PreAuthorize("@ss.hasPermi('system:exercise:edit')")
    @Log(title = "运动库信息", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody PExercise pExercise)
    {
        return toAjax(pExerciseService.updatePExercise(pExercise));
    }

    /**
     * 删除运动库信息
     */
    @PreAuthorize("@ss.hasPermi('system:exercise:remove')")
    @Log(title = "运动库信息", businessType = BusinessType.DELETE)
	@DeleteMapping("/{ids}")
    public AjaxResult remove(@PathVariable Long[] ids)
    {
        return toAjax(pExerciseService.deletePExerciseByIds(ids));
    }
}
