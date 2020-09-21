import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/common.css'
//引入全局的mixin..
import globalMixins from "./mixin/global_mixin.js"
//引入全局校验js..
import verify from './verify/index';
import axios from './axios'
//引入api..
import api from './axios/api';
//引入过滤器
import filters from './filters';
//引入websocket TiYi
import CWebSocket from './proto/WebSocketUtils'

for (let item in filters) {
    Vue.filter(item, filters[item])
}

Vue.use(ElementUI);
Vue.mixin(globalMixins);
Vue.prototype.$verifys = verify;
Vue.prototype.$api = api;
Vue.prototype.$axios = axios;

import upload from './components/upload.vue';

Vue.component('CmUpload', upload);

import Router from 'vue-router'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

//初始化 TiYi
Vue.prototype.WebInstance = new CWebSocket(axios.defaults.baseWeb)
Vue.prototype.Account = ""

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
