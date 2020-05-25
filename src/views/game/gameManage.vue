<template>
  <div class="information-wrap">
    <div>
      <el-form :inline="true">
        <el-form-item label="名字:">
          <el-input v-model.trim="condition.name" clearable placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item class="mg-l10" label="创建日期:">
          <el-date-picker
                  class="w300"
                  v-model.trim="condition.timeRang"
                  type="daterange"
                  value-format="timestamp"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="mg-l20">
          <el-button @click="Mixin_handleCurrentChange(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
              border=""
              :data="tableData"
              style="width: 100%">
        <el-table-column
                type="index"
                label="序号"
                width="50">
        </el-table-column>
        <el-table-column
                prop="userName"
                label="名字"
        >
        </el-table-column>
        <el-table-column
                prop="phone"
                label="手机号"
        >
        </el-table-column>
        <el-table-column
                prop="money"
                label="奖金"
        >
          <template slot-scope="scope">
            {{scope.row.money || '-'}}
          </template>
        </el-table-column>
        <el-table-column
                prop="ranking"
                width="260"
                label="名次">
          <template slot-scope="scope">
            {{scope.row.ranking || '-'}}
          </template>
        </el-table-column>

        <el-table-column
                width="180"
                label="创建时间">
          <template slot-scope="scope">
            {{scope.row.createDate | Filter_FormatDate}}
          </template>
        </el-table-column>
        <el-table-column
                prop="address"
                label="操作">
          <template slot-scope="scope">
            <el-button @click="clickEditBtn(scope.row)" type="primary">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="mg-t20">
        <el-col :offset="8" :span="8">
          <el-pagination
                  @current-change="Mixin_handleCurrentChange"
                  :page-size="Mixin_pageSize"
                  layout="prev, pager, next, jumper"
                  :total="Mixin_total">
          </el-pagination>
        </el-col>
      </el-row>
    </div>

    <el-dialog
            title="编辑"
            :visible.sync="isShowGameDialog"
            @close="Mixin_dialogClose('info', 'isShowGameDialog')"
            width="400px">
      <el-form ref="info" :model="info" :rules="infoRules" label-width="120px">
<!--        <el-form-item label="奖金 :" prop="bonus">-->
        <el-form-item label="奖金 :">
          <el-input maxlength="20" placeholder="请输入奖金" v-model.trim="info.bonus"></el-input>
        </el-form-item>
<!--        <el-form-item label="名次 :" prop="ranking">-->
        <el-form-item label="名次 :">
          <el-input maxlength="20" placeholder="请输入名次" v-model.trim="info.ranking"></el-input>
        </el-form-item>
      </el-form>
      <div class="mt10 dis-fl ju-ct">
        <el-button type="primary" @click="submitInfoBtn('info')">确定</el-button>
        <el-button @click="isShowGameDialog = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "gameManage",
    data() {
      return {
        //搜索条件
        condition: {
          name: '',
          createTime: ''
        },
        //表格数据
        tableData: [],
        //显示弹框
        isShowGameDialog: false,
        //赛讯obj
        info: {
          //奖金
          bonus: '',
          //名次
          ranking: '',
        },
        //规则校验
        infoRules: {
          bonus: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '奖金'}),
              trigger: 'blur'
            },
          ],
          ranking: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '名次'}),
              trigger: 'blur'
            },
          ],
        },
        //当前操作状态(edit->编辑, add->新增)
        currentHandle: '',
        //比赛id
        contestId: '',
      }
    },
    computed: {},
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this.contestId = this.$route.query.id || '';
        this.initData();
      })
    },
    methods: {
      //获取数据
      initData() {
        let params = {
          contextId: this.contestId,
          name: this.condition.name,
          currentPage: this.Mixin_currentPage,
          pageSize: this.Mixin_pageSize,
        };
        if (this.condition.timeRang) {
          params.startDate = this.condition.timeRang[0];
          params.stopDate = this.condition.timeRang[1];
        }
        this.$api.game.contestDetail(params).then(res => {
          if (res.data && res.data.resultCode === 0) {
            res.data.data.records.forEach((item, index) => {
              item.buttonLoading = false;
            });
            this.tableData = res.data.data.records;
            this.Mixin_total = res.data.data.total;
          }
        });
      },

      //点击编辑按钮
      clickEditBtn(row) {
        this.currentHandle = 'edit';
        this.info.id = row.id;
        this.isShowGameDialog = true;
        this.info.bonus = row.money;
        this.info.ranking = row.ranking;
      },

      //提交
      submitInfoBtn(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            let params = {
              id: this.info.id,
              money: this.info.bonus,
              ranking: this.info.ranking,
            };
            this.$api.game.setRanking(params).then(res => {
              if (res.data && res.data.resultCode === 0) {
                this.initData();
                this.$message.success('设置奖金和名次成功');
                this.isShowGameDialog = false;
              }
            });
          }
        })
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

</style>
