// 2动态生成表格内容的通用函数
function populateTable(data, tableId) {
    var $tbody = $('#' + tableId + ' > tbody');
    $tbody.empty(); // 清空现有的表格内容

    data.forEach(function (university) {
        // 创建排名和大学名称列
        var $row = $('<tr>')
            .append($('<td>').text(university.指数))
            .append($('<td>').text(university.机构名称));

        // 检查是否是世界排名表格，如果是，则在第二列后添加地区列
        if (tableId === 'WorldRankingTable2024') {
            $row.append($('<td>').text(university.地区));
        }

        // 添加得分列
        $row.append($('<td>').text(university.总体得分));

        // 将新行添加到表格的tbody中
        $tbody.append($row);
    });
}

// 当DOM加载完成后，动态生成表格内容
$(document).ready(function () {
    populateTable(qs2024.slice(0, 1000), 'WorldRankingTable2024');
});

// 动态生成表格内容的通用函数
function populateTableByRegion(region, tableId) {
    var filteredData = qs2024.filter(function (university) {
        return university["地区"] === region;
    });
    var top1000 = filteredData.slice(0, 1000);
    populateTable(top1000, tableId);
}