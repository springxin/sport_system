<template>
  <view class="charts-box">
    <qiun-data-charts 
      type="column"
      :opts="opts"
      :chartData="chartData"
    />
  </view>
</template>

<script>
	import requests from '@/utils/requests.js'
export default {
  data() {
    return {
		searchParameters: {
			userId: uni.getStorageSync('userInfo').userId
		},
      chartData: {},
	  categoriesData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月","12月"],
      seriesIntakeCalorieData:[0,0,0,0,0,0,0,0,0,0,0,0],
	  seriesConsumeCalorieData:[0,0,0,0,0,0,0,0,0,0,0,0],
	  //您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [15,15,0,5],
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          data: [
            {
              min: 0
            }
          ]
        },
        extra: {
          column: {
            type: "stack",
            width: 30,
            activeBgColor: "#000000",
            activeBgOpacity: 0.08
          }
        }
      }
    };
  },
  onReady() {
    this.getServerData();
  },
  methods: {
	  
    getServerData() {
		requests.getStatisticsVosList(this.searchParameters).then(res => {
			if (res && res.code === 200) {
				res.statisticsVos.forEach(item => {
				  this.categoriesData.forEach(item2 => {
				    let strMonth = item.month + '月'
				    if(strMonth === item2){
						console.log('2===>',2)
				      this.seriesIntakeCalorieData[item.month - 1] = item.intakeCalorie
					  this.seriesConsumeCalorieData[item.month - 1] = item.consumeCalorie
				    }
				  })
				})
				  let res1 = {
				      categories: this.categoriesData,
				      series: [
				        {
				          name: "摄入卡路里（千焦）",
				          data: this.seriesIntakeCalorieData
				        },
				        {
				          name: "消耗卡路里（千焦）",
				          data: this.seriesConsumeCalorieData
				        }
				      ]
				    };
				  this.chartData = JSON.parse(JSON.stringify(res1));
			}
		})
      //模拟从服务器获取数据时的延时
      // setTimeout(() => {
      //   //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      //   let res = {
      //       categories: this.categoriesData,
      //       series: [
      //         {
      //           name: "摄入卡路里（千焦）",
      //           data: this.seriesIntakeCalorieData
      //         },
      //         {
      //           name: "消耗卡路里（千焦）",
      //           data: this.seriesConsumeCalorieData
      //         }
      //       ]
      //     };
      //   this.chartData = JSON.parse(JSON.stringify(res));
      // }, 500);
    },
  }
};
</script>

<style scoped>
  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
  .charts-box {
    width: 100%;
    height: 300px;
	margin-top: 113px;
  }
</style>