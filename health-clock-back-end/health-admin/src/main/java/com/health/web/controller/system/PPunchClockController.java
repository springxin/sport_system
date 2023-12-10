package com.health.web.controller.system;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletResponse;

import com.health.common.core.domain.model.LoginUser;
import com.health.system.domain.vo.StatisticsVo;
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
import com.health.system.domain.PPunchClock;
import com.health.system.service.IPPunchClockService;
import com.health.common.utils.poi.ExcelUtil;
import com.health.common.core.page.TableDataInfo;

/**
 * 打卡记录信息Controller
 * 
 * @author health
 * @date 2022-05-27
 */
@RestController
@RequestMapping("/system/clock")
public class PPunchClockController extends BaseController
{
    @Autowired
    private IPPunchClockService pPunchClockService;

    /**
     * 查询打卡记录信息列表
     */
    @PreAuthorize("@ss.hasPermi('system:clock:list')")
    @GetMapping("/list")
    public TableDataInfo list(PPunchClock pPunchClock)
    {
        LoginUser loginUser = getLoginUser();
        if(!loginUser.getUser().isAdmin()){
            pPunchClock.setUserId(loginUser.getUserId());
        }
        startPage();
        List<PPunchClock> list = pPunchClockService.selectPPunchClockList(pPunchClock);
        return getDataTable(list);
    }

    /**
     * 导出打卡记录信息列表
     */
    @PreAuthorize("@ss.hasPermi('system:clock:export')")
    @Log(title = "打卡记录信息", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, PPunchClock pPunchClock)
    {
        List<PPunchClock> list = pPunchClockService.selectPPunchClockList(pPunchClock);
        ExcelUtil<PPunchClock> util = new ExcelUtil<PPunchClock>(PPunchClock.class);
        util.exportExcel(response, list, "打卡记录信息数据");
    }

    /**
     * 获取打卡记录信息详细信息
     */
    @PreAuthorize("@ss.hasPermi('system:clock:query')")
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable("id") Long id)
    {
        return AjaxResult.success(pPunchClockService.selectPPunchClockById(id));
    }

    /**
     * 新增打卡记录信息
     */

    @PreAuthorize("@ss.hasPermi('system:clock:add')")
    @Log(title = "打卡记录信息", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody PPunchClock pPunchClock)
    {
        pPunchClock.setUserId(getUserId());
        pPunchClock.setUserName(getUsername());
        return toAjax(pPunchClockService.insertPPunchClock(pPunchClock));
    }

    /**k
     * 修改打卡记录信息
     */
    @PreAuthorize("@ss.hasPermi('system:clock:edit')")
    @Log(title = "打卡记录信息", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody PPunchClock pPunchClock)
    {
        return toAjax(pPunchClockService.updatePPunchClock(pPunchClock));
    }

    /**
     * 删除打卡记录信息
     */
    @PreAuthorize("@ss.hasPermi('system:clock:remove')")
    @Log(title = "打卡记录信息", businessType = BusinessType.DELETE)
	@DeleteMapping("/{ids}")
    public AjaxResult remove(@PathVariable Long[] ids)
    {
        return toAjax(pPunchClockService.deletePPunchClockByIds(ids));
    }

    /**
     * 统计打卡记录信息
     */
    @GetMapping("/selectPPunchClockStatisticsList")
    public AjaxResult selectPPunchClockStatisticsList(PPunchClock pPunchClock) {
        pPunchClock.setUserId(getUserId());
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
}
