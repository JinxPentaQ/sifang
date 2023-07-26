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
          prop="buy_rate"
          label="购买费率"
          align="left"
          min-width="100"
        />
        <el-table-column
          prop="buy_is_open"
          label="购买通道是否开启"
          align="left"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ getOptionsText(channelOpenOptions, scope.row.buy_is_open) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="buy_specify_type"
          label="买入指定类型"
          align="left"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ getOptionsText(bySellTypeOptions, scope.row.buy_is_open) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="buy_specify"
          label="买入指定用户ID"
          align="left"
          min-width="100"
        />
        <el-table-column
          prop="buy_max_amount"
          label="购买最大费率"
          align="left"
          min-width="100"
        />
        <el-table-column
          prop="buy_min_amount"
          label="购买最小费率"
          align="left"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="sell_rate"
          label="	卖出费率"
          align="left"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="sell_is_open"
          label="	卖出通道是否开启"
          align="left"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ getOptionsText(channelOpenOptions, scope.row.buy_is_open) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="sell_specify_type"
          label="	卖出指定类型"
          align="left"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ getOptionsText(bySellTypeOptions, scope.row.buy_is_open) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="sell_specify"
          label="	卖出指定用户ID"
          align="left"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="sell_max_amount"
          label="卖出最大费率"
          align="left"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="sell_min_amount"
          label="卖出最小费率"
          align="left"
          min-width="100"
        ></el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)" size="mini"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="10"
        layout="total, prev, pager, next, sizes, jumper"
        :total="total"
        style="float: right; margin: 15px"
      ></el-pagination>
    </div>
    <!--新增-->
    <el-dialog
      title="添加商户通道配置"
      :visible.sync="newsFormVisible"
      width="50%"
    >
      <el-form :model="news" ref="news" :rules="rules">
        <el-form-item
          prop="channel_currency_id"
          label="通道货币"
          :label-width="formLabelWidth"
        >
          <el-select v-model="news.channel_currency_id" placeholder="货币">
            <el-option
              v-for="item in currencyList"
              :key="item.id"
              :label="item.channel_currency_name"
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
    <!--新增-->
    <el-dialog
      title="编辑商户通道配置"
      :visible.sync="editFormVisible"
      width="50%"
    >
      <el-form :model="edit" ref="edit" :rules="rules">
        <el-form-item
          prop="buy_rate"
          label="购买费率"
          :label-width="formLabelWidth"
        >
          <el-input v-model="edit.buy_rate" placeholder="购买费率"></el-input>
        </el-form-item>
        <el-form-item
          prop="buy_is_open"
          label="购买通道是否开启"
          :label-width="formLabelWidth"
        >
          <el-select v-model="edit.buy_is_open" placeholder="购买通道是否开启">
            <el-option
              v-for="item in channelOpenOptions"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="buy_specify_type"
          label="买入指定类型"
          :label-width="formLabelWidth"
        >
          <el-select v-model="edit.buy_specify_type" placeholder="买入指定类型">
            <el-option
              v-for="item in bySellTypeOptions"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="buy_specify"
          label="买入指定用户ID"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="edit.buy_specify"
            placeholder="买入指定用户ID，请使用逗号分隔输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="buy_max_amount"
          label="购买最大费率"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="edit.buy_max_amount"
            placeholder="购买最大费率"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="buy_min_amount"
          label="购买最小费率"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="edit.buy_min_amount"
            placeholder="购买最小费率"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="sell_rate"
          label="卖出费率"
          :label-width="formLabelWidth"
        >
          <el-input v-model="edit.sell_rate" placeholder="卖出费率"></el-input>
        </el-form-item>
        <el-form-item
          prop="sell_is_open"
          label="卖出通道是否开启"
          :label-width="formLabelWidth"
        >
          <el-select v-model="edit.sell_is_open" placeholder="卖出通道是否开启">
            <el-option
              v-for="item in channelOpenOptions"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="sell_specify_type"
          label="卖出指定类型"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="edit.sell_specify_type"
            placeholder="卖出指定类型"
          >
            <el-option
              v-for="item in bySellTypeOptions"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="sell_specify"
          label="卖出指定用户ID"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="edit.sell_specify"
            placeholder="卖出指定用户ID，请使用逗号分隔输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="sell_max_amount"
          label="卖出最大费率"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="edit.sell_max_amount"
            placeholder="卖出最大费率"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="sell_min_amount"
          label="卖出最小费率"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="edit.sell_min_amount"
            placeholder="卖出最小费率"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="editSubmit('edit')"
          >确定</el-button
        >
        <el-button size="mini" @click="editFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import {
  getsBusinessChannelConfig,
  addBusinessChannelConfig,
  modBusinessChannelConfig,
} from "@/api/merchantChannel";
import {
  getsChannelCurrency,
} from "@/api/currencyChannel";
import {
  channelOpen,
  bySellType,
  channelOpenOptions,
  bySellTypeOptions,
} from "@/utils/const";
import { getOptionsText } from "@/utils/func";
export default {
  data() {
    return {
      filters: {
        current_id: "",
      },
      tableData: [],
      currencyList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      labelWidth: "100px",
      formLabelWidth: "140px",
      newsFormVisible: false,
      editFormVisible: false,
      //添加商户
      news: {
        channel_currency_id: "",
        business_id: "",
      },
      edit: {},
      rules: {
        current_id: [
          { required: true, message: "请选择货币", trigger: "change" },
        ],
      },
      channelOpen,
      bySellType,
      channelOpenOptions,
      bySellTypeOptions,
    };
  },
  methods: {
    getOptionsText,
    //分页
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    // 分页N条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    // 重置
    resetForm() {
      this.$refs.filters.resetFields();
      this.getUsers();
    },
    //获取列表
    getData() {
      getsBusinessChannelConfig({
        business_id: this.$route.params.id,
      })
        .then((res) => {
          console.log(res, "ddd");
          this.listLoading = false;
          this.tableData = res.items;
          this.total = res.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取货币列表
    getCurreny() {
      getsChannelCurrency()
        .then((res) => {
          this.currencyList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //添加商户通道配置
    handleAdd(formName) {
      this.listLoading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addBusinessChannelConfig({
            channel_currency_id: this.news.channel_currency_id,
            business_id: this.$route.params.id,
          })
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
    //编辑商户通道配置
    editSubmit(formName) {
      this.listLoading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          modBusinessChannelConfig({ ...this.edit, id: this.$route.params.id })
            .then(() => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.$refs[formName].resetFields();
              this.listLoading = false;
              this.editFormVisible = false;
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    // 编辑
    handleEdit(row) {
      this.edit = row;
      this.editFormVisible = true;
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