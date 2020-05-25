<template>
  <div class="upload-wrap">
    <div v-loading="loading" class="upload-item">
      <input @change="changeUpload" :id="`uploadForm` + uploadName" type="file" style="display: none">
      <div v-if="!imgSrc" @click="clickPlusIcon" class="plus-wrap cu-pt">
        <i class="el-icon-plus fs30 "></i>
      </div>
      <div v-else class="img-wrap">
        <div class="del-wrap">
          <i @click="clickRemoveIcon" class="el-icon-delete fs18 clff0000 cu-pt"></i>
        </div>
        <img :src="imgSrc" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "upload",
    data() {
      return {
        //加载状态
        loading: false,
        //图片的src
        imgSrc: '',
      }
    },
    props: {
      uploadName: {
        type: String,
        default: ''
      },
      initObj: {
        type: String,
        default: ''
      }
    },
    computed: {},
    created() {
    },
    mounted() {
    },
    watch: {
      'initObj': {
        handler: function (val, oldval) {
          this.imgSrc = val;
          setTimeout(() => {
            document.getElementById(`uploadForm` + this.uploadName).value = null;
          }, 100);

        },
        deep: true,
        immediate: true,
      }
    },
    methods: {
      //点击加号
      clickPlusIcon() {
        document.getElementById('uploadForm' + this.uploadName).click();
      },
      //上传文件改变时..
      changeUpload(event) {
        let file = event.target.files[0];
        let fileSize = file.size / 1024 / 1024 / 1024 > 5;
        if (fileSize) {
          this.$message.warning('上传的文件不能超过5G');
          return
        }
        this.loading = true;
        let formData = new window.FormData();
        formData.append('file ', file);
        let options = {
          url: '/oss/upload',
          data: formData,
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.$axios(options).then((res) => {
          this.loading = false;
          if (res.data && res.data.resultCode === 0) {
            this.imgSrc = res.data.data;
            this.$emit('uploadSuccess', {
              imgSrc: res.data.data,
              uploadName: this.uploadName
            });
          } else {
            this.$message.error('文件上传失败 !');
          }
        }).catch(() => {
          this.loading = false;
          this.$message.error('系统错误, 无法上传 !');
        })
      },
      //点击删除图标
      clickRemoveIcon() {
        this.imgSrc = '';
        this.$emit('uploadSuccess', {imgSrc: '', uploadName: this.uploadName});
        document.getElementById('uploadForm' + this.uploadName).value = null;
      },
    },
    mixins: [],
    filters: {},
    components: {},
  }
</script>

<style lang="scss" scoped>
  .upload-wrap {

    .upload-item {
      width: 160px;
      height: 160px;
    }

    .plus-wrap {
      width: 160px;
      height: 160px;
      line-height: 160px;
      border-radius: 6px;
      text-align: center;
      border: 1px dashed #c2c2c2;
    }

    .img-wrap {
      position: relative;
      width: 160px;
      height: 160px;
      border: 1px dashed #c2c2c2;

      .del-wrap {
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: right;
        padding-right: 10px;
        background: #e7e7e7;
        opacity: 0.7;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
