package com.health.web.controller.system;

import com.health.common.constant.Constants;
import com.health.common.core.domain.AjaxResult;
import com.health.common.core.domain.entity.SysMenu;
import com.health.common.core.domain.entity.SysUser;
import com.health.common.core.domain.model.LoginBody;
import com.health.common.core.redis.RedisCache;
import com.health.common.enums.LoginTypeEnum;
import com.health.common.utils.SecurityUtils;
import com.health.framework.web.service.SysLoginService;
import com.health.framework.web.service.SysPermissionService;
import com.health.system.service.ISysMenuService;
import com.health.system.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

/**
 * 登录验证
 *
 * @author 2891517520@qq.com
 */
@RestController
public class SysLoginController {
    @Autowired
    private SysLoginService loginService;

    @Autowired
    private ISysMenuService menuService;

    @Autowired
    private SysPermissionService permissionService;

    @Autowired
    private ISysUserService userService;

    @Autowired
    private RedisCache redisCache;


    /**
     * 登录方法
     *
     * @param loginBody 登录信息
     * @return 结果
     */
    @PostMapping("/login")
    public AjaxResult login(@RequestBody LoginBody loginBody) {
        AjaxResult ajax = AjaxResult.success();
        if (LoginTypeEnum.MA.getCode().equals(loginBody.getLoginType())) {
            System.out.println("登录~");
            // 生成令牌
            String token = loginService.miniLogin(loginBody.getUsername(), loginBody.getPassword());
            SysUser SysUserUserInfo = userService.selectUserByUserName(loginBody.getUsername());
            ajax.put(Constants.TOKEN, token).put(Constants.USERINFO, SysUserUserInfo);
        } else {
            // 生成令牌
            String token = loginService.login(loginBody.getUsername(), loginBody.getPassword(), loginBody.getCode(),
                    loginBody.getUuid());
            ajax.put(Constants.TOKEN, token);
        }

        return ajax;

    }

    /**
     * 获取用户信息
     *
     * @return 用户信息
     */
    @GetMapping("getInfo")
    public AjaxResult getInfo() {
        SysUser user = SecurityUtils.getLoginUser().getUser();
        // 角色集合
        Set<String> roles = permissionService.getRolePermission(user);
        // 权限集合
        Set<String> permissions = permissionService.getMenuPermission(user);
        AjaxResult ajax = AjaxResult.success();
        ajax.put("user", user);
        ajax.put("roles", roles);
        ajax.put("permissions", permissions);
        return ajax;
    }

    /**
     * 获取路由信息
     *
     * @return 路由信息
     */
    @GetMapping("getRouters")
    public AjaxResult getRouters() {
        Long userId = SecurityUtils.getUserId();
        List<SysMenu> menus = menuService.selectMenuTreeByUserId(userId);
        return AjaxResult.success(menuService.buildMenus(menus));
    }
}
