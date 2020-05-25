<template>
  <div class="home-wrap">
    <el-container>
      <el-header class="header-wrap">
        <div class="header-box dis-fl ju-sb fs22 clffffff hg100">
          <div @click="$router.push('/admin')" class="cu-pt">台球+ 后台管理系统</div>
          <div>
            <el-dropdown @command="handleCommand" trigger="click" class="cu-pt">
              <span class="clffffff">
                 <i class="fs18 el-icon-user-solid"></i>
                  <span class="fs16 mg-l10">管理员</span>
                  <i class="fs16 mg-l10 el-icon-arrow-down"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="register">注册账号</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container class="container-wrap">
        <el-aside class="nav-wrap" width="200px">
          <el-menu
                  router
                  :default-active="defaultActive"
                  class="el-menu-vertical-demo">
            <el-menu-item index="/information">
              <i class="el-icon-menu"></i>
              <span slot="title">资讯管理</span>
            </el-menu-item>
            <el-menu-item index="/signature">
              <i class="el-icon-document"></i>
              <span slot="title">签表管理</span>
            </el-menu-item>
            <el-menu-item index="/course">
              <i class="el-icon-picture-outline"></i>
              <span slot="title">教程管理</span>
            </el-menu-item>
            <!--            <el-menu-item index="/appoint">-->
            <!--              <i class="el-icon-help"></i>-->
            <!--              <span slot="title">约球管理</span>-->
            <!--            </el-menu-item>-->
            <el-menu-item index="/room">
              <i class="el-icon-s-home"></i>
              <span slot="title">球房管理</span>
            </el-menu-item>
            <el-menu-item index="/game">
              <i class="el-icon-date"></i>
              <span slot="title">赛讯管理</span>
            </el-menu-item>
            <!--            <el-menu-item index="/user">-->
            <!--              <i class="el-icon-s-custom"></i>-->
            <!--              <span slot="title">用户管理</span>-->
            <!--            </el-menu-item>-->
            <!--            <el-menu-item index="/banner">-->
            <!--              <i class="el-icon-c-scale-to-original"></i>-->
            <!--              <span slot="title">banner管理</span>-->
            <!--            </el-menu-item>-->
          </el-menu>
        </el-aside>
        <el-main class="main-wrap" v-loading="Mixin_loading" element-loading-background="rgba(255, 255, 255, 0.9)">
          <div class="bkffffff pd20">
            <transition name="fade-transform" mode="out-in">
              <router-view/>
            </transition>
          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "admin",
    data() {
      return {
        defaultActive: '/'
      }
    },
    computed: {},
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this.defaultActive = this.$route.path || '/admin';
        this.getAllCity();
      })
    },
    methods: {
      //获取全部省份城市信息
      getAllCity() {
        this.$api.commonApi.getAllCity().then(res => {
          if (res.data && res.data.resultCode === 0) {
            let data = res.data.data;
            res.data.data.forEach((item, index) => {
              item.children.forEach((itemIn, indexIn) => {
                itemIn.children.forEach((itemInIn, indexInIn) => {
                  delete itemInIn.children
                })
              })
            });
            this.$store.commit('SET_ALL_CITY', data);
          }
        });
      },
      //右上角菜单
      handleCommand(command) {
        switch (command) {
          case 'logout':
            // ;
            this.quit();
            break;
          case 'register':
            this.$router.push('/register');
            break;
        }
      },
      //退出
      quit() {
        this.$api.login.logout().then(res => {
          if (res.data && res.data.resultCode === 0) {
            this.$router.push('/')
          }
        });
      },

    },
    props: {},
    watch: {},
    mixins: [],
    filters: {},
    components: {},
  }
</script>

<style lang="scss" scoped>
  .home-wrap {
    .header-wrap {
      background: #1899ff;

      .header-box {
        line-height: 60px;
      }
    }

    .container-wrap {
      .nav-wrap {
        background: #ffffff;
        min-height: calc(100vh - 60px);
        border-right: 1px solid #cccccc;
      }

      .main-wrap {
        height: calc(100vh - 60px);
      }
    }
  }
</style>
