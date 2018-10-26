$(function() {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // 进行第一分类页面的渲染
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        success: function(response) {
            var html = template('lef_data', response);
            console.log(html);
            console.log(response);
            $('#list-data').html(html);
            //第一个a加上active样式
            $('#list-data>a').eq(0).addClass('active');
            //获取第一个brand的id
            var id = response.rows[0].id;
            getCategoryData(id);
        }
    });
    //进行第二分类页面的渲染
    $('#list-data').on('click', 'a', function() {
        var id = $(this).data('id');
        $(this).addClass('active').siblings().removeClass('active');
        getCategoryData(id);

    });

    function getCategoryData(id) {
        $.ajax({
            url: '/category/querySecondCategory',
            type: 'get',
            data: {
                id: id
            },
            success: function(response) {
                var html = template('brand-data', response);
                console.log(html);
                $('#right-data').html(html);
            }
        });
    }
});