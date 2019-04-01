import Vue from 'vue';
import app from './src/views/app.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './src/styles/global.css'

import qs from 'qs';
import { get, post, put, deleteDate, success, fail, handleTime } from './utils/http.js'
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$put = put;
Vue.prototype.$delete = deleteDate;
Vue.prototype.$qs = qs;
Vue.prototype.$success = success;
Vue.prototype.$fail = fail;
Vue.prototype.$handleTime = handleTime;


import VueRouter from 'vue-router';
import createRouter from './vue-loader/router.js';
Vue.use(VueRouter);
const router = createRouter();

import Vuex from 'vuex';
import createStore from './store/store.js';
Vue.use(Vuex);
const store = createStore();

new Vue({
    el: "#root",
    router,
    store,
    render: h => h(app)
})