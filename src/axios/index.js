import axios from 'axios';
import {Message} from "element-ui";
//请求超时
axios.defaults.timeout = 50000;

// axios.defaults.baseURL = 'http://xbp77v.natappfree.cc/';
// axios.defaults.baseWeb = 'ws://server.natappfree.cc:43332/ws';

axios.defaults.baseURL = 'http://billiards.aafu.xyz:6017/';
axios.defaults.baseWeb = 'wss://billiards.aafu.xyz:6013/ws';

axios.interceptors.response.use(res => {
  //错误码为-1, 统一进行提示.
  // if (res.data.resultCode !== 0) {
  //   Message.error(res.data.resultMsg || '系统错误');
  // }
  return res
});

export default axios
