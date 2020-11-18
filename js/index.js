! function() {
  window.onresize = function() {
    //     1.获取屏幕的宽度；
    var html = document.documentElement;
    var w = html.clientWidth;
    //     得到宽度，做计算，w强制性范围限制；
    if (w < 1024) {
      w = 1024;
    }
    if (w > 1920) {
      w = 1920;
    }
    //     2.计算出1rem基准值；（范围）做法：
    //          宽度 / 约定值   80 
    //          约定值 : 随便定的，但是上面计算结果不要小于 12px;
    var base = w / 80;

    //     3.基准值设置给HTML 的 fontSize;
    html.style.fontSize = base + "px";
  };
  // 自己页面进行一次计算
  window.onresize();
}();



// ----------------------------监控
! function() {
  $(".monitor a").on("click", function() {
    // 样式
    $(this).addClass("active");
    $(this).siblings().removeClass("active");


    // 对应
    // var index = $(this).index();
    // var index = this.dataset.index;   // 原生
    var index = $(this).attr("data-index");


    // 找对应，找兄弟
    // $(".monitor .content").eq(index).show();
    // $(".monitor .content").eq(index).siblings(".content").hide();

    // 先所有，再对应
    $(".monitor .content").hide();
    $(".monitor .content").eq(index).show();

  });



  // JQ遍历 复制；
  $.each($(".monitor .marquee"), function(index, ele) {
    //
    var newRows = $(ele).children().clone();
    $(ele).append(newRows);
  });





}();



