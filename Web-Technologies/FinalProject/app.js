$('[data-fancybox="images"]').fancybox({
    buttons: ["share", "thumbs", "close"]
});

$(function() {
    //create instance
    $('.chart').easyPieChart({
        size: 140,
        animate: 2000,
        lineCap: 'butt',
        scaleColor: false,
        barColor: '#FF5252',
        trackColor: '#000',
        lineWidth: 10
    });
});

$('.portfolio-btn').click(function() {
    var item = $(this).data("filter");
    if (item === ".all") {
        $('.portfolio-card').each(function(index) {
            $(this).parent().show();
        })
    } else {
        $('.portfolio-card').filter(function(index) {
            if ($(this).data("filter") !== item) {
                $(this).parent().css('display', 'none');
            } else {
                $(this).parent().show();
            }
        })
    }
})

new WOW().init();