// 定义了一个包含五个颜色值的数组，每个颜色值代表一个洲的背景色，并设置透明度为0.5。
const backgroundColors3 = [
    'rgba(255, 99, 132, 0.5)', // 美洲
    'rgba(54, 162, 235, 0.5)', // 欧洲
    'rgba(255, 206, 86, 0.5)', // 亚洲
    'rgba(75, 192, 192, 0.5)', // 大洋洲
    'rgba(153, 102, 255, 0.5)' // 非洲
];

// 定义了一个包含五个颜色值的数组，每个颜色值代表一个洲的边框色，透明度设置为1，即不透明。
const borderColors = [
    'rgba(255,99,132,1)', // 美洲
    'rgba(54, 162, 235, 1)', // 欧洲
    'rgba(255, 206, 86, 1)', // 亚洲
    'rgba(75, 192, 192, 1)', // 大洋洲
    'rgba(153, 102, 255, 1)' // 非洲
];

// 定义了一个包含九个指标名称的数组，这些指标将用于雷达图的轴标签。
const indicators = [
    '学术声誉', '雇主声誉', '国际学生占比', '师生比',
    '国际教师占比', '每位教员引用率', '就业成果', '可持续性', '国际研究网络'
];


// 准备雷达图数据，使用reduce函数对qs2025数组进行迭代，按洲分组并计算各项指标的平均值。
const continentAverages = qs2023.reduce((acc, university) => {
    const continent = university.地区; // 获取大学的洲名
    if (!acc[continent]) {
        // 如果acc对象中还没有当前洲的记录，初始化该洲的指标累加值为0。
        acc[continent] = indicators.reduce((continentAcc, indicator) => {
            continentAcc[indicator] = 0;
            return continentAcc;
        }, { TotalCount: 0 });
    }
    // 对每个指标进行累加。
    indicators.forEach(indicator => {
        acc[continent][indicator] += university[indicator];
    });
    // 增加该洲大学数量的计数。
    acc[continent].TotalCount++;
    return acc;
}, {});


// 计算每个洲的平均得分，并准备雷达图的数据集。
const radarDatasets = Object.keys(continentAverages).map((continent, index) => {
    // 计算每个指标的平均得分。
    const averages = indicators.map(indicator => {
        return (continentAverages[continent][indicator] / continentAverages[continent].TotalCount).toFixed(2);
    });
    return {
        label: continent, // 洲的名称
        data: averages, // 该洲的平均得分数组
        backgroundColor: backgroundColors3[index % backgroundColors3.length], // 背景色
        borderColor: borderColors[index % borderColors.length], // 边框色
        borderWidth: 1, // 边框宽度
    };
});


// 获取页面上id为'radarChart'的canvas元素，并使用Chart.js创建一个雷达图。
const radarChartCanvas = document.getElementById('radarChart');
const radarChart = new Chart(radarChartCanvas, {
    type: 'radar', // 图表类型为雷达图
    data: {
        labels: indicators, // 指标名称作为雷达图的轴标签
        datasets: radarDatasets // 数据集
    },
    options: {
        responsive: true, // 设置图表为响应式，根据屏幕窗口变化而变化
        maintainAspectRatio: false,// 保持图表原有比例
        elements: {
            line: {
                borderWidth: 3 // 设置线条宽度
            }
        },
        plugins: {
            legend: {
                position: 'top', // 图例显示在顶部
            },
            title: {
                display: true, // 显示标题
                text: '' // 标题文本为空
            }
        }
    },
    /* options: {
        scale: {
            
            angleLines: {
                display: true, // 显示角度线
                color: '#333333', // 使用深色以提高清晰度
                lineWidth: 2, // 增加线宽
                lineStyle: 'dashed', // 使用虚线样式
                shadow: {
                    enabled: true, // 开启阴影效果
                    blur: 3, // 阴影的模糊度
                    color: 'rgba(0,0,0,0.3)', // 阴影的颜色
                    offsetX: 1, // 阴影的水平偏移量
                    offsetY: 1 // 阴影的垂直偏移量
                }
            },
            ticks: {
                display: true, // 隐藏刻度
                beginAtZero: true, // 刻度从0开始
                max: 100, // 最大刻度值为100
                stepSize: 10 // 刻度间隔为10
            },
            gridLines: {
                circular: true // 如果需要，可以设置为 false 以适应雷达图的曲线
            },
        },
        elements: {
            point: {
                radius: 3, // 数据点的半径
                hoverRadius: 6 // 鼠标悬停时数据点的半径
            }
        },
        plugins: {
            legend: {
                position: 'top', // 图例显示在顶部
            },
            title: {
                display: true, // 显示标题
                text: '' // 标题文本为空
            }
        }
    } */
});