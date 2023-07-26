<template>
  <section class="page-container">
    <div class="tableDivs">
      <div class="toolNav">
        <div class="toolNavList">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="mini"
            @click="newsFormVisible = true"
            >新增</el-button
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
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="currency_name" label="币种名称"></el-table-column>
        <el-table-column prop="currency_code" label="币种Code"></el-table-column>
        <el-table-column prop="channel_name" label="通道名称"></el-table-column>
        <el-table-column prop="channel_code" label="通道code"></el-table-column>
        <el-table-column prop="desc" label="币种描述"></el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="deleteHandle(scope.row.id)"
              size="mini"
              >删除</el-button
            >
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
        style="float: right; margin: 15px"
      ></el-pagination>
    </div>
    <!--新增界面-->
    <el-dialog
      title="新增币种"
      :visible.sync="newsFormVisible"
      style="width: 60%; margin: 0 auto"
    >
      <el-form :model="news" :rules="rules" ref="news">
        <el-row>
          <el-col :span="22">
            <el-form-item
              prop="channel_id"
              label="通道"
              :label-width="formLabelWidth"
            >
              <el-select v-model="news.channel_id" placeholder="通道">
                <el-option
                  v-for="item in channelList"
                  :key="item.id"
                  :label="item.channel_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item
              prop="currency_id"
              label="币种"
              :label-width="formLabelWidth"
            >
              <el-select v-model="news.currency_id" placeholder="币种">
                <el-option
                  v-for="item in currencyList"
                  :key="item.id"
                  :label="item.currency_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item
              prop="desc"
              label="币种描述"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="news.desc"
                autocomplete="off"
                placeholder="币种描述"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="addSubmit('news')"
          >确定</el-button
        >
        <el-button size="mini" @click="newsFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import {
  getsChannelCurrency,
  addChannelCurrency,
  delChannelCurrency,
} from "@/api/currencyChannel";
import {
  getsCurrency
} from "@/api/currency";
import {
  getsChannel,
} from "@/api/channel";
export default {
  data() {
    return {
      tableData: [],
      channelList: [],
      currencyList: [],
      roleList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      news: {
        name: "",
        channel_id: "",
        currency_id: "",
        desc: "",
      },
      formLabelWidth: "120px",
      LabelWidth: "140px",
      newsFormVisible: false,
      rules: {
        name: [{ required: true, message: "请输入通道名称", trigger: "blur" }],
        channel_id: [{ required: true, message: "请选择渠道", trigger: "change" }],
        currency_id: [{ required: true, message: "请输入币种ID", trigger: "blur" }],
      },
      statusOptions: [
        {
          label: "禁用",
          value: 0,
        },
        {
          label: "启用",
          value: 1,
        },
      ],
    };
  },
  methods: {
    statusMethods(row) {
      for (var i in this.statusOptions) {
        switch (row.status) {
          case this.statusOptions[i].value:
            return this.statusOptions[i].label;
            break;
        }
      }
    },
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
    // 重置
    resetForm() {
      this.$refs.filters.resetFields();
      this.getData();
    },
    // 获取用户列表
    getData() {
      this.listLoading = true;
      getsChannelCurrency()
        .then((res) => {
          this.listLoading = false;
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //新增
    addSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addChannelCurrency(this.news)
            .then(() => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.$refs[formName].resetFields();
              this.newsFormVisible = false;
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    //删除用户
    deleteHandle(id) {
      this.$confirm("确认删除该通道吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.listLoading = true;
          delChannelCurrency({ id })
            .then((res) => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.listLoading = false;
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
  },
  created() {
    this.getData();
    getsCurrency().then((res) => {
      this.currencyList = res;
    })
    getsChannel().then((res) => {
      this.channelList = res;
    });
  },
};
</script>

<style scoped>
</style>