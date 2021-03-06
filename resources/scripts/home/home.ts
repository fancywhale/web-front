declare const dateFormat;
declare const moment;

var map = new BMap.Map("map");    // 创建Map实例
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

var headerContainer = document
  .getElementById('header')
  .getElementsByTagName('header')[0];

window.addEventListener('scroll', function () {
  if(window.scrollY === 0){
    headerContainer.classList.remove('hover');
  } else {
    headerContainer.classList.add('hover');
  }
});

var headerContainer = document
  .getElementById('header')
  .getElementsByTagName('header')[0];

window.addEventListener('scroll', function () {
  if(window.scrollY === 0){
    headerContainer.classList.remove('hover');
  } else {
    headerContainer.classList.add('hover');
  }
});


$('button#dateRange')['daterangepicker']({
  locale: {
    applyLabel: '确定',
    cancelLabel: '取消'
  }
}, function(startDate, endDate) {
  let startDateStr = startDate.format(dateFormat);
  let endDateStr = endDate.format(dateFormat);
  $('#startDate').text(startDateStr);
  $('#endDate').text(endDateStr);  
});
