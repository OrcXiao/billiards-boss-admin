(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f8a1192"],{"08ba":function(t,a,e){var i=e("d890"),s=e("064b"),n=e("3c10"),o=e("0fc1");for(var r in s){var c=i[r],l=c&&c.prototype;if(l&&l.forEach!==n)try{o(l,"forEach",n)}catch(d){l.forEach=n}}},"3c10":function(t,a,e){"use strict";var i=e("5dfd").forEach,s=e("d7e1"),n=e("ff9c"),o=s("forEach"),r=n("forEach");t.exports=o&&r?[].forEach:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}},"8b28":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"home-wrap"},[e("el-container",[e("el-header",{staticClass:"header-wrap"},[e("div",{staticClass:"header-box dis-fl ju-sb fs22 clffffff hg100"},[e("div",{staticClass:"cu-pt",on:{click:function(a){return t.$router.push("/admin")}}},[t._v("台球+ (球房使用版) 后台管理系统")]),e("div",[e("el-dropdown",{staticClass:"cu-pt",attrs:{trigger:"click"},on:{command:t.handleCommand}},[e("span",{staticClass:"clffffff"},[e("i",{staticClass:"fs18 el-icon-user-solid"}),e("span",{staticClass:"fs16 mg-l10"},[t._v("管理员")]),e("i",{staticClass:"fs16 mg-l10 el-icon-arrow-down"})]),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e("el-dropdown-item",{attrs:{command:"logout"}},[t._v("退出")])],1)],1)],1)])]),e("el-container",{staticClass:"container-wrap"},[e("el-aside",{staticClass:"nav-wrap",attrs:{width:"200px"}},[e("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{router:"","default-active":t.defaultActive}},[e("el-menu-item",{attrs:{index:"/roomInfo"}},[e("i",{staticClass:"el-icon-s-home"}),e("span",{attrs:{slot:"title"},slot:"title"},[t._v("球房信息")])]),e("el-menu-item",{attrs:{index:"/activity"}},[e("i",{staticClass:"el-icon-s-help"}),e("span",{attrs:{slot:"title"},slot:"title"},[t._v("活动管理")])]),e("el-menu-item",{attrs:{index:"/personnel"}},[e("i",{staticClass:"el-icon-user-solid"}),e("span",{attrs:{slot:"title"},slot:"title"},[t._v("人员管理")])]),e("el-menu-item",{attrs:{index:"/game"}},[e("i",{staticClass:"el-icon-s-flag"}),e("span",{attrs:{slot:"title"},slot:"title"},[t._v("赛事管理")])])],1)],1),e("el-main",{directives:[{name:"loading",rawName:"v-loading",value:t.Mixin_loading,expression:"Mixin_loading"}],staticClass:"main-wrap",attrs:{"element-loading-background":"rgba(255, 255, 255, 0.9)"}},[e("div",{staticClass:"bkffffff pd20"},[e("transition",{attrs:{name:"fade-transform",mode:"out-in"}},[e("router-view")],1)],1)])],1)],1)],1)},s=[],n=(e("fe59"),e("08ba"),{name:"admin",data:function(){return{defaultActive:"/"}},computed:{},created:function(){},mounted:function(){var t=this;this.$nextTick((function(){t.defaultActive=t.$route.path||"/admin",t.getAllCity()}))},methods:{getAllCity:function(){var t=this;this.$api.commonApi.getAllCity().then((function(a){if(a.data&&0===a.data.resultCode){var e=a.data.data;a.data.data.forEach((function(t,a){t.children.forEach((function(t,a){t.children.forEach((function(t,a){delete t.children}))}))})),t.$store.commit("SET_ALL_CITY",e)}}))},handleCommand:function(t){switch(t){case"logout":this.quit();break;case"register":this.$router.push("/register");break}},quit:function(){var t=this;this.$api.login.logout().then((function(a){a.data&&0===a.data.resultCode&&t.$router.push("/")}))}},props:{},watch:{},mixins:[],filters:{},components:{}}),o=n,r=(e("d601"),e("9ca4")),c=Object(r["a"])(o,i,s,!1,null,"a047948c",null);a["default"]=c.exports},"8e38":function(t,a,e){},d601:function(t,a,e){"use strict";var i=e("8e38"),s=e.n(i);s.a},fe59:function(t,a,e){"use strict";var i=e("1c8b"),s=e("3c10");i({target:"Array",proto:!0,forced:[].forEach!=s},{forEach:s})}}]);
//# sourceMappingURL=chunk-4f8a1192.d5afcc7b.js.map