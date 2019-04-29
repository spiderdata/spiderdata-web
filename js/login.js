$(document).ready(function () {
    $("#get").click(function () {
        var username = $("input#username").val();
        var password = $("input#password").val();
        var data = {
            "username": username,
            "password": password
        };

        var url = userAPIPrefix + "/v1/user/token";

        function login(data) {
            var status = data['status'];
            var body = data['body'];
            var errInfo = $('#errInfo');

            if (status === 10001) {
                // 登录成功
                // 将用户名及token缓存到本地
                localStorage.setItem('user', body['username']);
                localStorage.setItem('token', body['token']);
                localStorage.setItem('logined', true);
                if (localStorage.new_signin === 'true') {
                    localStorage.setItem('new_signin', false);
                    history.go(-2);
                } else if (document.referrer === '') {
                    location.href = 'index.html';
                } else {
                    history.go(-1);
                }
            } else if (status === 10004) {
                // 用户不存在
                errInfo.html('用户不存在')
            } else if (status === 10005) {
                // 密码错误
                errInfo.html('密码错误')
            } else if (status === 10006) {
                // token 获取失败
                errInfo.html('token 获取失败')
            } else {
                // 未知错误
                errInfo.html('未知错误，请求联系管理员')
            }
        }

        postURL(url, data, login);
    });
});