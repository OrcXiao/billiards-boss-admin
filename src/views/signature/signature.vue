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
          <el-button @click="initData">查询</el-button>
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
                label="签表ID">
        </el-table-column>
        <el-table-column
                prop="title"
                label="签表标题">
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
                prop="createDate"
                label="创建时间">
          <template slot-scope="scope">
            {{scope.row.createDate | Filter_FormatDate}}
          </template>
        </el-table-column>
        <el-table-column
                prop="state"
                width="120"
                label="签表状态">
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
            :title="currentHandle === 'add' ? '新增签表': '编辑签表'"
            :visible.sync="isShowInfoDialog"
            @close="Mixin_dialogClose('info', 'isShowInfoDialog')"
            width="700px">
      <el-form ref="info" :model="info" :rules="infoRules" label-width="120px">
        <el-form-item label="签表标题 :" prop="title">
          <el-input maxlength="20" placeholder="请输入签表标题" v-model.trim="info.title"></el-input>
        </el-form-item>
        <!--        <el-form-item label="签表详情 :" prop="details">-->
        <!--          <el-input maxlength="100" type="textarea" placeholder="请输入签表详情" v-model.trim="info.details"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="签表标题图片 :" prop="img">
          <CmUpload
                  upload-name="img"
                  :initObj="info.img"
                  @uploadSuccess="uploadSuccess">
          </CmUpload>
        </el-form-item>
        <el-form-item label="签表详情1 :">
          <CmUpload
                  upload-name="imgOne"
                  :initObj="info.imgOne"
                  @uploadSuccess="uploadSuccess">
          </CmUpload>
        </el-form-item>
        <el-form-item label="签表详情2 :">
          <CmUpload
                  upload-name="imgTwo"
                  :initObj="info.imgTwo"
                  @uploadSuccess="uploadSuccess">
          </CmUpload>
        </el-form-item>
        <el-form-item label="签表详情3 :">
          <CmUpload
                  upload-name="imgThree"
                  :initObj="info.imgThree"
                  @uploadSuccess="uploadSuccess">
          </CmUpload>
        </el-form-item>
        <el-form-item label="签表详情4 :">
          <CmUpload
                  upload-name="imgFour"
                  :initObj="info.imgFour"
                  @uploadSuccess="uploadSuccess">
          </CmUpload>
        </el-form-item>
      </el-form>
      <div class="mt10 dis-fl ju-ct">
        <el-button :loading="submitButtonLoading" type="primary" @click="submitInfoBtn('info')">确定</el-button>
        <el-button @click="isShowInfoDialog = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "signature",
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
        //签表obj
        info: {
          //标题
          title: '',
          //签表图片
          img: '',
          imgOne: '',
          imgTwo: '',
          imgThree: '',
          imgFour: '',
        },
        //规则校验
        infoRules: {
          title: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '签表标题'}),
              trigger: 'blur'
            },
          ],
          details: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '签表详情'}),
              trigger: 'blur'
            },
          ],
          img: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '签表标题图片'}),
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
        this.$api.signature.getSignForms(params).then(res => {
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
        this.info.img = '';
        this.info.imgOne = '';
        this.info.imgTwo = '';
        this.info.imgThree = '';
        this.info.imgFour = '';
        this.isShowInfoDialog = true;
      },
      //点击编辑按钮
      clickEditBtn(row) {
        this.currentHandle = 'edit';
        this.info.id = row.id;
        row.buttonLoading = true;
        this.$api.signature.getSignFormById(row.id).then(res => {
          row.buttonLoading = false;
          if (res.data && res.data.resultCode === 0) {
            let data = res.data.data;
            this.info.title = data.title;
            this.info.imgOne = data.imgOne;
            this.info.imgTwo = data.imgTwo;
            this.info.imgThree = data.imgThree;
            this.info.imgFour = data.imgFour;
            this.info.img = data.imgUrl;
            this.isShowInfoDialog = true;
          }
        });
      },

      //上传成功
      uploadSuccess(data) {
        this.info[data.uploadName] = data.imgSrc;
      },
      //提交签表
      submitInfoBtn(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            this.submitButtonLoading = true;
            if (this.currentHandle === 'add') {
              //新增资讯
              let params = {
                imgOne: this.info.imgOne,
                imgTwo: this.info.imgTwo,
                imgThree: this.info.imgThree,
                imgFour: this.info.imgFour,
                title: this.info.title,
                showFlag: false,
                imgUrl: this.info.img,
              };
              this.$api.signature.addSignForm(params).then(res => {
                this.submitButtonLoading = false;
                if (res.data && res.data.resultCode === 0) {
                  this.$message.success('新增签表成功');
                  this.initData();
                  this.isShowInfoDialog = false;
                }
              });
            } else {
              //编辑资讯
              let params = {
                id: this.info.id,
                imgOne: this.info.imgOne,
                imgTwo: this.info.imgTwo,
                imgThree: this.info.imgThree,
                imgFour: this.info.imgFour,
                title: this.info.title,
                showFlag: false,
                imgUrl: this.info.img,
              };
              this.$api.signature.addSignForm(params).then(res => {
                this.submitButtonLoading = false;
                if (res.data && res.data.resultCode === 0) {
                  this.$message.success('修改资讯成功');
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
        this.$confirm(`确定${type === 'start' ? '启用' : '禁用'}当前签表 ?`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.signature.updateShow(row.id).then(res => {
            if (res.data && res.data.resultCode === 0) {
              this.$message.success(`当前签表${type === 'start' ? '启用' : '禁用'}成功`);
              this.initData();
            }
          });
        }).catch(() => {
        });
      },
      //点击'删除'按钮
      clickRemoveBtn(row) {
        this.$confirm(`确定删除当前签表 ?`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.signature.delSignForm(row.id).then(res => {
            if (res.data && res.data.resultCode === 0) {
              this.$message.success(`签表删除成功`);
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
