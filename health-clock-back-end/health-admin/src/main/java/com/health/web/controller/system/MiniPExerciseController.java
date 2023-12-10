package com.health.web.controller.system;

import com.health.common.annotation.Log;
import com.health.common.core.controller.BaseController;
import com.health.common.core.domain.AjaxResult;
import com.health.common.core.page.TableDataInfo;
import com.health.common.enums.BusinessType;
import com.health.system.domain.PExercise;
import com.health.system.service.IPExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 运动库信息Controller
 *
 * @author health
 * @date 2022-06-04
 */
@RestController
@RequestMapping("/system/exercise/mini")
public class MiniPExerciseController extends BaseController
{
    @Autowired
    private IPExerciseService pExerciseService;

    /**
     * 查询运动库信息列表
     */
    @GetMapping("/list")
    public TableDataInfo list(PExercise pExercise)
    {
        startPage();
        List<PExercise> list = pExerciseService.selectPExerciseList(pExercise);
        return getDataTable(list);
    }

    /**
     * 新增运动库信息
     */
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
    @Log(title = "运动库信息", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody PExercise pExercise)
    {
        return toAjax(pExerciseService.updatePExercise(pExercise));
    }

    /**
     * 删除运动库信息
     */
    @Log(title = "运动库信息", businessType = BusinessType.DELETE)
    @GetMapping("/remove/{id}")
    public AjaxResult remove(@PathVariable Long id)
    {
        return toAjax(pExerciseService.deletePExerciseById(id));
    }
}
