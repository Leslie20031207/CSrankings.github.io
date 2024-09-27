/*大屏*/
$(function () {


    initMap();





})
//地图界面高度设置



//加载地图
function initMap() {
    // 百度地图API功能
    var map = new BMap.Map("map_div");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    // 单行注释，说明接下来的代码是添加地图类型控件的。

    // 创建一个新的BMap.Size对象，这个对象定义了地图控件的位置偏移量。
    // 这里指定了水平偏移量为10像素，垂直偏移量为50像素。
    var size1 = new BMap.Size(10, 50);

    // 调用map对象的addControl方法来添加一个新的控件到地图上。
    // 这里创建了一个BMap.MapTypeControl控件实例，允许用户在不同地图类型之间切换。
    map.addControl(new BMap.MapTypeControl({
        // offset属性设置控件的位置偏移量，使用了之前创建的size1对象。
        offset: size1,

        // mapTypes数组定义了用户可以切换的地图类型。
        // BMAP_NORMAL_MAP表示普通地图视图，通常显示为2D地图。
        // BMAP_HYBRID_MAP表示混合地图视图，通常结合了卫星图像和街道信息。
        mapTypes: [
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]
    }));

    /*     // 编写自定义函数,创建标注
        function addMarker(point) {
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
        } */

    // 这行代码是单行注释，它使得下面的代码块不会被执行。
    // 随机向地图添加25个标注

    /*    // 获取当前地图的边界信息
       var bounds = map.getBounds();
   
       // 获取地图边界的西南角坐标（左下角）
       var sw = bounds.getSouthWest();
   
       // 获取地图边界的东北角坐标（右上角）
       var ne = bounds.getNorthEast();
   
       // 计算经度跨度，即东北角和西南角经度之差的绝对值
       var lngSpan = Math.abs(sw.lng - ne.lng);
   
       // 计算纬度跨度，即东北角和西南角纬度之差的绝对值
       var latSpan = Math.abs(ne.lat - sw.lat);
   
       // 开始一个循环，用于生成25个随机点
       for (var i = 0; i < 25; i++) {
           // 根据当前地图的边界和计算出的跨度，生成一个随机的经度和纬度
           // Math.random() 生成一个0到1之间的随机数，乘以0.7是为了限制随机数的范围
           // 然后加上或减去这个值到西南角或东北角的坐标上，以确保点在地图的可视范围内
           var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
   
           // 调用addMarker函数，将新生成的点作为参数传递，以在地图上添加一个标注
           addMarker(point);
       }; */


    // 定义addMarker函数，它接受一个BMap.Point对象和一个标题，并在地图上创建一个标记
    function addMarker(point, title) {
        var marker = new BMap.Marker(point); // 创建标记
        marker.setTitle(title); // 设置标记的标题，当鼠标悬停时显示
        map.addOverlay(marker); // 将标记添加到地图上
    }

    // 定义大学位置信息数组
    var universities = [
        { title: "北京大学", lng: 116.310918, lat: 39.992873 },
        { title: "清华大学", lng: 116.326936, lat: 40.003213 },
        { title: "武汉大学", lng: 114.364339, lat: 30.536334 },
        { title: "华中科技大学", lng: 114.413301, lat: 30.513197 },
        { title: "香港城市大学", lng: 114.17715, lat: 22.33459 },
        { title: "香港大学", lng: 114.142767, lat: 22.280102 },
        { title: "香港中文大学", lng: 114.212345, lat: 22.417663 },
        { title: "澳门大学", lng: 113.548951, lat: 22.126188 },
        { title: "南京大学", lng: 118.779613, lat: 32.055085 },
        { title: "复旦大学", lng: 121.50356, lat: 31.296335 },
        { title: "上海交通大学", lng: 121.436882, lat: 31.025626 },
        { title: "浙江大学", lng: 120.081968, lat: 30.302257 },
        { title: "中山大学", lng: 113.298395, lat: 23.096729 },
        { title: "香港科技大学", lng: 114.269492, lat: 22.333564 },
        { title: "哈尔滨工业大学", lng: 126.632628, lat: 45.743215 },
        { title: "哈佛大学", lng: -71.11828, lat: 42.37088 },
        { title: "新加坡国立大学", lng: 103.77525, lat: 1.29597 },
        { title: "南洋理工大学", lng: 103.6799, lat: 1.34525 },
        { title: "悉尼大学", lng: 151.18703, lat: -33.88788 },
        { title: "墨尔本大学", lng: 144.96163, lat: -37.79618 },
        { title: "新南威尔士大学", lng: 151.22986, lat: -33.91625 },
        { title: "伦敦政治经济学院", lng: -0.11649, lat: 51.514579 },
        { title: "宾夕法尼亚大学", lng: -75.19682, lat: 39.95003 },
        { title: "斯坦福大学", lng: -122.17022, lat: 37.42673 },
        { title: "加州大学伯克利分校", lng: -122.25946, lat: 37.87234 },
        { title: "麻省理工大学", lng: -71.09228, lat: 42.35906 },
        { title: "加州理工学院", lng: -118.12528, lat: 34.13801 },
        { title: "多伦多大学", lng: -79.39465, lat: 43.66349 },
        { title: "苏黎世联邦理工大学", lng: 8.54854, lat: 47.37673 },
        { title: "哥伦比亚大学", lng: -73.96286, lat: 40.80783 },
        { title: "英属哥伦比亚大学", lng: -123.24626, lat: 49.26211 },
        { title: "巴黎萨克雷大学", lng: 2.17421, lat: 48.70321 },
        { title: "巴黎大学", lng: 2.34334, lat: 48.84844 },
        { title: "莫斯科国立大学", lng: 37.53475, lat: 55.70214 },
        { title: "圣彼得堡国立大学", lng: 30.29892, lat: 59.94308 },
        { title: "奥克兰大学", lng: 174.76936, lat: -36.85089 },
        { title: "昆士兰大学", lng: 153.01224, lat: -27.49626 },
        { title: "开普敦大学", lng: 18.4609, lat: -33.95759 },
        { title: "中国科学技术大学", lng: 117.26139, lat: 31.83819 },
        { title: "首尔大学", lng: 126.95288, lat: 37.46133 },
        { title: "东京大学", lng: 139.76254, lat: 35.71341 },
        { title: "康奈尔大学", lng: -76.47652, lat: 42.44659 },
        { title: "芝加哥大学", lng: -87.60071, lat: 41.79142 },
        { title: "普林斯顿大学", lng: -74.65656, lat: 40.34748 },
        { title: "爱丁堡大学", lng: -3.17509, lat: 55.92297 },
        { title: "洛桑联邦理工学院", lng: 6.56889, lat: 46.52018 },
        { title: "麦吉尔大学", lng: -73.57682, lat: 45.50487 },
        { title: "剑桥大学", lng: 0.102, lat: 52.21289 },
        { title: "约翰霍普金斯大学", lng: -76.62103, lat: 39.33008 },
        { title: "曼彻斯特大学", lng: -2.2339, lat: 53.46564 },
        { title: "伦敦国王学院", lng: -0.11537, lat: 51.51133},
        { title: "布里斯托大学", lng:-2.60146, lat: 51.45795 },
        { title: "卡内基梅隆大学", lng:79.94307, lat: 40.44311 },
        { title: "阿姆斯特丹大学", lng:4.89037, lat: 52.36863 },
        { title: "国立台湾大学", lng:121.53978, lat: 25.01758 },
        { title: "京都大学", lng:135.78095, lat: 35.02632 },
        { title: "早稻田大学", lng:139.72111, lat: 35.70948 },
        { title: "印度理工学院孟买分校", lng:72.91328, lat: 19.13402 },
        { title: "法赫德国王石油矿产大学", lng:50.14581, lat: 26.30761 },
        // ... 其他大学的位置信息
    ];

    // 获取地图的边界
    var bounds = map.getBounds();
    var sw = bounds.getSouthWest(); // 获取西南角坐标
    var ne = bounds.getNorthEast(); // 获取东北角坐标

    // 计算经度和纬度的跨度
    var lngSpan = Math.abs(sw.lng - ne.lng);
    var latSpan = Math.abs(ne.lat - sw.lat);

    // 遍历大学位置信息数组，并为每个大学添加标记
    universities.forEach(function (university) {
        // 为每个大学创建一个点对象
        var point = new BMap.Point(university.lng, university.lat);
        // 调用addMarker函数添加标记
        addMarker(point, university.title);
    });

    // 其他地图设置代码...


    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放


    /*     //设备地图颜色
        var mapStyle={
            style:"midnight"
        };
        map.setMapStyle(mapStyle); */





    //加载城市控件
    var size = new BMap.Size(10, 50);
    map.addControl(new BMap.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: size,


    }));
}

