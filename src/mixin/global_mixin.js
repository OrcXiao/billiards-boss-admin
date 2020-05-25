import store from '../store';

const globalMixins = {
    data() {
        return {
            //表格分页页码
            Mixin_currentPage: 1,
            //表格每页大小
            Mixin_pageSize: 10,
            //表格总共数据
            Mixin_total: 0,
            //全局的上传地址
            Mixin_uploadUrl: this.$api.uploadUrl,

        }
    },
    beforeCreate() {
        setTimeout(() => {
            store.commit('SET_LOADING_STATE', false);
        }, 500)
    },
    computed: {
        Mixin_loading: function () {
            return this.$store.state.vx_pageLoading
        }
    },

    methods: {
        //表格分页
        Mixin_handleCurrentChange(val) {
            this.Mixin_currentPage = val;
            this.initData()
        },
        //弹框关闭,重置表单
        Mixin_dialogClose(formName, Dialog) {
            this[Dialog] = false;
            setTimeout(() => {
                this.$refs[formName] && this.$refs[formName].resetFields();
            }, 100);
        },
        //上传之前的回调
        Mixin_beforeImgUpload (file){
            const isSize5G = file.size / 1024 / 1024 /1024 < 5;
            if (!isSize5G) {
                this.$message.error('上传的文件大小不能超过 5G!');
            }
            return isSize5G;
        },

    },
};

export default globalMixins;


