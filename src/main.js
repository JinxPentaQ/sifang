import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './router/routes'
import axios from 'axios'
import global_ from './baseUrl.js'
import qs from 'qs'
import 'font-awesome/css/font-awesome.min.css'
import VueClipboard from 'vue-clipboard2'
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
//引入
import md5 from 'js-md5';
//扩展vue的插件
Vue.prototype.$md5 = md5;
Vue.prototype.$qs = qs;


Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(quillEditor);
Vue.use(VueClipboard)
VueClipboard.config.autoSetContainer = true

Vue.prototype.$http = axios;
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL = "https://service.wdroplet.com/";

const router = new VueRouter({
  // mode: 'history',
  routes,
});



// 路由监听是否登录，有无user
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.clear();
  }
  let user = JSON.parse(sessionStorage.getItem('token'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

