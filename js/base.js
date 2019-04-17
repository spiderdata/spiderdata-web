var userAPIPrefix = 'http://127.0.0.1:7070';
var chatAPIPrefix = 'ws://127.0.0.1:7071';
var dataAPIPrefix = 'http://127.0.0.1:7072';

// GET 方法调用后端接口
function getURL(url, callback) {
    var token = 'Token ' + localStorage.getItem('token');
    $.ajax({
        url: url,
        headers: {"Authorization": token},
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            console.log('getURL: ', url, ' result: ', data);
            callback(data['body']);
        },
        error: function (data, textStatus, errorThrown) {
            console.log(data['responseJSON']);
            console.log(textStatus);
            console.log("请求失败：" + errorThrown);
        }
    });
}

// POST 方法调用后端接口
function postURL(url, data, callback) {
    var token = 'Token ' + localStorage.getItem('token');
    $.ajax({
        url: url,
        headers: {"Authorization": token},
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log('postURL: ', url, ' result: ', data);
            // callback(data['body']);
            callback(data);
        },
        error: function (data, textStatus, errorThrown) {
            console.log(data['responseJSON']);
            console.log(textStatus);
            console.log("请求失败：" + errorThrown);
            callback(data['responseJSON']);
        }
    });
}

// PUT 方法调用后端接口
function putURL(url, data, callback) {
    var token = 'Token ' + localStorage.getItem('token');
    $.ajax({
        url: url,
        headers: {"Authorization": token},
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log('putURL: ', url, ' result: ', data);
            callback(data['body']);
        },
        error: function (data, textStatus, errorThrown) {
            console.log(data['responseJSON']);
            console.log(textStatus);
            console.log("请求失败：" + errorThrown);
        }
    });
}

// 刷新右上角登录状态
function updateTop() {
    // 获取登录状态
    var logined = localStorage.getItem('logined');

    // 获取用户名展示标签
    var userLabel = $('#top .userLabel');

    // 获取超链接对象
    var left = $('#top .left');
    var right = $('#top .right');

    // 根据登录状态修改右上角超链接
    if (logined === 'true') {
        // 在用户名标签展示当前登录的用户名
        var userName = localStorage.getItem('user');
        userLabel.html('欢迎 ' + userName);
        // 用户登录后将链接修改为 <个人中心> 和 <退出>
        left.attr('href', 'user_center.html').text('个人中心');
        right.attr('href', 'javascript:void(0)').text('退出');
    } else {
        // 用户未登录时将链接修改为 <登录> 和 <注册>
        left.attr('href', 'login.html').text('登录');
        right.attr('href', 'sign_in.html').text('注册');
    }
}

// 监听退出事件
$(function () {
    var right = $('#top .right');
    right.on('click', function () {
        if (right.text() === '退出') {
            localStorage.setItem('logined', false);
            location.reload();
            // TODO: 判断当前页面是否需要登录，如果需要，则返回首页
        }
    });
});