<template>
  <section class="page-container">
    <div class="tableDivs">
      <div class="toolNav">
        <div class="toolNavList">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="mini"
            @click="handleAdd()"
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
        <el-table-column prop="menu_name" label="名称"></el-table-column>
        <el-table-column
          prop="menu_type"
          label="菜单类型"
          :formatter="typeMethods"
        ></el-table-column>
        <el-table-column prop="parent_id" label="父菜单ID"></el-table-column>
        <el-table-column prop="path" label="路由地址"></el-table-column>
        <el-table-column prop="role_sort" label="显示顺序"></el-table-column>
        <el-table-column prop="component" label="组件路径"></el-table-column>
        <el-table-column prop="perms" label="权限标识"></el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDelete(scope.row.id)" size="mini">删除</el-button>
            <el-button type="text" @click="handleEdit(scope.row)" size="mini">编辑</el-button>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
    <!--新增界面-->
    <el-dialog
      title="新增权限"
      :visible.sync="newsFormVisible"
      style="width: 60%; margin: 0 auto"
    >
      <el-form :model="news" :rules="rules" ref="news">
        <el-form-item
          prop="menu_name"
          label="菜单名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="news.menu_name"
            autocomplete="off"
            placeholder="菜单名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="菜单类型"
          prop="menu_type"
          :label-width="formLabelWidth"
        >
          <el-select v-model="news.menu_type" placeholder="菜单类型">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="parent_id"
          label="父菜单ID"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="news.parent_id"
            autocomplete="off"
            placeholder="父菜单ID"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="order_num"
          label="路由地址"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="news.order_num"
            autocomplete="off"
            placeholder="路由地址"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="addSubmit('news')"
          >确定</el-button
        >
        <el-button size="mini" @click="newsFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!--编辑-->
    <el-dialog
      title="编辑权限"
      :visible.sync="editForwVisible"
      style="width: 60%; margin: 0 auto"
    >
      <el-form :model="edit" :rules="rules" ref="edit">
        <el-form-item
          prop="menu_name"
          label="菜单名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="edit.menu_name"
            autocomplete="off"
            placeholder="菜单名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="菜单类型"
          prop="menu_type"
          :label-width="formLabelWidth"
        >
          <el-select v-model="edit.menu_type" placeholder="菜单类型">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="parent_id"
          label="父菜单ID"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="edit.parent_id"
            autocomplete="off"
            placeholder="父菜单ID"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="order_num"
          label="路由地址"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="edit.order_num"
            autocomplete="off"
            placeholder="路由地址"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="editSubmit('edit')"
          >确定</el-button
        >
        <el-button size="mini" @click="editForwVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getsPermission, setPermission, delPermission } from "@/api/role";
export default {
  data() {
    return {
      tableData: [],
      listLoading: false,
      news: {
        menu_name: "",
        parent_id: "",
        order_num: "",
        component: "1",
        is_frame: "1",
        menu_type: "C",
        role_sort: "1",
        perms: "1",
        icon: "1",
        remark: "",
      },
      edit: {
        menu_name: "",
        parent_id: "",
        order_num: "",
        component: "1",
        is_frame: "1",
        menu_type: "C",
        role_sort: "1",
        perms: "1",
        icon: "1",
        remark: "",
      },
      formLabelWidth: "120px",
      LabelWidth: "140px",
      ipVisible: false,
      newsFormVisible: false,
      editForwVisible: false,
      rules: {
        menu_name: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        menu_type: [
          { required: true, message: "请选择菜单类型", trigger: "change" },
        ],
        parent_id: [
          { required: true, message: "请输入父菜单ID", trigger: "blur" },
        ],
        order_num: [
          { required: true, message: "请选择菜单路径", trigger: "change" },
        ],
      },
      typeOptions: [
        {
          label: "目录",
          value: "M",
        },
        {
          label: "菜单",
          value: "C",
        },
        {
          label: "按钮",
          value: "F",
        },
      ],
    };
  },
  methods: {
    // 重置
    resetForm() {
      this.$refs.filters.resetFields();
      this.getData();
    },
    typeMethods(row) {
      for (var i in this.typeOptions) {
        switch (row.menu_type) {
          case this.typeOptions[i].value:
            return this.typeOptions[i].label;
            break;
        }
      }
    },
    // 获取列表
    getData() {
      let params = {
        page: this.page,
        limit: this.pageSize,
      };
      this.listLoading = true;
      getsPermission(params)
        .then((res) => {
          this.listLoading = false;
          this.tableData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //显示新增界面
    handleAdd() {
      this.newsFormVisible = true;
    },
    //新增
    addSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setPermission(this.news)
            .then((res) => {
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
    // 编辑
    handleEdit(row) {
      this.editForwVisible = true;
      this.edit = row;
    },
    // 确认编辑
    editSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setPermission(this.edit)
            .then((res) => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.$refs[formName].resetFields();
              this.editForwVisible = false;
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    handleDelete(id) {
      delPermission({permission_id: id})
            .then((res) => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.getData();
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