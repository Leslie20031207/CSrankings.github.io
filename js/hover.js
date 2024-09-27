document.addEventListener('DOMContentLoaded', function() {
    var divTitle = document.getElementById('divTitle3');
    var tooltip = document.getElementById('tooltip3');

    divTitle.addEventListener('mouseover', function(event) {
        tooltip.style.display = 'block';
        tooltip.style.left = event.pageX + 'px';
        tooltip.style.top = event.pageY + 'px';
    });

    divTitle.addEventListener('mouseout', function() {
        tooltip.style.display = 'none';
    });
});