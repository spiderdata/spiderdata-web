$(function () {
    updateTop();

    // 获取用户登录状态
    var isLogined = (localStorage.getItem('logined') === 'true') ? true : false;
    // 获取搜索按钮对象
    var searchBtn = $($('#top_select .searchBtn')[0]);
    // 获取锁锁框对象
    var searchInput = $($('#top_select .searchInput')[0]);
    // 获取 搜索结果展示 urls 对象
    var urls = $('#urls');
    // 获取 右侧用户列表面板对象
    var userListPanel = $('#userList');
    // 获取 右侧的用户列表对象
    var userList = $($('#userList .list')[0]);

    // 处理搜索按钮点击事件
    searchBtn.on('click', function () {
        // 调服务器接口，获取搜索结果
        var token = localStorage.getItem('token');
        var searchKey = searchInput.val();
        // 关键词为空时直接返回
        if (!searchKey) return;

        var url = dataAPIPrefix + "/v1/search_post";
        var data = {
            "search_key": searchKey,
            "limit": 20,
            "token": token ? token : ''
        };

        function refreshPage(data) {
            var posts = data['body']['posts'];
            var user_list = data['body']['user_list'];

            // 将查询到的结果添加到页面中
            urls.html('');
            for (var i in posts) {
                var line = '<a href="' + posts[i]['url'] + '">' + posts[i]['title'] + '</a><br>';
                urls.html(urls.html() + line);
            }

            // 将搜索过相同关键字的用户列表添加到页面中
            userList.html('');
            for (var i in user_list) {
                // console.log(user_list[i]);
                var line = '<div class="user">' + user_list[i] + '</div>';
                userList.html(userList.html() + line);
            }
            refreshUserListListener();
            refreshUserListPanel();
        }

        postURL(url, data, refreshPage);
    });

    // 刷新用户列表监听器
    function refreshUserListListener() {
        var users = $('#userList .user');
        // 处理一对一聊天事件
        users.on('click', function () {
            var url = 'chat.html?p_user=' + $(this).html();
            window.open(url)
        });
    }

    // 刷新用户列表面板
    function refreshUserListPanel() {
        if (isLogined && userList.html()) {
            // 用户登录并且有搜索过相同关键词的用户时显示用户列表面板
            userListPanel.css('display', 'block');
        } else {
            // 用户未登录时隐藏用户列表面板
            userListPanel.css('display', 'none');
        }
    }
});

