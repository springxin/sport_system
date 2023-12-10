//package com.health.common.config;
//
//import org.springframework.amqp.core.Binding;
//import org.springframework.amqp.core.Exchange;
//import org.springframework.amqp.core.Queue;
//import org.springframework.amqp.core.TopicExchange;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Configuration
//public class MyMQConfig {
//
//    @Bean
//    public Queue orderDelayQueue(){
//
//        Map<String,Object> arguments = new HashMap<>();
//
//        arguments.put("x-dead-letter-exchange","order-event-exchange"); // 死信路由
//        arguments.put("x-dead-letter-routing-key","order.release.order"); // 死信路由键
//        arguments.put("x-message-ttl",60000);
//        Queue queue = new Queue("order.delay.queue", true, false, false);
//
//        return queue;
//    }
//    @Bean
//    public Queue orderReleaseOrderQueue(){
//        Queue queue = new Queue("order.release.order.queue", true, false, false);
//
//        return queue;
//    }
//    @Bean
//    public Exchange orderEventExchange(){
//
//        return new TopicExchange("order-event-exchange",true,false);
//
//    }
//    @Bean
//    public Binding orderCreateOrderBinding(){
//
//        return new Binding("order.delay.queue",
//                Binding.DestinationType.QUEUE,
//                "order-event-exchange",
//                "order.create.order",
//                null);
//
//    }
//    @Bean
//    public Binding orderReleaseOrderBinding(){
//        return new Binding("order.release.order.queue",
//                Binding.DestinationType.QUEUE,
//                "order-event-exchange",
//                "order.release.order",
//                null);
//    }
//}
