<template>
  <div class="signature-wrap">
    <div>
      <el-form :inline="true">
        <el-form-item label="标题:">
          <el-input v-model.trim="condition.title" clearable placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item class="mg-l20" label="创建日期:">
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
          <el-button type="primary" @click="clickAddBtn">新增</el-button>
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
                prop="id"
                label="教程ID">
        </el-table-column>
        <el-table-column
                prop="title"
                label="教程标题">
        </el-table-column>
        <el-table-column
                width="260"
                label="缩略图">
          <template slot-scope="scope">
            <div class="thumbnail-wrap">
              <img class="hg100 wd100" :src="scope.row.imgUrl" alt="">
            </div>
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
                prop="state"
                width="120"
                label="教程状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.showFlag" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
                width="300"
                label="操作">
          <template slot-scope="scope">
            <el-button :loading="scope.row.buttonLoading" @click="clickEditBtn(scope.row)" type="primary">编辑</el-button>
            <el-button v-if="!scope.row.showFlag" @click="clickStartOrEndBtn(scope.row, 'start')" type="success">启用
            </el-button>
            <el-button v-if="scope.row.showFlag" @click="clickStartOrEndBtn(scope.row, 'end')" type="warning">禁用
            </el-button>
            <el-button @click="clickRemoveBtn(scope.row)" type="danger">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="mg-t20">
        <el-col :offset="8" :span="8">
          <el-pagination
                  @current-change="Mixin_handleCurrentChange"
                  :page-size="Mixin_pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="Mixin_total">
          </el-pagination>
        </el-col>
      </el-row>
    </div>

    <el-dialog
            :title="currentHandle === 'add' ? '新增教程': '编辑教程'"
            :visible.sync="isShowInfoDialog"
            @close="Mixin_dialogClose('info', 'isShowInfoDialog')"
            width="700px">
      <el-form ref="info" :model="info" :rules="infoRules" label-width="120px">
        <el-form-item label="教程标题 :" prop="title">
          <el-input maxlength="20" placeholder="请输入教程标题" v-model.trim="info.title"></el-input>
        </el-form-item>
        <el-form-item label="教程详情 :" prop="details">
          <el-input maxlength="100" type="textarea" placeholder="请输入教程详情" v-model.trim="info.details"></el-input>
        </el-form-item>
        <el-form-item label="教程标题图片  :" prop="img">
          <CmUpload
                  upload-name="img"
                  :initObj="info.img"
                  @uploadSuccess="uploadSuccess">
          </CmUpload>
        </el-form-item>
      </el-form>
      <div class="mt10 dis-fl ju-ct">
        <el-button v-loading="submitButtonLoading" type="primary" @click="submitInfoBtn('info')">确定</el-button>
        <el-button @click="isShowInfoDialog = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "course",
    data() {
      return {
        //搜索条件
        condition: {
          title: '',
          timeRang: null
        },
        //表格数据
        tableData: [],
        //显示弹框
        isShowInfoDialog: false,
        //教程obj
        info: {
          //标题
          title: '',
          //详情
          details: '',
          //教程图片
          img: ''
        },
        //规则校验
        infoRules: {
          title: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '教程标题'}),
              trigger: 'blur'
            },
          ],
          details: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '教程详情'}),
              trigger: 'blur'
            },
          ],
          img: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '教程标题图片'}),
              trigger: 'change'
            },
          ],
        },
        //当前操作状态(edit->编辑, add->新增)
        currentHandle: '',
        submitButtonLoading: false,
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
          params.stopDate = this.condition.timeRang[1] + (1000 * 60 * 60 * 24 - 1);
        }
        this.$api.course.getCourses(params).then(res => {
          if (res.data && res.data.resultCode === 0) {
            res.data.data.records.forEach((item, index) => {
              item.buttonLoading = false;
            });
            this.tableData = res.data.data.records;
            this.Mixin_total = res.data.data.total;
          }
        });
      },
      //点击新增按钮
      clickAddBtn() {
        this.currentHandle = 'add';
        this.info.title = '';
        this.info.details = '';
        this.info.img = '';
        this.isShowInfoDialog = true;
      },
      //点击编辑按钮
      clickEditBtn(row) {
        this.currentHandle = 'edit';
        this.info.id = row.id;
        row.buttonLoading = true;
        this.$api.course.getCourseById(row.id).then(res => {
          row.buttonLoading = false;
          if (res.data && res.data.resultCode === 0) {
            let data = res.data.data;
            this.info.title = data.title;
            this.info.details = data.context;
            this.info.img = data.imgUrl;
            this.isShowInfoDialog = true;
          }
        });
      },
      //上传成功
      uploadSuccess(data) {
        this.info.img = data.imgSrc;
      },
      //提交教程
      submitInfoBtn(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            this.submitButtonLoading = true;
            if (this.currentHandle === 'add') {
              //新增资讯
              let params = {
                context: this.info.details,
                title: this.info.title,
                showFlag: false,
                imgUrl: this.info.img
              };
              this.$api.course.addCourse(params).then(res => {
                this.submitButtonLoading = false;
                if (res.data && res.data.resultCode === 0) {
                  this.$message.success('新增教程成功');
                  this.initData();
                  this.isShowInfoDialog = false;
                }
              });
            } else {
              //编辑资讯
              let params = {
                id: this.info.id,
                context: this.info.details,
                title: this.info.title,
                showFlag: false,
                imgUrl: this.info.img
              };
              this.$api.course.addCourse(params).then(res => {
                this.submitButtonLoading = false;
                if (res.data && res.data.resultCode === 0) {
                  this.$message.success('修改教程成功');
                  this.initData();
                  this.isShowInfoDialog = false;
                }
              });
            }
          }
        })
      },
      //点击启用/禁用按钮
      clickStartOrEndBtn(row, type) {
        this.$confirm(`确定${type === 'start' ? '启用' : '禁用'}当前教程 ?`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.course.updateShow(row.id).then(res => {
            if (res.data && res.data.resultCode === 0) {
              this.$message.success(`教程${type === 'start' ? '启用' : '禁用'}成功`);
              this.initData();
            }
          });

        }).catch(() => {

        });
      },
      //点击'删除'按钮
      clickRemoveBtn(row) {
        this.$confirm(`确定删除当前教程 ?`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.course.delCourse(row.id).then(res => {
            if (res.data && res.data.resultCode === 0) {
              this.$message.success(`教程删除成功`);
              this.Mixin_handleCurrentChange(1);
            }
          });
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
