<template>
  <div class="roomInfo-wrap">
    <el-row>
      <el-col :span="24">
        <el-button @click="clickAddBtn" type="primary">修改</el-button>
      </el-col>
    </el-row>
    <el-row class="mg-t20">
      <el-col :span="24">
        <el-form ref="form" label-width="100px">
          <el-form-item label="球房名称 :">
            <div>AAA</div>
          </el-form-item>
          <el-form-item label="球房设备 :">
            <div>AAA</div>
          </el-form-item>
          <el-form-item label="收费规则 :">
            <div>AAA</div>
          </el-form-item>
          <el-form-item label="所在地区 :">
            <div>AAA</div>
          </el-form-item>
          <el-form-item label="具体地址 :">
            <div>AAA</div>
          </el-form-item>
          <el-form-item label="球房经度 :">
            <div>AAA</div>
          </el-form-item>
          <el-form-item label="球房纬度 :">
            <div>AAA</div>
          </el-form-item>
          <el-form-item label="球房图片 :">
            <div class="img-wrap">
              <div class="img-item" v-for="(item,index) in 6" :key="index">
                <img src="../../assets/img/404.jpg" class="wd100 hg100" height="392" width="942"/>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>


    <el-dialog
      title="修改球房信息"
      :visible.sync="isShowRoomDialog"
      @close="Mixin_dialogClose('room', 'isShowRoomDialog')"
      width="1000px">
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
          <div class="dis-fl fl-wp upload-area">
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
    name: "roomInfo",
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
        //是否显示弹框
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
        submitButtonLoading: false,
        //编辑器
        isClear: false,
      }
    },
    props: {},
    watch: {},
    computed: {
      options: function () {
        return this.$store.state.vx_allCity
      }
    },
    created() {
    },
    mounted() {
      //this.$ nextTick(() => {

      //})
    },
    methods: {
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


    },
    mixins: [],
    filters: {},
    components: {},
  }
</script>

<style lang="scss" scoped>
  .roomInfo-wrap {
    .img-wrap {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .img-item{
        width: 500px;
        height: 400px;
        margin-bottom: 10px;
      }
    }
    .upload-area{
      width: 520px;
    }
  }
</style>
