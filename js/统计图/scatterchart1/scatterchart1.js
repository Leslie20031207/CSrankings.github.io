const scatterCtx = document.getElementById('scatterChart').getContext('2d');

// 定义背景色和边框色数组，与洲的颜色相对应
const continentColors = {
    '美洲': 'rgba(255, 99, 132, 0.5)',
    '欧洲': 'rgba(54, 162, 235, 0.5)',
    '亚洲': 'rgba(255, 206, 86, 0.5)',
    '大洋洲': 'rgba(75, 192, 192, 0.5)',
    '非洲': 'rgba(153, 102, 255, 0.5)'
};

const continentBorderColors = {
    '美洲': 'rgba(255, 99, 132, 1)',
    '欧洲': 'rgba(54, 162, 235, 1)',
    '亚洲': 'rgba(255, 206, 86, 1)',
    '大洋洲': 'rgba(75, 192, 192, 1)',
    '非洲': 'rgba(153, 102, 255, 1)'
};

// 函数根据大学所属地区设置背景颜色
function getBackgroundColorByContinent(continent) {
    return continentColors[continent] || 'rgba(0,0,0,0)'; // 默认背景色为透明
}

// 函数根据大学所属地区设置边框颜色
function getBorderColorByContinent(continent) {
    return continentBorderColors[continent] || 'rgba(0,0,0,1)'; // 默认边框色为黑色
}

// 准备散点图数据
const scatterChartData = qs2025.map((university) => ({
    x: university['师生比'],
    y: university['每位教员引用率'],
    size: Math.max(2, (university['学术声誉'] / 100) * 5),
    label1: university['机构名称'],
    continent: university['地区'],
    contry: university['地点']
}));

// 按洲分组
const groupedData = {};
scatterChartData.forEach((point) => {
    if (!groupedData[point.continent]) {
        groupedData[point.continent] = [];
    }
    groupedData[point.continent].push(point);
});

// 获取绘图上下文
new Chart(scatterCtx, {
    // 指定图表类型为气泡图
    type: 'bubble',
    data: {
        // 定义图表的数据集，使用Object.entries将groupedData对象转换为数组
        datasets: Object.entries(groupedData).map(([continent, data]) => ({
            // 为每个数据集设置标签，对应于groupedData对象的键（即大洲名称）
            label: continent,
            // 为每个数据集设置数据点，对应于groupedData对象的值
            data: data,

            // 根据大洲名称获取背景颜色
            backgroundColor: getBackgroundColorByContinent(continent),
            // 根据大洲名称获取边框颜色
            borderColor: getBorderColorByContinent(continent),
            
            // 定义每个数据点的半径，使用函数根据数据点的size属性动态计算
            pointRadius: (context) => {
                const point = context.dataset.data[context.dataIndex];
                return point.size;
            }
        }))
    },
    options: {
        // 定义图表的尺度（scales）配置
        scales: {
            // 定义X轴的配置
            xAxes: [{
                // 设置X轴的类型为线性
                type: 'linear',
                // 设置X轴刻度标签的字体大小（注意：此属性可能在某些版本的Chart.js中不受支持）
                fontsize: 1,
                // 设置X轴的位置在底部
                position: 'bottom',
                // 定义X轴的刻度标签文本
                scaleLabel: {
                    display: true,
                    labelString: '师生比'
                }
            }],
            // 定义Y轴的配置
            yAxes: [{
                // 定义Y轴的刻度标签文本
                scaleLabel: {
                    display: true,
                    labelString: '每位教员引用率'
                }
            }]
        },
        
        // 定义工具提示（tooltips）的配置
        tooltips: {
            callbacks: {
                // 定义工具提示显示的文本
                label: function (tooltipItem, data) {
                    // 获取当前激活的数据点
                    const point = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    // 返回格式化的字符串，显示数据点的标签、师生比、每位教员引用率和学术声誉
                    return `${point.label1}:
                    师生比 ${point.x.toFixed(2)}, 
                    每位教员引用率 ${point.y.toFixed(2)}, 
                    学术声誉 ${(point.size.toFixed(2) / 5) * 100}%`;
                }
            }
        },


        // 定义图例（legend）的配置，图例提供了一种方式来标识图表中不同的数据集
        legend: {
            // display 属性设置为 true，表示在图表中显示图例
            // 如果设置为 false，则不会显示图例
            display: true
        }
    }
});