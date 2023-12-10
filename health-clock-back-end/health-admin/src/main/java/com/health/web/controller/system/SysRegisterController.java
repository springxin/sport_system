package com.health.web.controller.system;

import com.health.common.core.domain.model.RetrievePasswordBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.health.common.core.controller.BaseController;
import com.health.common.core.domain.AjaxResult;
import com.health.common.core.domain.model.RegisterBody;
import com.health.common.utils.StringUtils;
import com.health.framework.web.service.SysRegisterService;
import com.health.system.service.ISysConfigService;

/**
 * 注册验证
 * 
 * @author 2891517520@qq.com
 */
@RestController
public class SysRegisterController extends BaseController
{
    @Autowired
    private SysRegisterService registerService;

    @Autowired
    private ISysConfigService configService;

    @PostMapping("/register")
    public AjaxResult register(@RequestBody RegisterBody user)
    {
        String msg = registerService.register(user);
        return StringUtils.isEmpty(msg) ? success() : error(msg);
    }

    @PostMapping("/retrievePassword")
    public AjaxResult retrievePassword(@RequestBody RetrievePasswordBody passwordBody)
    {
        return AjaxResult.success().put("flag",registerService.retrievePassword(passwordBody.getEmail()));
    }
}
