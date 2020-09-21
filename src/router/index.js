import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/admin.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/home/home.vue'),
      },
      {
        path: '/roomInfo',
        name: 'roomInfo',
        component: () => import('../views/roomInfo/roomInfo.vue'),
      },
      {
        path: '/activity',
        name: 'activity',
        component: () => import('../views/activity/activity.vue'),
      },
      {
        path: '/personnel',
        name: 'personnel',
        component: () => import('../views/personnel/personnel.vue'),
      },
      {
        path: '/game',
        name: 'game',
        component: () => import('../views/game/game.vue'),
      },
    ]
  },
  {
    path: '*',
    component: () => import('../views/err/err.vue'),
    meta: {
      title: '404未找到'
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  store.commit('SET_LOADING_STATE', true);
  if (to.path === '/') {
    next()
  } else {
    //TiYi
    //let info = localStorage.getItem('userLoginLog');
    let bLogin = Vue.prototype.Account != null && Vue.prototype.Account.length !== 0
    console.log("check has login: ", bLogin, Vue.prototype.Account)
    if (bLogin) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  }
});
export default router
