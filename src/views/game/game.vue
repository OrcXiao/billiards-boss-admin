<template>
  <div class="information-wrap">
    <div>
      <el-form :inline="true">
        <el-form-item label="标题:">
          <el-input v-model.trim="condition.title" clearable placeholder="请输入标题"></el-input>
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
          label="赛事ID"
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="赛事标题"
        >
        </el-table-column>
        <el-table-column
          prop="peopleNumber"
          label="赛事人数"
        >
        </el-table-column>
        <el-table-column
          prop="money"
          label="总奖金"
        >
        </el-table-column>
        <!--        <el-table-column-->
        <!--                width="260"-->
        <!--                label="缩略图">-->
        <!--          <template slot-scope="scope">-->
        <!--            <div class="thumbnail-wrap">-->
        <!--              <img class="hg100 wd100" :src="scope.row.imgUrl" alt="">-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <el-table-column
          width="180"
          label="创建时间">
          <template slot-scope="scope">
            {{scope.row.createDate | Filter_FormatDate}}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="比赛状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state === '0'">待开始</span>
            <span v-if="scope.row.state === '1'">进行中</span>
            <span v-if="scope.row.state === '2'">已结束</span>
          </template>
        </el-table-column>
        <el-table-column
          width="650"
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button :loading="scope.row.buttonLoading" @click="clickEditBtn(scope.row)" type="primary">编辑</el-button>
            <el-button @click="clickPerformanceBtn(scope.row)">设置比赛成绩</el-button>
            <!--            <el-button @click="clickChangeState(scope.row)">变更状态</el-button>-->
            <!--            <el-button @click="clickRuleBtn(scope.row)">设置抽签规则</el-button>-->
            <!--            <el-button @click="clickAutoBtn(scope.row)">设置自动抽签</el-button>-->
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
      :close-on-click-modal="false"
      :title="currentHandle === 'add' ? '新增赛事': '编辑赛事'"
      :visible.sync="isShowGameDialog"
      @close="Mixin_dialogClose('info', 'isShowGameDialog')"
      width="1000px">
      <el-form ref="info" :model="info" :rules="infoRules" label-width="120px">
        <el-form-item label="赛事标题 :" prop="title">
          <el-input maxlength="20" placeholder="请输入赛事标题" v-model.trim="info.title"></el-input>
        </el-form-item>
        <el-form-item label="赛事城市 :" prop="city">
          <el-cascader class="wd100" placeholder="请选择赛事城市" v-model.trim="info.city" :options="options"
                       :props="props"></el-cascader>
        </el-form-item>
        <el-form-item label="比赛详细地址 :" prop="address">
          <el-input maxlength="20" placeholder="请输入比赛详细地址" v-model.trim="info.address"></el-input>
        </el-form-item>
        <el-form-item label="点赞数 :" prop="fabulousNumber">
          <el-input placeholder="请输入点赞数" v-model.trim="info.fabulousNumber"></el-input>
        </el-form-item>
        <el-form-item label="报名金额 :" prop="enrollMoney">
          <el-input placeholder="请输入报名金额" v-model.trim="info.enrollMoney"></el-input>
        </el-form-item>
        <el-form-item label="总奖金 :" prop="money">
          <el-input placeholder="请输入总奖金" v-model.trim="info.money"></el-input>
        </el-form-item>
        <el-form-item label="比赛球房id :" prop="playRoom">
          <el-input placeholder="请输入比赛球房id" v-model.trim="info.playRoom"></el-input>
        </el-form-item>
        <el-form-item label="抽签时间 :" prop="drawTime">
          <el-date-picker
            value-format="timestamp"
            class="wd100"
            v-model="info.drawTime"
            type="datetime"
            placeholder="选择抽签时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="比赛时间 :" prop="playTime">
          <el-date-picker
            value-format="timestamp"
            class="wd100"
            v-model="info.playTime"
            type="datetime"
            placeholder="选择比赛时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="比赛开始时间 :" prop="playTimeStart">
          <el-date-picker
            value-format="timestamp"
            class="wd100"
            v-model="info.playTimeStart"
            type="datetime"
            placeholder="选择比赛开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="比赛结束时间 :" prop="playTimeStop">
          <el-date-picker
            value-format="timestamp"
            class="wd100"
            v-model="info.playTimeStop"
            type="datetime"
            placeholder="选择比赛结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="参赛人数 :" prop="peopleNumber">
          <el-input placeholder="请输入参赛人数" v-model.trim="info.peopleNumber"></el-input>
        </el-form-item>
        <el-form-item label="比赛进行天数 :" prop="playDays">
          <el-input placeholder="请输入比赛进行天数" v-model.trim="info.playDays"></el-input>
        </el-form-item>
        <el-form-item label="是否展示 :" prop="showFlag">
          <el-radio-group v-model="info.showFlag">
            <el-radio label="true" border>展示</el-radio>
            <el-radio label="false" border>不展示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="赛事标题图片  :" prop="imgUrl">
          <CmUpload
            upload-name="img"
            :initObj="info.imgUrl"
            @uploadSuccess="uploadSuccess">
          </CmUpload>
        </el-form-item>
        <el-form-item label="赛事详情 :" prop="context">
          <!--          <el-input type="textarea" placeholder="请输入赛事详情" v-model.trim="info.context"></el-input>-->
          <editor-bar v-model="info.context" :isClear="isClear"></editor-bar>
        </el-form-item>
      </el-form>
      <div class="mt10 dis-fl ju-ct">
        <el-button :loading="submitButtonLoading" type="primary" @click="submitInfoBtn('info')">确定</el-button>
        <el-button @click="isShowGameDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <!--   变更比赛状态弹框-->
    <el-dialog
      :close-on-click-modal="false"
      title="变更比赛状态"
      :visible.sync="isShowStateDialog"
      @close="Mixin_dialogClose('state', 'isShowStateDialog')"
      width="400px">
      <el-form ref="state" :model="state" :rules="stateRules" label-width="120px">
        <el-form-item label="赛事状态 :" prop="value">
          <el-select class="wd100" v-model="state.value" placeholder="请选择赛事状态">
            <el-option label="待开始" value="0"></el-option>
            <el-option label="进行中" value="1"></el-option>
            <el-option label="已结束" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="mt10 dis-fl ju-ct">
        <el-button type="primary" @click="submitStateBtn('state')">确定</el-button>
        <el-button @click="isShowStateDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <!--   设置抽签规则弹框-->
    <el-dialog
      :close-on-click-modal="false"
      title="设置抽签规则"
      :visible.sync="isShowRuleDialog"
      @close="Mixin_dialogClose('draw', 'isShowRuleDialog')"
      width="700px">
      <el-form ref="draw" :model="draw" :rules="drawRules" label-width="140px">
        <el-form-item label="不参与抽签人 :" prop="value">
          <el-checkbox-group v-model="draw.value">
            <el-checkbox
              v-for="(item, index) in ruleList"
              :key="item.id"
              :label="item.id"
              name="type">
              {{item.nickName}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div class="mt10 dis-fl ju-ct">
        <el-button type="primary" @click="submitRuleBtn('draw')">确定</el-button>
        <el-button @click="isShowRuleDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <!--   设置赛事成绩弹框-->
    <el-dialog
      :close-on-click-modal="false"
      title="赛事成绩"
      :visible.sync="isShowPerformanceDialog"
      @close="Mixin_dialogClose('performance', 'isShowPerformanceDialog')"
      width="1200px">
      <div class="dis-fl ju-sb">
        <div class="wd100" v-for="(item, index) in viewArr" :key="index">
          <span v-if="index+1 !== viewArr.length">第{{index + 1}}轮 :</span>
          <span v-else>冠军</span>
        </div>
      </div>
      <br>
      <div class="show-wrap dis-fl" :style="{'height': maxHeight + 'px'}">
        <div class="column wd100" v-for="(item, index) in viewArr" :key="index">
          <div
            v-for="(itemIn, indexIn) in item"
            :key="indexIn"
            :style="{'height': heightValue(item) + 'px'}"
            class="column-item">
            <span v-if="itemIn.userName"> {{itemIn.userName}}</span>
            <i v-if="itemIn.userName" class="el-icon-circle-check cu-pt"></i>
            <span v-else>/</span>
          </div>
        </div>
      </div>
      <div class="mg-t20 dis-fl ju-ct">
        <el-button type="primary" @click="submitPerformanceBtn('performance')">确定</el-button>
        <el-button @click="isShowPerformanceDialog = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import EditorBar from '../../components/editor'
  import Vue from "vue";

  let mockData = [
    {
      userName: "A1",
      drawResult: 1,
      maxPostIndex: 1
    }, {
      userName: "A2",
      drawResult: 2,
      maxPostIndex: 1
    }, {
      userName: "B1",
      drawResult: 3,
      maxPostIndex: 2
    }, {
      userName: "B2",
      drawResult: 4,
      maxPostIndex: 1
    }, {
      userName: "C1",
      drawResult: 5,
      maxPostIndex: 1
    }, {
      userName: "C2",
      drawResult: 6,
      maxPostIndex: 3
    }, {
      userName: "D1",
      drawResult: 7,
      maxPostIndex: 1
    }, {
      userName: "D2",
      drawResult: 8,
      maxPostIndex: 2
    }, {
      userName: "E2",
      drawResult: 10,
      maxPostIndex: 2
    }
  ]


  export default {
    name: "information",
    data() {
      let validateFinal8 = (rule, value, callback) => {
        if (!value || !value.length) {
          callback(new Error('请选择8强'));
        } else if (value.length !== 8) {
          callback(new Error('请选择8位人员'));
        } else {
          callback();
        }
      };
      let validateFinal16 = (rule, value, callback) => {
        if (!value || !value.length) {
          callback(new Error('请选择16强'));
        } else if (value.length !== 16) {
          callback(new Error('请选择16位人员'));
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
          title: '',
          createTime: ''
        },
        //表格数据
        tableData: [],
        //显示弹框
        isShowGameDialog: false,
        //赛事obj
        info: {
          //标题
          title: '',
          //城市
          city: [],
          //详细地址
          address: '',
          //点赞数
          fabulousNumber: '',
          //报名金额
          enrollMoney: '',
          //总奖金
          money: '',
          //比赛球房id
          playRoom: '',
          //抽签时间
          drawTime: '',
          //比赛时间
          playTime: '',
          //比赛开始时间
          playTimeStart: '',
          //比赛结束时间
          playTimeStop: '',
          //参赛人数
          peopleNumber: '',
          //比赛进行天数
          playDays: '',
          //赛事状态
          state: 0,
          //是否展示
          showFlag: '',
          //详情
          context: '',
          //赛事图片
          imgUrl: '',
        },
        //规则校验
        infoRules: {
          title: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '赛事标题'}),
              trigger: 'blur'
            },
          ],
          city: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '赛事城市'}),
              trigger: 'change'
            },
          ],
          address: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '比赛详细地址'}),
              trigger: 'blur'
            },
          ],
          fabulousNumber: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '点赞数'}),
              trigger: 'blur'
            },
          ],
          enrollMoney: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '报名金额'}),
              trigger: 'blur'
            },
          ],
          money: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '总奖金'}),
              trigger: 'blur'
            },
          ],
          playRoom: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '比赛球房id'}),
              trigger: 'blur'
            },
          ],
          drawTime: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '抽签时间'}),
              trigger: 'blur'
            },
          ],
          playTime: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '比赛时间'}),
              trigger: 'blur'
            },
          ],
          playTimeStart: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '比赛开始时间'}),
              trigger: 'blur'
            },
          ],
          playTimeStop: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '比赛结束时间'}),
              trigger: 'blur'
            },
          ],
          peopleNumber: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '参赛人数'}),
              trigger: 'blur'
            },
          ],
          playDays: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '比赛进行天数'}),
              trigger: 'blur'
            },
          ],
          state: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '赛事状态'}),
              trigger: 'change'
            },
          ],
          showFlag: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '是否展示'}),
              trigger: 'change'
            },
          ],
          context: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '赛事详情'}),
              trigger: 'blur'
            },
          ],
          imgUrl: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '赛事标题图片'}),
              trigger: 'change'
            },
          ],
        },
        //当前操作状态(edit->编辑, add->新增)
        currentHandle: '',
        //改变状态
        isShowStateDialog: false,
        stateId: '',
        state: {
          value: '',
        },
        stateRules: {
          value: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '赛事状态'}),
              trigger: 'blur'
            },
          ],
        },
        //显示规则弹框
        isShowRuleDialog: false,
        ruleList: [],
        draw: {
          value: [],
          id: '',
        },
        drawRules: {
          value: [
            {
              type: 'array',
              required: true,
              validator: this.$verifys.nullStr({item: '不参与抽签人员'}),
              trigger: 'change'
            }
          ],
        },
        //编辑器
        isClear: false,
        detail: "",
        submitButtonLoading: false,
        //是否显示成绩的弹框
        isShowPerformanceDialog: false,

        /*
        * 比赛报名成绩
        * */
        //视图数组
        viewArr: [],
        round: 0,
        maxHeight: 0,

      }
    },
    computed: {
      options: function () {
        return this.$store.state.vx_allCity
      },
      heightValue: function () {
        return function (item) {
          return this.maxHeight / (item.length)
        }
      }
    },
    created() {
      Vue.prototype.WebInstance.On("FetchAllClientEnrollUserResult_GC", res => {
        let allArr = this.fillArr(res.info);
        console.log(allArr)
        let index = 0
        this.createData(allArr, index, this.viewArr);
      });
    },
    mounted() {
      this.$nextTick(() => {
        this.initData();
      })
    },
    methods: {
      //填充数组
      fillArr(arr) {
        let maxDrawResult = Math.max.apply(Math, arr.map(item => {
          return item.drawResult
        }))
        let lenArr = [8, 16, 32, 64, 128, 256];
        let maxLen = lenArr.find(item => maxDrawResult <= item);
        this.maxHeight = maxLen * 40;
        let dataArr = new Array(maxLen).fill({});

        arr.forEach((item) => {
          dataArr[item.drawResult - 1] = item;
        })
        return dataArr
      },
      //生成需要的数据结构
      createData(dataArr, index, viewArr) {
        if (index === 0) {
          this.$set(viewArr, index, dataArr)
          index++;
          this.createData(viewArr[index - 1], index, viewArr)
        } else {
          let data = [];
          let len = dataArr.length;
          for (let i = 0; i < len; i++) {
            if (i % 2 === 0) {
              if (Object.keys(dataArr[i]).length && Object.keys(dataArr[i + 1]).length) {
                if (dataArr[i].maxPostIndex === dataArr[i + 1].maxPostIndex) {
                  data.push({});
                } else {
                  if (dataArr[i].maxPostIndex >= index && (dataArr[i].maxPostIndex > dataArr[i + 1].maxPostIndex)) {
                    data.push(dataArr[i])
                  } else if (dataArr[i + 1].maxPostIndex >= index && (dataArr[i].maxPostIndex < dataArr[i + 1].maxPostIndex)) {
                    data.push(dataArr[i + 1])
                  } else {
                    data.push({});
                  }
                }
              } else {
                data.push({});
              }
            }
          }
          this.$set(viewArr, index, data)
          if (data.length > 1) {
            index++;
            this.createData(data, index, viewArr)
          }
        }
      },
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
        this.$api.game.getContests(params).then(res => {
          if (res.data && res.data.resultCode === 0) {
            res.data.data.records.forEach((item, index) => {
              item.buttonLoading = false;
            });
            this.tableData = res.data.data.records;
            this.Mixin_total = res.data.data.total;
          }
        });
      },
      //点击设置比赛成绩
      clickPerformanceBtn(row) {
        this.viewArr = [];
        this.isShowPerformanceDialog = true;
        let params = {
          contestId: row.id
        };
        this.$api.socket.getGameData(params);

      },
      //点击新增按钮
      clickAddBtn() {
        this.currentHandle = 'add';
        this.isShowGameDialog = true;
        this.info = {
          //标题
          title: '',
          //城市
          city: null,
          //详细地址
          address: '',
          //点赞数
          fabulousNumber: '',
          //报名金额
          enrollMoney: '',
          //总奖金
          money: '',
          //比赛球房id
          playRoom: '',
          //抽签时间
          drawTime: '',
          //比赛时间
          playTime: '',
          //比赛开始时间
          playTimeStart: '',
          //比赛结束时间
          playTimeStop: '',
          //参赛人数
          peopleNumber: '',
          //比赛进行天数
          playDays: '',
          //赛事状态
          state: 0,
          //是否展示
          showFlag: '',
          //详情
          context: '',
          //赛事图片
          imgUrl: '',
        }
      },
      //点击编辑按钮
      clickEditBtn(row) {
        this.currentHandle = 'edit';
        this.info.id = row.id;
        row.buttonLoading = true;
        this.$api.game.getContestById(row.id).then(res => {
          row.buttonLoading = false;
          if (res.data && res.data.resultCode === 0) {
            let data = res.data.data;
            this.info.title = data.title;
            this.info.context = data.context;
            this.info.imgUrl = data.imgUrl;
            this.info.fabulousNumber = data.fabulousNumber;
            this.info.enrollMoney = data.enrollMoney;
            this.info.money = data.money;
            this.info.peopleNumber = data.peopleNumber;
            this.info.playDays = data.playDays;
            this.info.playRoom = data.playRoom;
            this.info.drawTime = data.drawTime;
            this.info.playTime = data.playTime;
            this.info.playTimeStart = data.playTimeStart;
            this.info.playTimeStop = data.playTimeStop;
            this.info.showFlag = data.showFlag + '';
            this.info.state = data.state;
            this.info.address = data.address;
            this.info.city = [data.province, data.city, data.area];

            this.isShowGameDialog = true;
          }
        });
      },
      //点击'变更比赛状态'
      clickChangeState(row) {
        this.state.value = row.state;
        this.stateId = row.id;
        this.isShowStateDialog = true;
      },

      //点击'删除'按钮
      clickRemoveBtn(row) {
        this.$confirm(`确定删除当前赛事 ?`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.game.delContest(row.id).then(res => {
            if (res.data && res.data.resultCode === 0) {
              this.$message.success('赛事删除成功');
              this.Mixin_handleCurrentChange(1);
            }
          });
        }).catch(() => {
        });
      },
      //上传成功
      uploadSuccess(data) {
        this.info.imgUrl = data.imgSrc;
      },
      //提交赛事
      submitInfoBtn(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            this.submitButtonLoading = true;
            if (this.currentHandle === 'add') {
              let params = {};
              params.province = this.info.city[0];
              params.city = this.info.city[1];
              params.area = this.info.city[2];
              params.address = this.info.address;
              params.context = this.info.context;
              params.fabulousNumber = this.info.fabulousNumber;
              params.enrollMoney = this.info.enrollMoney;
              params.imgUrl = this.info.imgUrl;
              params.money = this.info.money;
              params.peopleNumber = this.info.peopleNumber;
              params.playDays = this.info.playDays;
              params.playRoom = this.info.playRoom;
              params.drawTime = this.info.drawTime;
              params.playTime = this.info.playTime;
              params.playTimeStart = this.info.playTimeStart;
              params.playTimeStop = this.info.playTimeStop;
              params.showFlag = this.info.showFlag === 'true';
              params.state = this.info.state;
              params.title = this.info.title;
              this.$api.game.addContest(params).then(res => {
                this.submitButtonLoading = false;
                if (res.data && res.data.resultCode === 0) {
                  this.$message.success('赛事新增成功');
                  this.initData();
                  this.isShowGameDialog = false;
                }
              });

            } else {
              let params = {};
              params.province = this.info.city[0];
              params.city = this.info.city[1];
              params.area = this.info.city[2];
              params.address = this.info.address;
              params.context = this.info.context;
              params.fabulousNumber = this.info.fabulousNumber;
              params.enrollMoney = this.info.enrollMoney;
              params.imgUrl = this.info.imgUrl;
              params.money = this.info.money;
              params.peopleNumber = this.info.peopleNumber;
              params.playDays = this.info.playDays;
              params.playRoom = this.info.playRoom;
              params.drawTime = this.info.drawTime;
              params.playTime = this.info.playTime;
              params.playTimeStart = this.info.playTimeStart;
              params.playTimeStop = this.info.playTimeStop;
              params.showFlag = this.info.showFlag === 'true';
              params.state = this.info.state;
              params.title = this.info.title;
              params.id = this.info.id;
              this.$api.game.addContest(params).then(res => {
                this.submitButtonLoading = false;
                if (res.data && res.data.resultCode === 0) {
                  this.$message.success('赛事编辑成功');
                  this.initData();
                  this.isShowGameDialog = false;
                }
              });
            }
          }
        })
      },
      //提交状态变更
      submitStateBtn(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let params = {
              id: this.stateId,
              state: this.state.value,
            };
            this.$api.game.setContestState(params).then(res => {
              if (res.data && res.data.resultCode === 0) {
                this.$message.success('赛事状态变更成功');
                this.initData();
                this.isShowStateDialog = false;
              }
            });
          }
        })
      },
      //点击'设置抽签规则'按钮
      clickRuleBtn(row) {
        this.draw.value = [];
        this.$api.game.getEnrollUser(row.id).then(res => {
          if (res.data && res.data.resultCode === 0) {
            let data = res.data.data;
            this.ruleList = data;
            if (data.length === 0) {
              this.$message.warning('当前没有参与抽签的人员');
            } else {
              this.draw.id = row.id;
              data.forEach((item, index) => {
                if (item.isDraw === '1') {
                  this.draw.value.push(item.id);
                }
              });
              this.isShowRuleDialog = true;
            }
          }
        });
      },
      //设置自动抽签
      clickAutoBtn(row) {
        this.$confirm(`确定该比赛设置自动抽签 ?`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.game.getDrawResult(row.id).then(res => {
            if (res.data && res.data.resultCode === 0) {
              this.$message.success('设置自动抽签成功');
            }
          });
        }).catch(() => {
        });
      },
      //设置抽签规则
      submitRuleBtn(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let params = {};
            this.$api.game.notDrawUser(params).then(res => {
              if (res.data && res.data.resultCode === 0) {
                this.$message.success('设置抽签规则成功');
                this.initData();
                this.isShowRuleDialog = false;
              }
            });
          }
        })
      },
      //设置比赛成绩
      submitPerformanceBtn(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {

          }
        })
      },
    },
    props: {},
    watch: {},
    mixins: [],
    filters: {},
    components: {EditorBar},
  }
</script>

<style lang="scss" scoped>
  .column-title {
    & > .column-title-item {
      flex: 1;
    }
  }

  .show-wrap {
    width: 100%;
    overflow-x: auto;

    & > .column {

      .column-item {
        flex: 1;
        padding: 0 10px;
        box-sizing: border-box;
        border: 1px solid #EBEEF5;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
