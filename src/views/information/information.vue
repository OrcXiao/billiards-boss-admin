<template>
  <div class="information-wrap">
    <div>
      <!--      <el-input @input.native="limitInput($event, info.readNumber, 3, 2)" v-model.trim="info.readNumber"></el-input>-->
    </div>
    <br>
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
                label="资讯ID">
        </el-table-column>
        <el-table-column
                prop="title"
                label="资讯标题">
        </el-table-column>
        <el-table-column
                width="120"
                prop="type"
                label="资讯类型">
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
                prop="showFlag"
                width="100"
                label="资讯状态">
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
            <el-button type="danger" @click="clickRemoveBtn(scope.row)">删除</el-button>
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
            :title="currentHandle === 'add' ? '新增资讯': '编辑资讯'"
            :visible.sync="isShowInfoDialog"
            @close="Mixin_dialogClose('info', 'isShowInfoDialog')"
            width="700px">
      <el-form ref="info" :model="info" :rules="infoRules" label-width="120px">
        <el-form-item label="资讯标题 :" prop="title">
          <el-input maxlength="20" placeholder="请输入资讯标题" v-model.trim="info.title"></el-input>
        </el-form-item>
        <el-form-item label="资讯详情 :" prop="details">
          <el-input maxlength="100" type="textarea" placeholder="请输入资讯详情" v-model.trim="info.details"></el-input>
        </el-form-item>
        <el-form-item label="点赞数 :" prop="praisePoints">
          <el-input maxlength="100" placeholder="请输入资讯详情" v-model.trim="info.praisePoints"></el-input>
        </el-form-item>
        <el-form-item label="阅读数 :" prop="readNumber">
          <el-input maxlength="100" placeholder="请输入资讯详情" v-model.trim="info.readNumber"></el-input>
        </el-form-item>
        <el-form-item label="资讯类型 :" prop="type">
          <el-select class="wd100" v-model="info.type" placeholder="请选择资讯类型">
            <el-option :label="1" :value="1"></el-option>
            <el-option :label="2" :value="2"></el-option>
            <el-option :label="3" :value="3"></el-option>
            <el-option :label="4" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资讯标题图片 :" prop="img">
          <CmUpload
                  upload-name="img"
                  :initObj="info.img"
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
    name: "information",
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
        //资讯obj
        info: {
          //资讯id
          id: '',
          //标题
          title: '',
          //详情
          details: '',
          //点赞数
          praisePoints: '',
          //阅读数
          readNumber: '',
          //类型
          type: '',
          //资讯图片
          img: ''
        },
        //规则校验
        infoRules: {
          title: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '资讯标题'}),
              trigger: 'blur'
            },
          ],
          details: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '资讯详情'}),
              trigger: 'blur'
            },
          ],
          praisePoints: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '点赞数'}),
              trigger: 'blur'
            },
          ],
          type: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '资讯类型'}),
              trigger: 'change'
            },
          ],
          readNumber: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '阅读数'}),
              trigger: 'blur'
            },
          ],
          img: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '资讯标题图片'}),
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
        this.$api.information.getInfoList(params).then(res => {
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
        this.info.praisePoints = '';
        this.info.readNumber = '';
        this.info.type = '';
        this.info.img = '';
        this.isShowInfoDialog = true;
      },
      //点击编辑按钮
      clickEditBtn(row) {
        this.currentHandle = 'edit';
        this.info.id = row.id;
        row.buttonLoading = true;
        this.$api.information.getInformationById(row.id).then(res => {
          row.buttonLoading = false;
          if (res.data && res.data.resultCode === 0) {
            let data = res.data.data;
            this.isShowInfoDialog = true;
            this.info.title = data.title;
            this.info.details = data.context;
            this.info.praisePoints = data.praisePoints;
            this.info.readNumber = data.readNumber;
            this.info.type = data.type;
            this.info.img = data.imgUrl;
          }
        });
      },
      //上传成功
      uploadSuccess(data) {
        this.info.img = data.imgSrc;
      },
      //提交资讯
      submitInfoBtn(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            this.submitButtonLoading = true;
            if (this.currentHandle === 'add') {
              //新增资讯
              let params = {
                context: this.info.details,
                title: this.info.title,
                praisePoints: this.info.praisePoints,
                readNumber: this.info.readNumber,
                type: this.info.type,
                showFlag: false,
                imgUrl: this.info.img,
              };
              this.$api.information.addInformation(params).then(res => {
                this.submitButtonLoading = false;
                if (res.data && res.data.resultCode === 0) {
                  this.$message.success('新增资讯成功');
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
                praisePoints: this.info.praisePoints,
                readNumber: this.info.readNumber,
                type: this.info.type,
                showFlag: false,
                imgUrl: this.info.img,
              };
              this.$api.information.addInformation(params).then(res => {
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
        this.$confirm(`确定${type === 'start' ? '启用' : '禁用'}当前资讯 ?`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.information.updateShow(row.id).then(res => {
            if (res.data && res.data.resultCode === 0) {
              this.$message.success(`资讯${type === 'start' ? '启用' : '禁用'}成功`);
              this.initData();
            }
          });
        }).catch(() => {
        });
      },
      //点击'删除'按钮
      clickRemoveBtn(row) {
        this.$confirm(`确定删除当前资讯 ?`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.information.delInformation(row.id).then(res => {
            if (res.data && res.data.resultCode === 0) {
              this.$message.success(`资讯删除成功`);
              this.Mixin_handleCurrentChange(1);
            }
          });
        }).catch(() => {
        });
      },
      //限制输入
      limitInput(event, obj, before, after) {
        let value = event.target.value;
        value = value.replace(/[^ \d.]|\s|^\./g, "");
        value = value.replace(/\.{2,}/g, ".");
        value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        console.log(value.split("."));
        if (after) {
          value = value.split(".")[0].slice(0, before) + "." + value.split(".")[1] ? value.split(".")[1].slice(0, after) : '';
        } else {
          value = value.slice(0, before);
        }
        event.target.value = value;

        obj = event.target.value;
        console.log(obj);
      },
    },
    props: {},
    watch: {},
    mixins: [],
    filters: {},
    components: {},
    directives: {},
  }
</script>

<style lang="scss" scoped>

</style>
