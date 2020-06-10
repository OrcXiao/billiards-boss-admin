<template>
  <div class="person-wrap">
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
          label="人员名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="人员开始时间">
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
      :title="currentHandle === 'add' ? '新增人员': '编辑人员'"
      :visible.sync="isShowPersonDialog"
      @close="Mixin_dialogClose('person', 'isShowPersonDialog')"
      width="400px">
      <el-form ref="person" :model="person" :rules="personRules" label-width="120px">
        <el-form-item label="人员姓名 :" prop="name">
          <el-input maxlength="20" placeholder="请输入人员姓名" v-model.trim="person.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码 :" prop="phone">
          <el-input maxlength="11" placeholder="请输入手机号码" v-model.trim="person.phone"></el-input>
        </el-form-item>
        <el-form-item label="人员性别 :" prop="sex">
          <el-radio-group v-model="person.sex">
            <el-radio border label="1">男</el-radio>
            <el-radio border label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="人员级别 :" prop="rank">
          <el-input placeholder="请输入人员级别" v-model.trim="person.rank"></el-input>
        </el-form-item>

      </el-form>
      <div class="mt10 dis-fl ju-ct">
        <el-button :loading="submitButtonLoading" type="primary" @click="submitPersonBtn('person')">确定</el-button>
        <el-button @click="isShowPersonDialog = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import EditorBar from '../../components/editor'

  export default {
    name: "personnel",
    data() {
      return {
        condition: {
          timeRang: '',
        },
        //人员弹窗
        isShowPersonDialog: false,
        //表格数据
        tableData: [],
        //操作类型
        currentHandle: '',
        //人员obj
        person: {
          name: '',
          phone: '',
          sex: '',
          rank: '',
        },
        //人员校验规则
        personRules: {
          name: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '人员名称'}),
              trigger: 'blur'
            },
          ],
          phone: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '手机号码'}),
              trigger: 'blur'
            },
          ],
          sex: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '人员性别'}),
              trigger: 'change'
            },
          ],
          rank: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '人员级别'}),
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
      //点击'新增人员'
      clickAddBtn() {
        this.currentHandle = 'add';
        this.isShowPersonDialog = true;
      },
      //点击编辑按钮
      clickEditBtn(row) {
        this.currentHandle = 'edit';
        this.isShowPersonDialog = true;
      },
      //点击删除
      clickRemoveBtn(row, type) {
        this.$confirm(`确定删除当前人员 ?`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$api.room.delRoom(row.id).then(res => {
          //   if (res.data && res.data.resultCode === 0) {
          //     this.$message.success(`人员删除成功`);
          //     this.Mixin_handleCurrentChange(1);
          //   }
          // });
        }).catch(() => {
        });
      },
      //点击提交
      submitPersonBtn(formName) {
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
