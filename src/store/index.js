import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //页面loading状态
        vx_pageLoading: false,
        //所有城市
        vx_allCity: [],
    },
    mutations: {
        //设置loading状态
        SET_LOADING_STATE(state, val) {
            state.vx_pageLoading = val
        },
        //设置所有城市
        SET_ALL_CITY(state, val){
            state.vx_allCity = val;
        }
    }


});

export default store
