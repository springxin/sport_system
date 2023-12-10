<template>
  <div class="app-container home">
    <h1>你好，欢迎使用运动打卡和卡路里记录系统！</h1>
    <panel-group v-if="isFlag" @handleSetLineChartData="handleSetLineChartData" :userTotal="userTotal"/>
    <div class="chart-wrapper">
      <bar-chart />
    </div>
  </div>
</template>

<script>
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import BarChart from './dashboard/BarChart'
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import { listUser } from "@/api/system/user";
import {mapGetters} from "vuex";
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  name: "Index",
  data() {
    return {
      isFlag: false,
      // 版本号
      version: "1.0.0",
      lineChartData: lineChartData.newVisitis,
      // 用户总数量
      userTotal: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  mounted() {
    if (this.roles.indexOf('admin') !== -1) {
      this.isFlag = true
      this.getList()
    } else {
      this.isFlag = false
    }
  },
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
  },
  computed: {
    ...mapGetters(['permissions', 'roles'])
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    goTarget(href) {
      window.open(href, "_blank");
    },
    /** 查询用户列表 */
    getList() {
      listUser(this.addDateRange(this.queryParams)).then(response => {
          this.userTotal = response.total;
        }
      );
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

