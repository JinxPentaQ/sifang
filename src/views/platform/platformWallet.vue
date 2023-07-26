<template>
  <section class="page-container">
    <div class="tableDivs">
      <div class="toolNav">
        <div class="toolNavList">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="small"
            @click="newsFormVisible = true"
            >添加</el-button
          >
        </div>
      </div>
      <!--列表-->
      <el-table
        border
        :data="tableData"
        highlight-current-row
        v-loading="listLoading"
      >
        <el-table-column
          prop="currency_name"
          label="币种名称"
          align="left"
          min-width="100"
        />
        <el-table-column
          prop="currency_code"
          label="币种Code"
          align="left"
          min-width="100"
        />
        <el-table-column
          prop="balance_fee"
          label="余额"
          align="left"
          min-width="100"
        />
        <el-table-column
          prop="business_no"
          label="商户编号"
          align="left"
          min-width="100"
        />
        <el-table-column
          prop="business_name"
          label="商户名称"
          align="left"
          min-width="100"
        />
        <el-table-column
          prop="remark"
          label="备注"
          align="left"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="left"
          min-width="100"
        ></el-table-column>
      </el-table>
    </div>
    <!--新增-->
    <el-dialog title="添加钱包" :visible.sync="newsFormVisible" width="50%">
      <el-form :model="news" ref="news" :rules="rules">
        <el-form-item
          prop="current_id"
          label="货币"
          :label-width="formLabelWidth"
        >
          <el-select v-model="news.current_id" placeholder="货币">
            <el-option
              v-for="item in currencyList"
              :key="item.id"
              :label="item.currency_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="handleAdd('news')"
          >确定</el-button
        >
        <el-button size="mini" @click="newsFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getPlatformWallet, addPlatformWallet } from "@/api/platform";
import { getsCurrency } from "@/api/currency";
export default {
  data() {
    return {
      filters: {
        current_id: "",
      },
      tableData: [],
      currencyList: [],
      listLoading: false,
      labelWidth: "100px",
      formLabelWidth: "120px",
      newsFormVisible: false,
      //添加商户
      news: {},
      rules: {
        current_id: [
          { required: true, message: "请选择货币", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    // 重置
    resetForm() {
      this.$refs.filters.resetFields();
      this.getUsers();
    },
    //获取列表
    getData() {
      this.listLoading = true;
      getPlatformWallet({
        id: this.$route.params.id,
      })
        .then((res) => {
          this.listLoading = false;
          this.tableData = res.length ? res : [];
          this.total = res.total || 0;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取货币列表
    getCurreny() {
      getsCurrency()
        .then((res) => {
          this.currencyList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //添加钱包
    handleAdd(formName) {
      this.listLoading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addPlatformWallet({ ...this.news, id: this.$route.params.id })
            .then(() => {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.$refs[formName].resetFields();
              this.listLoading = false;
              this.newsFormVisible = false;
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
  mounted() {
    this.getData();
    this.getCurreny();
  },
};
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 130px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-dialog__body {
  .info-item {
    span:nth-child(1) {
      width: 80px;
      display: inline-block;
      font-weight: 700;
      font-size: 14px;
      color: #606266;
      line-height: 50px;
      text-align: right;
      padding-right: 20px;
    }
  }
}
</style>