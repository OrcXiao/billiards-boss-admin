<template>
  <div class="signature-wrap">
    <div>
      <el-form :inline="true">
        <!--        <el-form-item label="地区:">-->
        <!--          <el-cascader v-model.trim="condition.area" :options="options" :props="props"></el-cascader>-->
        <!--        </el-form-item>-->
        <el-form-item class="mg-l10" label="球房名称:">
          <el-input v-model.trim="condition.name" clearable placeholder="请输入球房名称"></el-input>
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
          <el-button @click="clickAddBtn" type="primary">新增</el-button>

        </el-form-item>
      </el-form>
    </div>
    <div>总计: {{Mixin_total}}家</div>
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
                label="球房ID">
        </el-table-column>
        <el-table-column
                prop="name"
                label="球房名称">
        </el-table-column>
        <el-table-column label="所在地区">
          <template slot-scope="scope">
            {{scope.row.province}}{{scope.row.city}}{{scope.row.area}}
          </template>
        </el-table-column>
        <el-table-column
                prop="address"
                label="详细地址">
        </el-table-column>
        <el-table-column
                prop="chargingRules"
                label="收费规则">
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
                label="活动">
        </el-table-column>
        <el-table-column
                prop="address"
                width="200"
                label="操作">
          <template slot-scope="scope">
            <el-button :loading="scope.row.buttonLoading" @click="clickEditBtn(scope.row)" type="primary">编辑</el-button>
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
            :title="currentHandle === 'add' ? '新增球房': '编辑球房'"
            :visible.sync="isShowRoomDialog"
            @close="Mixin_dialogClose('room', 'isShowRoomDialog')"
            width="700px">
      <el-form ref="room" :model="room" :rules="roomRules" label-width="120px">
        <el-form-item label="球房名称 :" prop="name">
          <el-input maxlength="20" placeholder="请输入球房名称" v-model.trim="room.name"></el-input>
        </el-form-item>
        <el-form-item label="球房经度 :" prop="longitude">
          <el-input placeholder="请输入球房经度" v-model.trim="room.longitude"></el-input>
        </el-form-item>
        <el-form-item label="球房纬度 :" prop="latitude">
          <el-input placeholder="请输入球房纬度" v-model.trim="room.latitude"></el-input>
        </el-form-item>
        <el-form-item label="收费规则 :" prop="charge">
          <el-input placeholder="请输入收费规则" type="textarea" v-model.trim="room.charge"></el-input>
        </el-form-item>
        <el-form-item label="球房活动 :" prop="activity">
          <el-input placeholder="请输入球房活动" type="textarea" v-model.trim="room.activity"></el-input>
        </el-form-item>
        <el-form-item label="球房设备 :" prop="equipment">
          <el-input placeholder="请输入球房设备" type="textarea" v-model.trim="room.equipment"></el-input>
        </el-form-item>
        <el-form-item label="所在地区 :" prop="area">
          <el-cascader class="wd100" placeholder="请选择所在地区" v-model.trim="room.area" :options="options"
                       :props="props"></el-cascader>
        </el-form-item>
        <el-form-item label="具体地址 :" prop="address">
          <el-input placeholder="请输入具体地址" v-model.trim="room.address"></el-input>
        </el-form-item>
        <el-form-item label="球房图片 :" prop="img">
          <div class="fs14 clff0000">第一张图为球房头像图</div>
          <div class="dis-fl fl-wp">
            <CmUpload
                    class="mg-r10 mg-b10"
                    upload-name="imgOne"
                    :initObj="room.imgOne"
                    @uploadSuccess="uploadSuccess">
            </CmUpload>
            <CmUpload
                    class="mg-r10 mg-b10"
                    upload-name="imgTwo"
                    :initObj="room.imgTwo"
                    @uploadSuccess="uploadSuccess">
            </CmUpload>
            <CmUpload
                    class="mg-r10 mg-b10"
                    upload-name="imgThree"
                    :initObj="room.imgThree"
                    @uploadSuccess="uploadSuccess">
            </CmUpload>
            <CmUpload
                    class="mg-r10 mg-b10"
                    upload-name="imgFour"
                    :initObj="room.imgFour"
                    @uploadSuccess="uploadSuccess">
            </CmUpload>
            <CmUpload
                    class="mg-r10 mg-b10"
                    upload-name="imgFive"
                    :initObj="room.imgFive"
                    @uploadSuccess="uploadSuccess">
            </CmUpload>
            <CmUpload
                    class="mg-r10 mg-b10"
                    upload-name="imgSix"
                    :initObj="room.imgSix"
                    @uploadSuccess="uploadSuccess">
            </CmUpload>
          </div>
        </el-form-item>

      </el-form>
      <div class="mt10 dis-fl ju-ct">
        <el-button :loading="submitButtonLoading" type="primary" @click="submitRoomBtn('room')">确定</el-button>
        <el-button @click="isShowRoomDialog = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "room",
    data() {
      let validateImg = (rule, value, callback) => {

        if (value === '') {
          callback(new Error('11'));
        } else {
          callback();
        }
      };
      return {
        props: {
          value: 'text',
          label: 'text',
          children: 'children'
        },
        //搜索条件
        condition: {
          area: '',
          name: '',
          createTime: '',
          integral: '',
        },
        //表格数据
        tableData: [],
        //显示弹框
        isShowRoomDialog: false,
        //教程obj
        room: {
          name: '',
          longitude: '',
          latitude: '',
          charge: '',
          activity: '',
          equipment: '',
          area: '',
          address: '',
          imgOne: '',
          imgTwo: '',
          imgThree: '',
          imgFour: '',
          imgFive: '',
          imgSix: '',
        },
        roomRules: {
          name: {
            required: true,
            validator: this.$verifys.nullStr({item: '球房名称'}),
            trigger: 'blur'
          },
          longitude: {
            required: true,
            validator: this.$verifys.nullStr({item: '球房经度'}),
            trigger: 'blur'
          },
          latitude: {
            required: true,
            validator: this.$verifys.nullStr({item: '球房纬度'}),
            trigger: 'blur'
          },
          charge: {
            required: true,
            validator: this.$verifys.nullStr({item: '收费规则'}),
            trigger: 'blur'
          },
          activity: {
            required: true,
            validator: this.$verifys.nullStr({item: '球房活动'}),
            trigger: 'blur'
          },
          equipment: {
            required: true,
            validator: this.$verifys.nullStr({item: '球房设备'}),
            trigger: 'blur'
          },
          area: {
            required: true,
            validator: this.$verifys.nullStr({item: '所在地区'}),
            trigger: 'blur'
          },
          address: {
            required: true,
            validator: this.$verifys.nullStr({item: '具体地址'}),
            trigger: 'blur'
          },
          img: {
            required: true,
            validator: validateImg,
            trigger: 'blur'
          },
        },
        //当前操作类型
        currentHandle: '',
        submitButtonLoading: false,
      }
    },
    computed: {
      options: function () {
        return this.$store.state.vx_allCity
      }
    },
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
          name: this.condition.name,
          currentPage: this.Mixin_currentPage,
          pageSize: this.Mixin_pageSize,
        };
        if (this.condition.timeRang) {
          params.startDate = this.condition.timeRang[0];
          params.stopDate = this.condition.timeRang[1] + (1000 * 60 * 60 * 24 - 1);
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
      //点击新增按钮
      clickAddBtn() {
        this.currentHandle = 'add';
        this.isShowRoomDialog = true;
        this.room = {
          name: '',
          longitude: '',
          latitude: '',
          charge: '',
          activity: '',
          equipment: '',
          area: '',
          address: '',
          imgOne: '',
          imgTwo: '',
          imgThree: '',
          imgFour: '',
          imgFive: '',
          imgSix: '',
        };
      },
      //点击编辑按钮
      clickEditBtn(row) {
        this.currentHandle = 'edit';
        row.buttonLoading = true;
        this.$api.room.getRoomById(row.id).then(res => {
          row.buttonLoading = false;
          if (res.data && res.data.resultCode === 0) {
            let data = res.data.data;
            this.room.id = data.id;
            this.room.name = data.name;
            this.room.longitude = data.longitude;
            this.room.latitude = data.latitude;
            this.room.charge = data.chargingRules;
            this.room.activity = data.activity;
            this.room.equipment = data.facilities;
            this.room.address = data.address;
            this.room.imgOne = data.imgOne;
            this.room.imgTwo = data.imgTwo;
            this.room.imgThree = data.imgThree;
            this.room.imgFour = data.imgFour;
            this.room.imgFive = data.imgFive;
            this.room.imgSix = data.imgSix;
            this.room.area = [data.province, data.city, data.area];
            this.isShowRoomDialog = true;
          }
        });

      },
      //上传图片
      uploadSuccess(data) {
        this.room[data.uploadName] = data.imgSrc;
      },
      //提交球房
      submitRoomBtn(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            this.submitButtonLoading = true;
            if (this.currentHandle === 'add') {
              //新增球房
              let params = {
                activity: this.room.activity,
                chargingRules: this.room.charge,
                facilities: this.room.equipment,
                latitude: parseFloat(this.room.latitude),
                longitude: parseFloat(this.room.longitude),
                name: this.room.name,
                province: this.room.area[0],
                city: this.room.area[1],
                area: this.room.area[2],
                address: this.room.address,
                imgOne: this.room.imgOne,
                imgTwo: this.room.imgTwo,
                imgThree: this.room.imgThree,
                imgFour: this.room.imgFour,
                imgFive: this.room.imgFive,
                imgSix: this.room.imgSix,
              };
              delete this.room.id;
              this.$api.room.addRoom(params).then(res => {
                this.submitButtonLoading = false;
                if (res.data && res.data.resultCode === 0) {
                  this.$message.success('新增球房成功');
                  this.initData();
                  this.isShowRoomDialog = false;
                }
              });
            } else {
              //编辑球房
              let params = {
                id: this.room.id,
                activity: this.room.activity,
                chargingRules: this.room.charge,
                facilities: this.room.equipment,
                latitude: parseFloat(this.room.latitude),
                longitude: parseFloat(this.room.longitude),
                name: this.room.name,
                province: this.room.area[0],
                city: this.room.area[1],
                area: this.room.area[2],
                address: this.room.address,
                imgOne: this.room.imgOne,
                imgTwo: this.room.imgTwo,
                imgThree: this.room.imgThree,
                imgFour: this.room.imgFour,
                imgFive: this.room.imgFive,
                imgSix: this.room.imgSix,
              };
              this.$api.room.addRoom(params).then(res => {
                this.submitButtonLoading = false;
                if (res.data && res.data.resultCode === 0) {
                  this.$message.success('修改球房成功');
                  this.initData();
                  this.isShowRoomDialog = false;
                }
              });
            }
          }
        })
      },

      //点击删除
      clickRemoveBtn(row, type) {
        this.$confirm(`确定删除当前球房 ?`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.room.delRoom(row.id).then(res => {
            if (res.data && res.data.resultCode === 0) {
              this.$message.success(`球房删除成功`);
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
