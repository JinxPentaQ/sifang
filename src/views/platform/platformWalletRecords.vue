<template>
  <section class="page-container">
    <div class="tableDivs">
      <!--列表-->
      <el-table
        border
        :data="tableData"
        highlight-current-row
        v-loading="listLoading"
      >
        <el-table-column prop="order_no" label="订单号"></el-table-column>
        <el-table-column prop="remark" label="收款入账"></el-table-column>
        <el-table-column prop="currency_name" label="货币名称"></el-table-column>
        <el-table-column prop="before_amount" label="变动前余额">
          <template slot-scope="scope">
            {{ filterNumber(scope.row.before_amount) }}
          </template>
        </el-table-column>
        <el-table-column prop="change_amount" label="变动金额">
          <template slot-scope="scope">
            {{ filterNumber(scope.row.change_amount) }}
          </template>
        </el-table-column>
        <el-table-column prop="result_amount" label="余额">
          <template slot-scope="scope">
            {{ filterNumber(scope.row.result_amount) }}
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="操作时间"></el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteHandle(scope.row.id)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="10"
        layout="total, prev, pager, next, sizes, jumper"
        :total="total"
        style="float:right;margin: 15px;"
      ></el-pagination>
    </div>
  </section>
</template>

<script>
import { getsPlatformWalletRecord } from "@/api/platform";
import { filterNumber } from "@/utils/func";
export default {
  data() {
    return {
      tableData: [],
      roleList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      news: {
        name: "",
        code: "",
        desc: "",
      },
      formLabelWidth: "120px",
      LabelWidth: "140px",
      newsFormVisible: false,
    };
  },
  methods: {
    filterNumber,
    // 分页
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    // 分页N条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    // 获取用户列表
    getData() {
      this.listLoading = true;
      getsPlatformWalletRecord({
        id: this.$route.params.id,
      })
        .then((res) => {
          this.listLoading = false;
          this.tableData = res.items;
          this.total = res.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
</style>