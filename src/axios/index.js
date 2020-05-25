import axios from 'axios';
import {Message} from "element-ui";
//请求超时
axios.defaults.timeout = 50000;

//请求的基础url
axios.defaults.baseURL = 'http://www.taiqiuplus.com:8082/api';
// axios.defaults.baseURL = 'http://billiards.utools.club/api';

// axios.defaults.baseURL = window.location.href + 'api';

// http://www.taiqiuplus.com:8081/api';

axios.interceptors.response.use(res => {
  //错误码为-1, 统一进行提示.
  if (res.data.resultCode === -1) {
    Message.error(res.data.resultMsg || '系统错误');
  }
  return res
});

export default axios
