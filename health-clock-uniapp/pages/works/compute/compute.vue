<template>
  <div class="container">
    <div class="title">BMI计算器</div>
    <div class="input-group">
      <label class="input-label">身高(厘米)：</label>
      <input type="number" v-model="height" class="input-field" />
    </div>
    <div class="input-group">
      <label class="input-label">体重(千克)：</label>
      <input type="number" v-model="weight" class="input-field" />
    </div>
    <button class="btn" @click="calculate">计算BMI</button>
    <div class="result" v-if="bmi !== null">
      您的 BMI 值为：{{ bmi }}，{{ result }}
    </div>
  </div>
</template>

<style>
  /* 添加上述 CSS 代码 */
  .container {
    max-width: 500px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  
  .input-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .input-label {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .input-field {
    width: 100%;
    max-width: 400px;
    height: 40px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .btn {
    width: 100%;
    max-width: 400px;
    height: 40px;
    margin-top: 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007aff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .result {
    font-size: 20px;
    margin-top: 30px;
  }
</style>

<script>
  export default {
    data() {
      return {
        height: null,
        weight: null,
        bmi: null,
        result: null,
      };
    },
    methods: {
      calculate() {
        const heightInMeters = this.height / 100;
        const weightInKg = this.weight;
        const bmi = weightInKg / (heightInMeters * heightInMeters);
        this.bmi = bmi.toFixed(2);
        if (bmi < 18.5) {
          this.result = "您的体重过轻";
        } else if (bmi >= 18.5 && bmi < 24) {
          this.result = "您的体重正常";
        } else if (bmi >= 24 && bmi < 28) {
          this.result = "您的体重过重";
        } else {
          this.result = "您的体重肥胖";} 
		}
	}
	}
</script>