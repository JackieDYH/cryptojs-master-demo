const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-')
}
function formatTime2(time, format) {
  let temp = '0000000000' + time
  let len = format.length
  return temp.substr(-len)
}


function packed_data(cmd, data, xor) {

  var d = parseInt(data)
  console.log('打包数据d='+d)
  let buffer = new ArrayBuffer(7)
  var u8 = new Uint8Array(buffer);
  u8[0] = 0x7E;
  u8[1] = cmd;
  u8[2] = d;
  u8[3] = 0x00;
  u8[4] = 0x00;
  u8[5] = xor;
  u8[6] = 0x80
  return buffer
}
//异或计算
function getXor(bytes, beginIndex, len) {
  
  console.log()
  var temp = bytes[beginIndex];
  for (var i= beginIndex+1; i < beginIndex + len; i++) {
    temp ^= bytes[i];
  }
  return temp;
}
//提取数据
function data_extrac(hexArr){
  var data = []
console.log(hexArr)
  if ('7E' == hexArr[0] || '7e' == hexArr[0]) {
    if (hexArr.length == 20) {
      if (hexArr[18] == '80' || hexArr[18]=='80') {
        console.log("完整数据包")
        for (var i = 1; i < hexArr.length - 2; i++) {
          data.push(hexArr[i])
        }
      }
    }

  }
  return data
}
//解析数据
function data_parsing(data){
  var d=[]
  console.log(data)
  switch (data[0]){
     case '05': switch (data[1]){
     case '01':
        d.push('05')
        d.push('01')
     break;
     case '03': 
        d.push('05')
        d.push('03')
       break;
     case '05':
        d.push('05')
        d.push('05')
        break;
     case '07': 
        d.push('05')
        d.push('07')
        break;
     case '09':
       d.push('05')
       d.push('09')
       break;
     default:
     console.log('成功')
     break;
   } break;
     case '04': 
      d.push('04')
      d.push(data[1])
      break;
 }
 return d
} 
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatTime2: formatTime2 ,
  packed_data: packed_data,
  getXor:getXor,
  data_parsing:data_parsing,
  data_extrac: data_extrac
}