import axios from './index';
import Vue from 'vue'

const api = {
  uploadUrl: axios.defaults.baseURL + '/oss/upload',
  //公共请求方法
  commonApi: {
    // 获取全部省份城市信息
    getAllCity() {
      return axios.get('/cmnRegion/tree')
    },
  },
  //登录相关
  login: {
    //获取登陆验证码
    getCode(params) {
      return axios.get('/user/getCode', { params, responseType: "arraybuffer" })
    },
    //退出登陆
    logout(params) {
      return axios.get('/user/logout', { params })
    },
    //注册用户
    register(params) {
      return axios.post('/user/register', params)
    },
    //登陆后台系统
    selectUser(params) {
      return axios.post(`/user/selectUser?account=${params.account}&&password=${params.password}&&randcheckcode=${params.randcheckcode}`)
    },
  },
  //资讯管理
  information: {
    //通过条件查询资讯分页数据
    getInfoList(params) {
      return axios.get("/informationDO/getInformations", { params })
    },
    //新增资讯(修改)
    addInformation(params) {
      return axios.post('/informationDO/addInformation', params)
    },
    //删除资讯
    delInformation(params) {
      return axios.delete('/informationDO/delInformation/' + params)
    },
    //通过id获取资讯详情
    getInformationById(params) {
      return axios.get('/informationDO/getInformationById/' + params)
    },
    //禁用/启用
    updateShow(params) {
      return axios.put('/informationDO/updateShow?id=' + params)
    },
  },
  //签表管理
  signature: {
    //新增签表(修改)
    addSignForm(params) {
      return axios.post('/signFormDO/addSignForm', params)
    },
    //删除签表
    delSignForm(params) {
      return axios.delete('/signFormDO/delSignForm/' + params)
    },
    // 通过id获取签表详情
    getSignFormById(params) {
      return axios.get('/signFormDO/getSignFormById/' + params)
    },
    // 通过条件查询签表分页数据
    getSignForms(params) {
      return axios.get('/signFormDO/getSignForms', { params })
    },
    //禁用/启用
    updateShow(params) {
      return axios.put('/signFormDO/updateShow?id=' + params)
    },
  },
  //赛事
  game: {
    // 新增赛事(修改)
    addContest(params) {
      return axios.post('/contestDO/addContest', params)
    },
    // 赛事状态变更
    setContestState(params) {
      return axios.post('/contestDO/setContestState', params)
    },
    // 设置本场比赛不参与抽签的人员
    notDrawUser(params) {
      return axios.post('/enrollDO/notDrawUser', params)
    },
    //删除赛事
    delContest(params) {
      return axios.delete('/contestDO/delContest/' + params)
    },
    // 通过id获取赛事详情
    getContestById(params) {
      return axios.get('/contestDO/getContestById/' + params)
    },
    // 通过条件查询赛事分页数据
    getContests(params) {
      return axios.get('/contestDO/getContests', { params })
    },
    //禁用/启用
    updateShow(params) {
      return axios.put('/contestDO/updateShow?id=' + params)
    },
    //根据比赛id获取比赛人员
    getEnrollUser(params) {
      return axios.get('/enrollDO/getEnrollUser/' + params)
    },
    //比赛人员详情列表
    contestDetail(params) {
      return axios.get('/contestDO/contestDetail', { params })
    },
    // 设置排名和奖金
    setRanking(params) {
      return axios.post('/contestDO/setRanking', params)
    },
    // 根据比赛id自动抽签
    getDrawResult(params) {
      return axios.get('/enrollDO/getDrawResult/' + params)
    },

  },
  //球房
  room: {
    //新增球房(修改)
    addRoom(params) {
      return axios.post('/roomDO/addRoom', params)
    },
    //删除球房
    delRoom(params) {
      return axios.delete('/roomDO/delRoom/' + params)
    },
    // 通过id获取球房详情
    getRoomById(params) {
      return axios.get('/roomDO/getRoomById/' + params)
    },
    //通过条件查询球房分页数据
    getRooms(params) {
      return axios.get('/roomDO/getRooms', { params })
    },
  },
  //教程
  course: {
    // 新增教程(修改)
    addCourse(params) {
      return axios.post('/courseDO/addCourse', params)
    },
    //删除教程
    delCourse(params) {
      return axios.delete('/courseDO/delCourse/' + params)
    },
    // 通过id获取教程详情
    getCourseById(params) {
      return axios.get('/courseDO/getCourseById/' + params)
    },
    // 通过条件查询教程分页数据
    getCourses(params) {
      return axios.get('/courseDO/getCourses', { params })
    },
    //禁用/启用
    updateShow(params) {
      return axios.put('/courseDO/updateShow?id=' + params)
    },
  },

  //TiYi
  //WebSocket
  socket: {
    //登录
    login(params) {
      Vue.prototype.WebInstance.SendMsg("AdminLogin_CG", params)
    },
    //获取比赛数据
    getGameData(params){
      Vue.prototype.WebInstance.SendMsg("FetchAllClientEnrollUser_CG", params)
    }
  },
  //获取比赛数据


};

export default api;
