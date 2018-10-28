$(function() {
    var keyArray = [];
    $('#search-btn').on('tap', function() {
        var keyword = $(this).siblings('input').val().trim();
        if (keyword) {
            keyArray.unshift(keyword);
            localStorage.setItem('keyArray', JSON.stringify(keyArray));
            location.href = "search-result.html?keyword=" + keyword;
        } else {
            alert('请输入搜索关键词')
        }
    })
    if (localStorage.getItem('keyArray')) {
        keyArray = JSON.parse(localStorage.getItem('keyArray'));
        // console.log(keyArray);
        var html = template('searchData', {
            list: keyArray
        });
        // console.log(html);
        $('#searchList').html(html)
    }
    $('#clearHistory').on('tap', function() {
        keyArray = [];
        $('#searchList').html('');
        localStorage.removeItem('keyArray');
    })
})