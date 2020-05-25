<template>
  <div class="signature-wrap">
    <div>
      <el-form :inline="true">
        <el-form-item label="地区:">
          <el-cascader v-model.trim="condition.area" :options="options"></el-cascader>
        </el-form-item>
        <el-form-item class="mg-l10" label="标题:">
          <el-input v-model.trim="condition.title" clearable placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item class="mg-l10" label="创建日期:">
          <el-date-picker
                  v-model.trim="condition.createTime"
                  align="right"
                  type="date"
                  placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="mg-l10" label="积分:">
          <el-input v-model.trim="condition.integral" clearable placeholder="请输入积分"></el-input>
        </el-form-item>
        <el-form-item class="mg-l20">
          <el-button @click="initData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>总计: 100场</div>
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
                prop="id"
                label="约球ID"
                width="180">
        </el-table-column>
        <el-table-column
                prop="name"
                label="地点"
                width="180">
        </el-table-column>
        <el-table-column
                prop="address"
                label="积分">
        </el-table-column>
        <el-table-column
                prop="state"
                width="120"
                label="选手">
        </el-table-column>
        <el-table-column
                label="创建时间">
          <template slot-scope="scope">
            {{scope.row.createDate | Filter_FormatDate}}
          </template>
        </el-table-column>
        <el-table-column
                prop="address"
                label="操作">
          <template slot-scope="scope">
            <el-button @click="clickLookBtn(scope.row)" type="primary">查看</el-button>
            <el-button @click="clickRemoveBtn(scope.row)" type="danger">删除</el-button>
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
            title="查看约球"
            :visible.sync="isShowAppointDialog"
            @close="Mixin_dialogClose('appoint', 'isShowAppointDialog')"
            width="700px">
      <el-form label-width="120px">
        <el-form-item label="教程标题 :" prop="title">
          <el-input maxlength="20" placeholder="请输入教程标题" v-model.trim="appoint.title"></el-input>
        </el-form-item>
        <el-form-item label="教程详情 :" prop="details">
          <el-input maxlength="100" type="textarea" placeholder="请输入教程详情" v-model.trim="appoint.details"></el-input>
        </el-form-item>
      </el-form>
      <div class="mt10 dis-fl ju-ct">
        <el-button type="primary" @click="isShowAppointDialog = false">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
    export default {
        name: "appoint",
        data() {
            return {
                options: [],
                //搜索条件
                condition: {
                    area: '',
                    title: '',
                    createTime: '',
                    integral: '',
                },
                //表格数据
                tableData: [],
                //显示弹框
                isShowAppointDialog: false,
                //教程obj
                appoint: {
                    //标题
                    title: '',
                    //详情
                    details: '',
                    //教程图片
                    img: ''
                },

            }
        },
        computed: {},
        created() {
        },
        mounted() {
            this.$nextTick(() => {
                this.initData();
            })
        },
        methods: {
            //获取数据
            initData() {
                let params = {
                    title: this.condition.title,
                    currentPage: this.Mixin_currentPage,
                    pageSize: this.Mixin_pageSize,
                };
                if (this.condition.timeRang) {
                    params.startDate = this.condition.timeRang[0];
                    params.stopDate = this.condition.timeRang[1];
                }
                this.$api.room.getRooms(params).then(res => {
                    if (res.data && res.data.resultCode === 0) {
                        res.data.data.records.forEach((item, index) => {
                            item.buttonLoading = false;
                        });
                        this.tableData = res.data.data.records;
                        this.Mixin_total = res.data.data.total;
                    }
                });
            },
            //点击查看按钮
            clickLookBtn() {
                this.isShowAppointDialog = true;
            },
            //点击删除按钮
            clickRemoveBtn(row) {
                this.$confirm(`确定删除约球记录 ?`, '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {


                }).catch(() => {

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

</style>
