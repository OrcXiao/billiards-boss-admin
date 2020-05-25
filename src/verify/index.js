const verify = {};
/*
 * @params: hint --- 传入的提示对象, 自由配置属性, 目前可以配置以下参数:
 * hint:{
 *   item: (提示名 --- string类型),
 *   maxLength: (提示字段长短 --- number类型),
 * }
 * */

/*========== 非空的校验 ==========
 校验内容:
 1,字段不能为空
 */
verify.nullStr = (hint) => {
  return (rule, value, callback) => {
    if(!value || value.length === 0){
      callback(new Error(hint.item + '不能为空'));
    }
    else{
      callback();
    }
  }
};

/*========== 数字的校验 ==========
 校验内容:
 1,字段不能为空.
 2,只能输入数字.
 */
verify.number = (hint) => {
  return (rule, value, callback) => {
    if(!value || value.length === 0 || Number(value) === 0){
      callback(new Error(hint.item + '不能为空'));
    }
    else if(isNaN(value)){
      callback(new Error('请输入正确的数字'));
    }
    else if(hint.maxVal && (parseFloat(value) > hint.maxVal)){
      callback(new Error('不能超过最大值' + hint.maxVal));
    }
    else if(hint.maxLength && value.length !== hint.maxLength){
      callback(new Error(`请输入${hint.maxLength}位数字`));
    }
    else{
      callback();
    }
  }
};

/*========== JAVA int 32位类型 ==========
 校验内容:
 1,字段不能为空.
 2,只能输入数字.
 3,不能超过最大值 2147483647
 */
verify.int32 = (hint) => {
  return (rule, value, callback) => {
    if(!value || value.length === 0 || Number(value) === 0){
      callback(new Error(hint.item + '不能为空'));
    }
    else if(isNaN(value) || !(/^-?\d+$/.test(value))){
      callback(new Error('请输入正确的整数'));
    }
    else if(hint.maxVal && (parseFloat(value) > hint.maxVal)){
      callback(new Error('不能超过最大值' + hint.maxVal));
    }
    else if(parseFloat(value) > 2147483647){
      callback(new Error('不能超过最大值 2147483647'));
    }
    else{
      callback();
    }
  }
};

/*========== JAVA int 64位类型 ==========
 校验内容:
 1,字段不能为空.
 2,只能输入数字.
 3,输入的数字最后一位不能是小数点"."
 4,不能超过最大值 9223372036854775806
 */
verify.int64 = (hint) => {
  return (rule, value, callback) => {
    if(!value || value.length === 0 || Number(value) === 0){
      callback(new Error(hint.item + '不能为空'));
    }
    else if(isNaN(value) || !(/^-?\d+$/.test(value))){
      callback(new Error('请输入正确的整数'));
    }
    else if(parseFloat(value) > 9223372036854775806){
      callback(new Error('不能超过最大值 9223372036854775806'));
    }
    else{
      callback();
    }
  }
};

export default verify
