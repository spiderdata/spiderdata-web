$(document).ready(function () {
    $("#post").click(function () {
        var username = $("input#username").val();
        var password = $("input#password").val();
        var email = $("input#email").val();
        var newFriend = {
            "username": username,
            "password": password,
            "email": email
        };
        $.ajax({
            url: userAPIPrefix + "/v1/user",
            type: "POST",
            data: JSON.stringify(newFriend),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log(data["body"]);
                // 跳转到登录页面
                localStorage.setItem('new_signin', true);
                window.location.href = 'login.html';
            },
            error: function (data, textStatus, errorThrown) {
                console.log(data['responseJSON']);
                console.log(textStatus);
                console.log("请求失败：" + errorThrown)
            }
        });
    });
});