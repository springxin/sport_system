package com.health;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * 启动程序
 * 
 * @author 2891517520@qq.com
 */
@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class HealthApplication
{
    public static void main(String[] args)
    {
        SpringApplication.run(HealthApplication.class, args);
        System.out.println("Application启动成功~");
    }
}
