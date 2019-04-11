$(document).ready(function () {
    $("#get").click(function () {
        var username = $("input#username").val();
        var password = $("input#password").val();
        var newFriend = {
            "username": username,
            "password": password
        };
        $.ajax({
            url: userAPIPrefix + "/v1/user/token",
            type: "POST",
            data: JSON.stringify(newFriend),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log(data["body"]);
                // $("#name").append($("<h1>" + data["body"].username + "</h1>"))
                // 将用户名及token缓存到本地
                localStorage.setItem('user', data['body']['username']);
                localStorage.setItem('token', data['body']['token']);
                localStorage.setItem('logined', true);
                if (localStorage.new_signin === 'true') {
                    localStorage.setItem('new_signin', false);
                    history.go(-2);
                } else {
                    history.go(-1);
                }
            },
            error: function (data, textStatus, errorThrown) {
                console.log(data['responseJSON']);
                console.log(textStatus);
                console.log("请求失败：" + errorThrown)
            }
        })
    });
});