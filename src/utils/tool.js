/**
 * 工具函数库
 */

/**
 * 格式化时间戳
 * @param {*} timestamp
 * @returns
 */
export function formatDate(timestamp) {
  let date = new Date(parseInt(timestamp));

  let year = date.getFullYear(); // 年
  let month = date.getMonth() + 1; // 月
  let day = date.getDate(); // 日

  let hour = date.getHours(); // 时
  let minutes = date.getMinutes(); // 分
  let seconds = date.getSeconds(); // 秒

  let weekArr = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ];
  let week = weekArr[date.getDay()];

  // 需要给一位数前面加 0
  // 9 点 ----> 09:45:03

  if (month >= 1 && month <= 9) {
    // month += '0'; // a += b ----> a = a + b
    month = '0' + month;
  }

  if (day >= 0 && day <= 9) {
    day = '0' + day;
  }

  if (hour >= 0 && hour <= 9) {
    hour = '0' + hour;
  }

  if (minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes;
  }

  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds;
  }
  return (
    year +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hour +
    ':' +
    minutes +
    ':' +
    seconds +
    ' ' +
    week
  );
}


/**
 * antd的表格自适应
 * 使用方式：直接 getTableScroll()会返回高度给 TAble 的scroll里面的y
 * */
export function getTableScroll({ extraHeight, id }) {
  if (typeof extraHeight == "undefined") {
    //  默认底部分页64 + 边距10
    extraHeight = 74
  }
  let tHeader = null
  if (id) {
    tHeader = document.getElementById(id) ?
        document.getElementById(id).getElementsByClassName("ant-table-thead")[0] : null
  } else {
    tHeader = document.getElementsByClassName("ant-table-thead")[0]
  }
  // 获取分页高度
  const paginationEl = document.querySelector('.ant-pagination');
  const paginationHeight = paginationEl ? paginationEl.offsetHeight : 32;

// tHeader = 表格的表头（就是那一行灰色的标题栏）
// .getBoundingClientRect() = 浏览器自带方法，用来获取一个元素在屏幕上的位置和大小
// .bottom = 这个元素底部距离浏览器窗口顶部的距离（单位：px）
  let tHeaderBottom = 0
  if (tHeader) {
    tHeaderBottom = tHeader.getBoundingClientRect().bottom
  }
  //窗体高度-表格内容顶部的高度-表格内容底部的高度
  // let height = document.body.clientHeight - tHeaderBottom - extraHeight
  let height = `calc(100vh - ${tHeaderBottom + extraHeight + paginationHeight}px)`
  return height
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
