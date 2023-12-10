<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { selectPPunchClockStatisticsList } from "@/api/system/clock";

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      // 查询参数
      queryParams: {
        userId: '',
      },
      categoriesData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月","12月"],
      seriesIntakeCalorieData:[0,0,0,0,0,0,0,0,0,0,0,0],
      seriesConsumeCalorieData:[0,0,0,0,0,0,0,0,0,0,0,0],
    }
  },
  mounted() {
    this.getList()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    /** 统计打卡信息 */
    getList() {
      selectPPunchClockStatisticsList(this.queryParams).then(response => {
        response.statisticsVos.forEach(item => {
          this.categoriesData.forEach(item2 => {
            let strMonth = item.month + '月'
            if(strMonth === item2){
              this.seriesIntakeCalorieData[item.month - 1] = item.intakeCalorie
              this.seriesConsumeCalorieData[item.month - 1] = item.consumeCalorie
            }
          })
          this.$nextTick(() => {
            this.initChart()
          })
        })
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.categoriesData,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '摄入卡路里（千焦）',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.seriesIntakeCalorieData,
          animationDuration
        }, {
          name: '消耗卡路里（千焦）',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.seriesConsumeCalorieData,
          animationDuration
        }]
      })
    }
  }
}
</script>
