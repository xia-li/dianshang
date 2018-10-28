$(function () {
    var price = 1;
    var page = 1;
    var pageSize = 3;
    var keyword = getParamsByUrl(location.href, 'keyword');
    var html = '';
    var This = null;
    mui.init({
        pullRefresh: {
            container: '#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: true,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
    $('#price-sort').on('tap', function () {
        price = price == 1 ? 2 : 1;
        html = '';
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    })

    function getData() {
        if(!This) {
            This = this
        };
        $.ajax({
            url: '/product/queryProduct',
            type: 'get',
            data: {
                page: page++,
                pageSize: pageSize,
                proName: keyword,
                price: price
            },
            success: function (res) {
                if (res.data.length > 0) {
                    html += template('search-result', res);
                    $('#search-list').html(html);
                    This.endPullupToRefresh(false);

                } else {
                    This.endPullupToRefresh(true);
                }
            }
        })
    }
})
