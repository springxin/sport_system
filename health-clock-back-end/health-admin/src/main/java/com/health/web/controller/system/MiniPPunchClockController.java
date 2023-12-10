package com.health.web.controller.system;

import com.health.common.annotation.Log;
import com.health.common.core.controller.BaseController;
import com.health.common.core.domain.AjaxResult;
import com.health.common.core.page.TableDataInfo;
import com.health.common.enums.BusinessType;
import com.health.system.domain.PPunchClock;
import com.health.system.domain.vo.StatisticsVo;
import com.health.system.service.IPPunchClockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 打卡记录信息Controller
 *
 * @author health
 * @date 2022-05-27
 */
@RestController
@RequestMapping("/system/clock/mini")
public class MiniPPunchClockController extends BaseController {
    @Autowired
    private IPPunchClockService pPunchClockService;

    /**
     * 查询打卡记录信息列表
     */
    @GetMapping("/list")
    public TableDataInfo list(PPunchClock pPunchClock) {
        startPage();
        List<PPunchClock> list = pPunchClockService.selectPPunchClockList(pPunchClock);
        return getDataTable(list);
    }


    /**
     * 统计打卡记录信息
     */
    @GetMapping("/selectPPunchClockStatisticsList")
    public AjaxResult selectPPunchClockStatisticsList(PPunchClock pPunchClock) {
        List<PPunchClock> list = pPunchClockService.selectPPunchClockStatisticsList(pPunchClock);
        List<StatisticsVo> statisticsVos = new ArrayList<>();
        for (int i = 1; i < 13; i++) {
            int moth = i;
            StatisticsVo statisticsVo = new StatisticsVo();
            double intakeCalorieSum = list.stream().filter(item -> item.getCreateTime().getMonth() + 1 == moth).mapToDouble(PPunchClock::getIntakeCalorie).sum();
            double consumeCalorieSum = list.stream().filter(item -> item.getCreateTime().getMonth() + 1 == moth).mapToDouble(PPunchClock::getConsumeCalorie).sum();
            statisticsVo.setMonth(moth);
            statisticsVo.setIntakeCalorie(intakeCalorieSum);
            statisticsVo.setConsumeCalorie(consumeCalorieSum);
            statisticsVos.add(statisticsVo);
        }
        return AjaxResult.success().put("statisticsVos", statisticsVos);
    }

    /**
     * 获取打卡记录信息详细信息
     */
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable("id") Long id) {
        return AjaxResult.success(pPunchClockService.selectPPunchClockById(id));
    }

    /**
     * 新增打卡记录信息
     */
    @Log(title = "打卡记录信息", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody PPunchClock pPunchClock) {
        return toAjax(pPunchClockService.insertPPunchClock(pPunchClock));
    }

    /**
     * 修改打卡记录信息
     */
    @Log(title = "打卡记录信息", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody PPunchClock pPunchClock) {
        return toAjax(pPunchClockService.updatePPunchClock(pPunchClock));
    }

    /**
     * 删除打卡记录信息
     */
    @Log(title = "打卡记录信息", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ids}")
    public AjaxResult remove(@PathVariable Long[] ids) {
        return toAjax(pPunchClockService.deletePPunchClockByIds(ids));
    }
}
