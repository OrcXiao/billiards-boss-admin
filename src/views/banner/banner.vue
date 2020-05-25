<template>
  <div class="information-wrap">
    <div>
      <el-form :inline="true">
        <el-form-item label="地区:">
          <el-cascader v-model.trim="condition.area" :options="options"></el-cascader>
        </el-form-item>
        <el-form-item class="mg-l20" label="创建日期:">
          <el-date-picker
                  v-model.trim="condition.createTime"
                  align="right"
                  type="date"
                  placeholder="请选择日期">
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
                prop="date"
                label="bannerID"
                width="180">
        </el-table-column>
        <el-table-column
                prop="name"
                label="区域"
                width="180">
        </el-table-column>
        <el-table-column
                prop="address"
                label="链接地址">
        </el-table-column>
        <el-table-column
                prop="address"
                label="创建时间">
        </el-table-column>
        <el-table-column
                prop="address"
                label="操作">
          <template slot-scope="scope">
            <el-button @click="clickEditBtn(scope.row)" type="primary">编辑</el-button>
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
            :title="currentHandle === 'add' ? '新增banner': '编辑banner'"
            :visible.sync="isShowInfoDialog"
            @close="Mixin_dialogClose('info', 'isShowInfoDialog')"
            width="700px">
      <el-form ref="info" :model="info" :rules="infoRules" label-width="120px">
        <el-form-item label="区域 :" prop="title">
          <el-select v-model="value" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片上传 :" prop="title">
          <div>(每个区域最多3张, 一张的时候不轮播)</div>
          <div>
            <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
              </div>
            </el-upload>
            <div class="pd-t30 pd-b30">
              <el-input class="" placeholder="点击banner跳转的链接地址" v-model.trim="info.title"></el-input>
            </div>
          </div>
          <div>
            <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
              </div>
            </el-upload>
            <div class="pd-t30 pd-b30">
              <el-input class="" placeholder="点击banner跳转的链接地址" v-model.trim="info.title"></el-input>
            </div>
          </div>
          <div>
            <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
              </div>
            </el-upload>
            <div class="pd-t30 pd-b30">
              <el-input class="" placeholder="点击banner跳转的链接地址" v-model.trim="info.title"></el-input>
            </div>
          </div>
        </el-form-item>


      </el-form>
      <div class="mt10 dis-fl ju-ct">
        <el-button type="primary" @click="submitInfoBtn('info')">确定</el-button>
        <el-button @click="isShowInfoDialog = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
    export default {
        name: "banner",
        data() {
            return {
                //搜索条件
                condition: {
                    title: '',
                    createTime: ''
                },
                //表格数据
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    state: 1
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    state: 0
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    state: 1
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    state: 0
                }],
                //显示弹框
                isShowInfoDialog: false,
                //资讯obj
                info: {
                    //标题
                    title: '',
                    //详情
                    details: '',
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
                    img: ''
                },
                //当前操作状态(edit->编辑, add->新增)
                currentHandle: '',
                options: [
                    {
                        label: '资讯',
                        value: 1
                    },
                    {
                        label: '教程',
                        value: 2
                    },
                    {
                        label: '赛讯',
                        value: 3
                    },
                ],
                value: '',
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
                    createTime: this.condition.createTime,
                    pageNum: this.Mixin_pageNum,
                    pageSize: this.Mixin_pageSize,
                };

            },
            //点击新增按钮
            clickAddBtn() {
                this.currentHandle = 'add';
                this.isShowInfoDialog = true;
            },
            //点击编辑按钮
            clickEditBtn() {
                this.currentHandle = 'edit';
                this.isShowInfoDialog = true;
            },

            //删除图片
            handleRemove() {

            },

            //提交资讯
            submitInfoBtn(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        if (this.currentHandle === 'add') {

                        } else {

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
                    if (type === 'start') {

                    } else {

                    }

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
