'use strict';
$(document).on('pageInit', '#page-personal', function (e, id, page) {
// 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('j-echarts'));

// 指定图表的配置项和数据
  var option = {
    backgroundColor: '#fff',
    title: {
      text: '综合净值',
      textStyle: {
        fontSize: '16px'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      right: 0,
      data: ['擂台', '牛股']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['6.24', '6.28', '6.30', '6.31', '6.32', '6.33']
    },
    yAxis: {
      type: 'value',
      max: 12
    },
    series: [
      {
        name: '擂台',
        type: 'line',
        stack: '总量',
        data: [0, 1, 2, 3, 4, 5, 6]
      },
      {
        name: '牛股',
        type: 'line',
        stack: '总量',
        data: [0, 2, 0, 0, 3, 4, 6]
      }
    ]
  };
// 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);


  $('.j-choose').each(function () {
    $(this).click(function () {
      $(this).children('.u-checkbox').addClass('u-check_r').removeClass('u-check_n');
      $(this).siblings().children('.u-checkbox').removeClass('u-check_r').addClass('u-check_n');
    });
  });
});