// ---------------------------点位
! function() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('dianwei'));

  // 指定图表的配置项和数据
  var option = {
    tooltip: {
      trigger: 'item',
      // {a} : series里面具体某个对象数据name
      // {b}:  每条数据里面name
      // {c}:  每条数据里面value
      // {d}:  每条数据value占有全部数据总和占比
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [{
      name: '2020销售',
      type: 'pie',
      radius: ["10%", "70%"],
      center: ['50%', '50%'],
      roseType: 'radius', // 数据展示形式
      data: [
        { value: 20, name: '云南' },
        { value: 26, name: '北京' },
        { value: 24, name: '山东' },
        { value: 25, name: '河北' },
        { value: 20, name: '江苏' },
        { value: 25, name: '浙江' },
        { value: 30, name: '四川' },
        { value: 42, name: '湖北' }
      ],
      // 文本：
      label: {
        fontSize: 10,
      },
      labelLine: {
        length: 8,
        length2: 5,
      }
    }],
    color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}();




// ----------------------------用户
! function() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('users'));


  // 具体三项：灰色
  var item = {
    value: 1200,
    // 本身样式配置
    itemStyle: {
      color: '#254065'
    },
    // 高亮的样式配置
    emphasis: {
      itemStyle: {
        color: '#254065'
      },
    },
    // 工具提示配置
    tooltip: {
      // CSS的额外配置  需要写CSS字符串
      extraCssText: 'opacity:0;'
    },
  };

  // 指定图表的配置项和数据
  var option = {
    color: new echarts.graphic.LinearGradient(
      // (x，y) 点到点 (x2,y2) 之间进行渐变
      0, 0, 0, 1, [
        { offset: 0, color: '#00fffb' }, // 0 起始颜色
        { offset: 1, color: '#0061ce' } // 1 结束颜色
      ]
    ),

    tooltip: {
      // 触发参考：具体的某个项；
      trigger: 'item',
    },
    // 框
    grid: {
      // 默认不显示
      show: true,
      borderColor: "rgba(0, 240, 255, 0.3)",
      // 上下左右的位置
      top: "4%",
      right: '3%',
      bottom: '3%',
      left: '0%',
      containLabel: true,

    },
    xAxis: [{
      type: 'category',
      data: ['上海', '广州', '北京', '深圳', '合肥',
        '', '......', '',
        '杭州', '厦门', '济南', '成都', '重庆'
      ],
      // 控制刻度
      axisTick: {
        show: false,
        alignWithLabel: true
      },
      // 刻度上的字
      axisLabel: {
        color: "#4c9bfd"
      }
    }],
    yAxis: [{
      type: 'value',
      axisLabel: {
        color: "#4c9bfd"
      },
      axisTick: {
        show: false,
        alignWithLabel: true
      },
      // Y轴分割线：设置颜色
      splitLine: {
        lineStyle: {
          color: "rgba(0, 240, 255, 0.3)"
        }
      }
    }],
    series: [{
      name: '直接访问',
      type: 'bar',
      barWidth: '60%',
      // [{}] {}某一项
      //     如果{}只有一个属性名和值，直接可以把这个值放在数组内；
      //     {}还有其他配置，写成{}
      data: [2100, 1900, 1700, 1560, 1400,
        // 
        item, item, item,
        // 
        900, 750, 600, 480, 240
      ]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);


}();




// -----------------------------订单
! function() {
  // 1. 准备数据
  var data = {
    day365: { orders: '20,301,987', amount: '99834' },
    day90: { orders: '301,987', amount: '9834' },
    day30: { orders: '1,987', amount: '3834' },
    day1: { orders: '987', amount: '834' }
  };

  // 2.tab切换：WebAPI
  $(".order a").on("click", function() {
    // 样式：
    $(this)
      .addClass("active")
      .siblings().removeClass("active");

    // 找对应数据
    //   1.对应信息
    var key = $(this).attr("data-key");
    //   2.对应数据；{ orders: '20,301,987', amount: '99834' }
    var val = data[key];
    // 渲染在下面容器；
    $(".order h4").eq(0).text(val.orders);
    $(".order h4").eq(1).text(val.amount);
  });


  // 3.自动切换
  //    第一个a点击；0
  //    第二个a点击；1
  //                2  
  //                3 
  //                4的时候，回归到0；
  var index = 0; // 第一个
  setInterval(function() {
    // 找到index对应的a
    $(".order a").eq(index).click();

    // index进行变化
    index++;
    if (index == 4) {
      index = 0;
    }

  }, 2000);

}();




// --------------------------------sales
! function() {

  // -------------------ec
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('sales'));
  // 指定图表的配置项和数据
  var option = {
    // 边框！
    grid: {
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      show: true,
      borderColor: '#012f4a'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],

      // 文本内容
      axisLabel: {
        color: '#4c9bfd',
      },
      // 刻度
      axisTick: {
        show: false,
      },
      // 轴线
      axisLine: {
        show: false,
      }
    },
    yAxis: {
      type: 'value',
      // 文字
      axisLabel: {
        color: '#4c9bfd',
      },
      // 刻度
      axisTick: {
        show: false,
      },
      // 轴线：隐藏了，一会设置grid边框线
      axisLine: {
        show: false,
      },
      // 分割线 颜色  边框的颜色一样
      splitLine: {
        lineStyle: {
          color: '#012f4a' // 分割线颜色
        }
      }
    },
    series: [{
      name: '预期销售额',
      data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
      type: 'line',
      smooth: true
    }, {
      name: '实际销售额',
      data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
      type: 'line',
      smooth: true
    }],
    // 两条线颜色；
    color: ["#00f2f1", "#ed3f35"],
    // 鼠标提醒：
    tooltip: {
      trigger: 'axis'
    },
    // 图例：必须要求series数据必须有name属性
    legend: {
      textStyle: {
        color: "#fff",
      },
      right: "10%"
    }
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);


  // ----------------tab栏点击
  // 1.准备数据
  var data = {
    year: [
      [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
      [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
    ],
    quarter: [
      [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
      [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
    ],
    month: [
      [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
      [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
    ],
    week: [
      [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
      [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
    ]
  };


  // 2.注册事件
  $(".sales a").click(function() {
    // 2.1 样式
    $(this)
      .addClass("active")
      .siblings().removeClass("active");


    // 2.2 找对应的数据
    //  对应的信息：
    var key = this.dataset.type;
    //  对应的数据
    var val = data[key];

    // 2.3 重新设置数据；
    //    修改option对象
    option.series[0].data = val[0];
    option.series[1].data = val[1];

    //    重新设置
    myChart.setOption(option);
  });


  // 3.定时切换；
  // var index = 0; // 第一个
  // var timer = setInterval(function() {
  //   // 找到index对应的a
  //   $(".sales a").eq(index).click();

  //   // index进行变化
  //   index++;
  //   if (index == 4) {
  //     index = 0;
  //   }

  // }, 2000);



  // 4.鼠标控制
  $(".sales")
    .on("mouseenter", function() {
      clearInterval(timer);
    })
    .on("mouseleave", function() {
      timer = setInterval(function() {
        // 找到index对应的a
        $(".sales a").eq(index).click();

        // index进行变化
        index++;
        if (index == 4) {
          index = 0;
        }

      }, 2000);
    });




}();



// --------------------------------销售渠道
! function() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('gauge'));

  var option = {
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: ['130%', '150%'],
      center: ['48%', '88%'],
      label: {
        show: false,
        position: 'center'
      },
      // 饼图：默认每一项，鼠标悬浮的偏移值！
      hoverOffset: 0,
      data: [{
          value: 100,
          itemStyle: {
            color: "#12274d"
          }
        },
        {
          value: 200,
          itemStyle: {
            opacity: 0
          }
        },
        {
          value: 100,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#00c9e0' },
                { offset: 1, color: '#005fc1' }
              ]
            }
          }
        },
      ]
    }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);


}();




// -------------------------------排行榜
! function() {
  var arr = [
    { name: '可爱多', num: '9,086' },
    { name: '娃哈哈', num: '8,341' },
    { name: '喜之郎', num: '7,407' },
    { name: '八喜', num: '6,080' },
    { name: '小洋人', num: '6,724' },
    { name: '好多鱼', num: '2,170' },
  ];
  // 
  $(".top .sup li").on("mouseenter", function() {
    // 样式
    $(this).addClass("active").siblings().removeClass("active");

    // 业务：真实的业务就是找对应数据，进行渲染！
    //       目前是为了知识的联系，使用随机排序；
    // 1.让数组随机排序
    arr.sort(function(a, b) {
      return 0.5 - Math.random();
    });

    // 2.排序后渲染在容器里；
    var str = "";
    $.each(arr, function(index, one) {
      str += `<li>  
                <span>${one.name}</span>   
                <span> 
                  <s class="icon-up"></s>
                  ${one.num}
                </span>
              </li>`;
    });
    $(".top .sub").html(str);
  });

  // 
  $(".top .sup li").eq(0).mouseenter();
}();