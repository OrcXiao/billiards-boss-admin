<template>
  <div class="activity-wrap">
    <div>
      <el-form :inline="true">
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
          <el-button @click="clickAddBtn" type="primary">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mg-t20">
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
          prop="name"
          label="活动名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="活动开始时间">
        </el-table-column>
        <el-table-column
          prop="address"
          width="200"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="clickEditBtn(scope.row)" type="primary">编辑</el-button>
            <el-button @click="clickRemoveBtn(scope.row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="currentHandle === 'add' ? '新增活动': '编辑活动'"
      :visible.sync="isShowActivityDialog"
      @close="Mixin_dialogClose('activity', 'isShowActivityDialog')"
      width="1000px">
      <el-form ref="activity" :model="activity" :rules="activityRules" label-width="120px">
        <el-form-item label="活动名称 :" prop="name">
          <el-input maxlength="20" placeholder="请输入活动名称" v-model.trim="activity.name"></el-input>
        </el-form-item>
        <el-form-item label="活动内容 :" prop="content">
          <editor-bar v-model="activity.content" :isClear="isClear"></editor-bar>
        </el-form-item>
      </el-form>
      <div class="mt10 dis-fl ju-ct">
        <el-button :loading="submitButtonLoading" type="primary" @click="submitActivityBtn('activity')">确定</el-button>
        <el-button @click="isShowActivityDialog = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import EditorBar from '../../components/editor'

  export default {
    name: "activity",
    data() {
      return {
        condition: {
          timeRang: '',
        },
        //活动弹窗
        isShowActivityDialog: false,
        //表格数据
        tableData: [],
        //操作类型
        currentHandle: '',
        //活动obj
        activity: {
          name: '',
          content: '',
        },
        //活动校验规则
        activityRules: {
          name: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '活动名称'}),
              trigger: 'blur'
            },
          ],
          content: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '活动内容'}),
              trigger: 'blur'
            },
          ],
        },
        //编辑器
        isClear: false,
        //提交按钮加载状态
        submitButtonLoading: false,

      }
    },
    props: {},
    watch: {},
    computed: {},
    created() {
    },
    mounted() {
      //this.$ nextTick(() => {

      //})
    },
    methods: {
      //点击'新增活动'
      clickAddBtn() {
        this.currentHandle = 'add';
        this.isShowActivityDialog = true;
      },
      //点击编辑按钮
      clickEditBtn(row) {
        this.currentHandle = 'edit';
        this.isShowActivityDialog = true;
      },
      //点击删除
      clickRemoveBtn(row, type) {
        this.$confirm(`确定删除当前活动 ?`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$api.room.delRoom(row.id).then(res => {
          //   if (res.data && res.data.resultCode === 0) {
          //     this.$message.success(`活动删除成功`);
          //     this.Mixin_handleCurrentChange(1);
          //   }
          // });
        }).catch(() => {
        });
      },
      //点击提交
      submitActivityBtn(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {

          }
        })
      },
    },
    mixins: [],
    filters: {},
    components: {EditorBar},
  }
</script>

<style lang="scss" scoped>

</style>
