<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户姓名" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:clock:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:clock:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:clock:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="clockList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="用户姓名" align="center" prop="userName" />
      <el-table-column label="食物" align="center" prop="eatFoot" />
      <el-table-column label="运动类型" align="center" prop="pExercise.exerciseName" />
      <el-table-column label="摄入卡路里" align="center" prop="intakeCalorie" />
      <el-table-column label="消耗卡路里" align="center" prop="consumeCalorie" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:clock:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:clock:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改打卡记录信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="运动类型" prop="exerciseType">
          <el-select v-model="form.exerciseType" placeholder="请选择运动类型">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.exerciseName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食物" prop="eatFoot">
          <el-input v-model="form.eatFoot" label="请输入食物"></el-input>
        </el-form-item>
        <el-form-item label="摄入卡路里" prop="intakeCalorie">
          <el-input-number v-model="form.intakeCalorie" :min="0" label="请输入摄入卡路里"></el-input-number>
        </el-form-item>
        <el-form-item label="消耗卡路里" prop="consumeCalorie">
          <el-input-number v-model="form.consumeCalorie" :min="0" label="请输入消耗卡路里"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listClock, getClock, delClock, addClock, updateClock } from "@/api/system/clock";
import { listExercise } from "@/api/system/exercise";

export default {
  name: "Clock",
  data() {
    return {
      options:[],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 打卡记录信息表格数据
      clockList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        userName: null,
        intakeCalorie: null,
        consumeCalorie: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        exerciseType: [
          { required: true, message: "运动类型不能为空", trigger: "blur" }
        ],
        eatFoot: [
          { required: true, message: "失物不能为空", trigger: "blur" }
        ],
        intakeCalorie: [
          { required: true, message: "摄入卡路里不能为空", trigger: "blur" }
        ],
        consumeCalorie: [
          { required: true, message: "消耗卡路里不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getList2();
  },
  methods: {
    /** 查询运动库信息列表 */
    getList2() {
      let obj = Object.assign({
        pageNum: 1,
        pageSize: 100,
      })
      listExercise(obj).then(response => {
        this.options = response.rows;
      });
    },
    /** 查询打卡记录信息列表 */
    getList() {
      this.loading = true;
      listClock(this.queryParams).then(response => {
        this.clockList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        userId: null,
        userName: null,
        intakeCalorie: null,
        createTime: null,
        updateTime: null,
        consumeCalorie: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加打卡记录信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getClock(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改打卡记录信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateClock(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addClock(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除打卡记录信息编号为"' + ids + '"的数据项？').then(function() {
        return delClock(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/clock/export', {
        ...this.queryParams
      }, `clock_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
