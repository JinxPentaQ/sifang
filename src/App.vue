<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  /*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
  // background: #1F2D3D;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}

.el-submenu [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.el-menu-item [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.toolbar {
  background: #fff;
  margin: 10px 0px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 9px 0px rgba(54, 55, 55, 0.09);
  border-radius: 8px;
  .el-form-item {
    margin-bottom: 10px !important;
  }
}
.el-form-item {
  margin-bottom: 10px !important;
}
.toolNav {
  margin: 0 auto;
  display: block;
  height: 44px;
  line-height: 44px;
  background: #f2f4f7;
  border-radius: 5px 5px 0 0;
  border-bottom: none;
  position: relative;
}
.toolNav:before {
  content: "";
  display: block;
  height: 100%;
  margin-left: 0px;
  border-left: 1px solid rgba(190, 207, 217, 1);
  border-top: 1px solid rgba(190, 207, 217, 1);
  border-right: 1px solid rgba(190, 207, 217, 1);
  border-radius: 5px 5px 0 0;
}
.toolNavList {
  position: absolute;
  left: 5px;
  top: 0;
  z-index: 9;
}
.el-table td {
  padding: 0 !important;
  height: 44px;
}
.el-table .cell {
  line-height: 15px !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.el-form-item__content input::-webkit-input-placeholder {
  font-size: 12px;
}
.el-form-item__content input {
  font-size: 12px;
}
.el-form-item__content select {
  font-size: 12px;
}
.el-form-item__content textarea {
  font-size: 12px;
}
// .el-input__inner {
//     width: 178px !important;
// }
.inputShot .el-input__inner {
  width: 83px !important;
}
.inputShot {
  width: 83px !important;
}
.el-dialog .el-select .el-input--suffix .el-input__inner {
  width: 100%;
}
.el-dialog,
.el-message-box {
  border-radius: 6px !important;
}
.el-dialog__header,
.el-message-box__header {
  box-shadow: 0px 2px 8px 0px rgba(79, 79, 79, 0.15);
  background: rgba(245, 247, 250, 1);
  padding: 10px !important;
  border-radius: 6px 6px 0 0 !important;
}
.el-dialog__header span,
.el-message-box__header span {
  font-size: 15px;
  color: #333333;
  padding-left: 10px;
}
.el-dialog__header .el-dialog__headerbtn {
  top: 15px;
  right: 15px;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.cell p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-input .el-input__inner .el-input--medium .el-input__inner,
.el-input .el-input__inner {
  height: 32px !important;
}
.el-range-editor--medium.el-input__inner,
.el-form-item__content .el-input__inner {
  height: 32px !important;
}
.titleContent {
  height: 35px;
  line-height: 35px;
  background: #f2f4f7;
  border-radius: 5px 5px 0 0;
  padding-left: 10px;
  margin-bottom: 15px;
}
.container .main .content-container .content-wrapper {
  background: none !important;
}
.tableDivs {
  // width: 100%;
  background: #fff;
  box-shadow: 0px 0px 9px 0px rgba(54, 55, 55, 0.09);
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  padding: 20px;
}
.tableTotal {
  width: 95%;
  margin-left: 2.5%;
  margin: 0 auto;
  margin-top: 30px;
  background-color: #f2f4f7;
  height: 40px;
  line-height: 40px;
  border: 1px solid #becfd9;
  box-sizing: border-box;
  border-bottom: 0;
  color: #606266;
  padding-left: 20px;
  border-radius: 5px 5px 0 0;
  .topItemContent {
    color: #f4a32b;
  }
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  background-color: #409eff !important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #409eff !important;
}
.el-switch.is-checked .el-switch__core {
  background-color: #409eff !important;
  border-color: #409eff !important;
}
.el-table__body tr:hover > td {
  background-color: #f3f3f4 !important;
}
.el-table__body tr.current-row > td {
  background-color: #f3f3f4 !important;
}
.el-table th {
  background: #f2f4f7 !important;
}
.el-table {
  width: 95%;
  margin: 0 auto;
  border-left: 1px solid #becfd9 !important;
  border-top: 1px solid #becfd9 !important;
  border-bottom: 1px solid #becfd9 !important;
  border-right: 1px solid #becfd9 !important;
}
.el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: 1px solid #becfd9 !important;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #becfd9 !important;
}
.el-button--primary {
  background: #409eff !important;
  border-color: #409eff !important;
}
.el-button--text {
  color: #409eff !important;
}
.toolNavList .el-button {
  padding-left: 6px;
  padding-right: 6px;
}
.toolNavList .el-button span,
.toolNavList .el-button i {
  color: #ffffff;
}
.toolNavList button:hover {
  background: #409eff;
  span {
    color: #fff;
  }
  i {
    color: #fff;
  }
}
// .toolNavList .el-button:hover span{
// 	color: #fff;
// }
// .toolNavList .el-button:hover i{
// 	color: #fff;
// }

.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
  background: none;
  // color: #242424;
  span {
    color: #242424;
  }
  i {
    color: #242424;
  }
}
.el-table .cell {
  padding-left: 20px !important;
  font-size: 12px;
}
.el-table th > .cell {
  font-size: 14px;
  color: #333333;
}
.el-pagination .el-pagination__sizes .el-input input.el-input__inner {
  width: 103px !important;
}
.el-pagination .el-pagination__jump .el-input input.el-input__inner {
  width: 35px !important;
}
.el-tabs__item.is-active {
  color: #409eff !important;
}
.el-tabs__active-bar {
  background-color: #409eff !important;
}
.toolbar .el-input__inner {
  width: 178px;
}
.el-step__head.is-finish {
  color: #409eff !important;
  border-color: #409eff !important;
}
.el-step__title.is-finish {
  color: #409eff !important;
}
.line{
  text-align: center;
}
.el-select-dropdown__item{
margin-bottom: 10px;
}

.page-container {
  padding: 0 20px;
}
</style>