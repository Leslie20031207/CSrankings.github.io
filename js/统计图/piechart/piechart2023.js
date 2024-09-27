// 获取页面上id为'continentPieChart'的canvas元素，用于绘制饼图。
const pieChartCanvas = document.getElementById('continentPieChart');

// 使用reduce函数对qs2025数组进行迭代，统计每个洲的大学数量。
const continentData = qs2023.reduce((acc, university) => {
    const region = university.地区; // 获取大学的洲名
    // 如果acc对象中还没有当前洲的记录，初始化为0，然后加1。
    acc[region] = (acc[region] || 0) + 1;
    return acc; // 返回累加后的acc对象
}, {});

// 定义了一个包含五个颜色值的数组，每个颜色值代表一个洲的背景色，并设置透明度为0.2。
const backgroundColors = [
    'rgba(255, 99, 132, 0.5)', // 美洲
    'rgba(54, 162, 235, 0.5)', // 欧洲
    'rgba(255, 206, 86, 0.5)', // 亚洲
    'rgba(75, 192, 192, 0.5)', // 大洋洲
    'rgba(153, 102, 255, 0.5)' // 非洲
];

// 使用Chart.js创建一个新的饼图实例。
const continentPieChart = new Chart(pieChartCanvas, {
    type: 'pie', // 图表类型为饼图
    data: {
        // 定义饼图的标签和数据集
        labels: Object.keys(continentData), // 洲名作为标签
        datasets: [{
            label: '各洲学校数量', // 数据集的标签
            data: Object.values(continentData), // 各洲大学数量作为数据
            backgroundColor: backgroundColors, // 背景色数组
            borderColor: [ // 边框颜色数组
                'rgba(255,99,132,1)', // 美洲
                'rgba(54, 162, 235, 1)', // 欧洲
                'rgba(255, 206, 86, 1)', // 亚洲
                'rgba(75, 192, 192, 1)', // 大洋洲
                'rgba(153, 102, 255, 1)', // 非洲
                'rgba(255, 159, 64, 1)' // 预留的边框颜色，但背景色数组中只有五个颜色
            ],
            borderWidth: 1 // 边框宽度
        }]
    },
    options: {
        responsive: true, // 响应式布局，图表会根据容器大小调整
        plugins: {
            legend: { // 图例配置
                position: 'top', // 图例显示在顶部
                display: true // 显示图例
            },
            title: { // 标题配置
                display: true, // 显示标题
                text: '', // 标题文本为空格，避免显示默认标题
                padding: 2 // 标题与图表内容的距离
            }
        },
    }
});