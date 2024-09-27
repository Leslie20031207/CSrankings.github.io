// 假设qs2024是已经解析好的数据集

const scatterCtx2 = document.getElementById('scatterChart2').getContext('2d');

const colorsByContinent = {
    '美洲': 'rgba(255, 99, 132, 0.5)',
    '欧洲': 'rgba(54, 162, 235, 0.5)',
    '亚洲': 'rgba(255, 206, 86, 0.5)',
    '大洋洲': 'rgba(75, 192, 192, 0.5)',
    '非洲': 'rgba(153, 102, 255, 0.5)'
};

const borderColorsByContinent = {
    '美洲': 'rgba(255, 99, 132, 1)',
    '欧洲': 'rgba(54, 162, 235, 1)',
    '亚洲': 'rgba(255, 206, 86, 1)',
    '大洋洲': 'rgba(75, 192, 192, 1)',
    '非洲': 'rgba(153, 102, 255, 1)'
};

// 创建一个空数组来存储按大洲分类的数据集
const datasetsByContinent = [];

// 遍历数据集，根据大洲分类
qs2025.forEach(university => {
    const continent = university['地区'];
    const color = colorsByContinent[continent];
    const borderColor = borderColorsByContinent[continent];

    // 检查是否已经为该大洲创建了数据集
    let datasetFound = false;
    datasetsByContinent.forEach(dataset => {
        if (dataset.label === continent) {
            dataset.data.push({
                x: university['国际教师占比'],
                y: university['国际学生占比'],
                // 点的大小可以根据需要调整，这里使用了一个简单的计算方式
                r: Math.max(2, (1000-university['指数'])  / 200)
            });
            datasetFound = true;
        }
    });

    // 如果没有为该大洲创建数据集，创建一个新的
    if (!datasetFound) {
        datasetsByContinent.push({
            label: continent,
            data: [{
                x: university['国际教师占比'],
                y: university['国际学生占比'],
                r: Math.max(2, (1000 - university['指数'])  / 200)
            }],
            backgroundColor: color,
            borderColor: borderColor,
            borderWidth: 1
        });
    }
});

// 创建散点图
const scatterChart = new Chart(scatterCtx2, {
    type: 'bubble',
    data: {
        datasets: datasetsByContinent
    },
    options: {
        scales: {
            x: {
                type: 'linear', // 线性刻度
                position: 'bottom',
                title: {
                    display: true,
                    text: '国际教师占比'
                },
                min: 0, // 设置最小值为0
                max: 100 // 设置最大值为100
            },
            y: {
                title: {
                    display: true,
                    text: '国际学生占比'
                },
                min: 0,
                max: 100
            }
        },
        legend: {
            display: true,
            position: 'top'
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem) {
                    let label = tooltipItem.dataset.label;
                    let value = tooltipItem.yLabel;
                    return `${label}: 国际教师占比 ${tooltipItem.xLabel}%, 国际学生占比 ${value}%`;
                }
            }
        }
    }
});