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
                path: '/register',
                name: 'register',
                component: () => import('../views/register/register.vue'),

            },
            {
                path: '/information',
                name: 'information',
                component: () => import('../views/information/information.vue'),

            },
            {
                path: '/signature',
                name: 'signature',
                component: () => import('../views/signature/signature.vue'),

            },
            {
                path: '/course',
                name: 'course',
                component: () => import('../views/course/course.vue'),

            },
            {
                path: '/appoint',
                name: 'appoint',
                component: () => import('../views/appoint/appoint.vue'),

            },
            {
                path: '/room',
                name: 'room',
                component: () => import('../views/room/room.vue'),

            },
            {
                path: '/game',
                name: 'game',
                component: () => import('../views/game/game.vue'),
            },
            {
                path: '/gameManage',
                name: 'game',
                component: () => import('../views/game/gameManage.vue'),
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/user/user.vue'),

            },
            {
                path: '/banner',
                name: 'banner',
                component: () => import('../views/banner/banner.vue'),

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
        let info = localStorage.getItem('userLoginLog');
        if (info) {
            next()
        } else {
            next({
                path: '/'
            })
        }
    }
});
export default router
