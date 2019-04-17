$(function () {
    // 当前页面需要登录状态，如果未登录，返回首页
    if (localStorage.getItem('logined') === 'false') {
        window.location.href = 'index.html'
    }

    // 刷新顶部链接
    updateTop();

    // 左侧导航 ------------------------------------------------

    // 获取导航标签对象及右侧面板对象
    var navUserInfo = $('#main>.left .navUserInfo');
    var userInfoPanel = $('#userInfo');
    var navUserSkill = $('#main>.left .navUserSkill');
    var userSkillPanel = $('#userSkill');
    var navUserMsg = $('#main>.left .navUserMsg');
    var userMsgPanel = $('#userMsg');
    var panelList = [userInfoPanel, userSkillPanel, userMsgPanel];

    // 处理 个人信息 点击事件
    navUserInfo.click(showUserInfo);

    // 处理 我的技能 点击事件
    navUserSkill.click(showUserSkill);

    // 处理 站内信 点击事件
    navUserMsg.click(showUserMsg);

    function showUserInfo() {
        console.log('个人信息页面');
        switchPanel(userInfoPanel);
        refreshUserInfo();
    }

    function showUserSkill() {
        console.log('我的技能页面');
        switchPanel(userSkillPanel);
        refreshUserSkill();
    }

    function showUserMsg() {
        console.log('站内信页面');
        switchPanel(userMsgPanel);
        refreshUserMsg();
    }

    // 切换显示的面板，显示 topPanel，隐藏其它的面板
    function switchPanel(topPanel) {
        for (var i in panelList) {
            if (panelList[i] === topPanel) {
                panelList[i].css('display', 'block')
            } else {
                panelList[i].css('display', 'none')
            }
        }
    }

    // 个人信息 页面 --------------------------------------------

    // 定义通用变量
    var uBirthdayValue = null;
    var uWorkStartValue = null;
    var uEducationValue = null;
    var uCityValue = null;
    // refreshUserInfo();

    // 获取页面对象
    var uName = $('#userInfo .uName .right');
    var uEmail = $('#userInfo .uEmail .right');
    var uAgeLabel = $('#userInfo .uAge .left');
    var uAge = $('#userInfo .uAge .right');
    var uWorkYearsLabel = $('#userInfo .uWorkYears .left');
    var uWorkYears = $('#userInfo .uWorkYears .right');
    var uEducation = $('#userInfo .uEducation .right');
    var uCity = $('#userInfo .uCity .right');

    var leftBtn = $('#userInfo .btnLeft');
    var rightBtn = $('#userInfo .btnRight');

    leftBtn.click(function () {
        if (leftBtn.html() === '修改') {
            leftBtn.html('保存');

            uAgeLabel.html('生日：');
            uAge.html('<input type="date" style="width: 169px;">');
            uAge.children('input').val(uBirthdayValue);
            uWorkYearsLabel.html('参加工作时间：');
            uWorkYears.html('<input type="date" style="width: 169px;">');
            uWorkYears.children('input').val(uWorkStartValue);
            uEducation.html(generateEducationList());
            uEducation.children('select').val(uEducationValue);
            uCity.html('<input type="text">');
            uCity.children('input').val(uCityValue);
        } else {
            console.log('保存');
            leftBtn.html('修改');
            var birthday = uAge.children('input').val();
            var workstart = uWorkYears.children('input').val();
            // var education = uEducation.children('input').val();
            var education = uEducation.children('select').val();
            var city = uCity.children('input').val();
            updateUserInfo(birthday, workstart, education, city);
            // refreshUserInfo();
        }
    });

    rightBtn.click(function () {
        console.log('取消');
        refreshUserInfo();
        leftBtn.html('修改');
    });

    // 生成学历下拉菜单
    function generateEducationList() {
        var list = '<select>' +
            '<option>博士</option>' +
            '<option>硕士</option>' +
            '<option>本科</option>' +
            '<option>大专</option>' +
            '<option>高中</option>' +
            '<option selected>初中</option>' +
            '<option>小学</option>' +
            '</select>';
        return list
    }

    // 将用户信息提交到服务器
    function updateUserInfo(birthday, workstart, education, city) {
        var url = userAPIPrefix + "/v1/user/profile";
        var data = {
            'birthday': birthday,
            'work_start': workstart,
            'education': education,
            'work_city': city
        };
        putURL(url, data, refreshUserInfo);
    }

    // 从后台获取用户信息，展示在页面上
    function refreshUserInfo() {
        var token = 'Token ' + localStorage.getItem('token');
        $.ajax({
            url: userAPIPrefix + "/v1/user/profile",
            headers: {"Authorization": token},
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                var userProfile = data['body']['user_profile'];

                uBirthdayValue = userProfile['birthday'];
                var uAgeValue = getYearsFromDate(uBirthdayValue);
                uWorkStartValue = userProfile['work_start'];
                var uWorkYearsValue = getYearsFromDate(uWorkStartValue);
                uEducationValue = userProfile['education'];
                uCityValue = userProfile['work_city'];

                uName.html('<p>' + userProfile['username'] + '</p>');
                uEmail.html('<p>' + userProfile['email'] + '</p>');
                uAgeLabel.html('年龄：');
                uAge.html('<p>' + uAgeValue + '</p>');
                uWorkYearsLabel.html('工作年限：');
                uWorkYears.html('<p>' + uWorkYearsValue + '</p>');
                uEducation.html('<p>' + userProfile['education'] + '</p>');
                uCity.html('<p>' + userProfile['work_city'] + '</p>');
            },
            error: function (data, textStatus, errorThrown) {
                console.log(data['responseJSON']);
                console.log(textStatus);
                console.log("请求失败：" + errorThrown);
            }
        })
    }

    // 计算当前时间距离指定时间之间的年数
    // date 格式 YYYY-MM-DD HH:MM:SS
    function getYearsFromDate(date) {
        var years = (new Date()).getFullYear() - (new Date(date)).getFullYear();
        return years
    }

    // 我的技能 页面 --------------------------------------------

    // 定义通用变量
    var userSkillList = [];

    // 获取页面对象
    var skills = $('#userSkill .skills span');

    var usLeftBtn = $('#userSkill .btnLeft');
    var usRightBtn = $('#userSkill .btnRight');

    usLeftBtn.click(function () {
        if (usLeftBtn.html() === '修改') {
            usLeftBtn.html('保存');
            // 为所有的技能标签添加点击事件
            for (var i = 0; i < skills.length; i ++) {
                skills[i].addEventListener('click', handleSkillClickEvent);
            }
        } else {
            updateUserSkill();
            console.log('保存');
            usLeftBtn.html('修改');
            // 删除技能标签上的监听器
            for (var i = 0; i < skills.length; i ++) {
                skills[i].removeEventListener('click', handleSkillClickEvent);
            }
        }
    });

    usRightBtn.click(function () {
        console.log('取消');
        usLeftBtn.html('修改');
        // 删除技能标签上的监听器
        for (var i = 0; i < skills.length; i ++) {
            skills[i].removeEventListener('click', handleSkillClickEvent);
        }
        refreshUserSkill();
    });

    // 处理技能标签点击事件
    function handleSkillClickEvent() {
        obj = $(this);
        if (userSkillList.includes(obj.html())) {
            // 获取点击的标签在用户技能列表中的索引
            var index = userSkillList.indexOf(obj.html());
            // 将用户点击的标签从技能列表中删除
            userSkillList.splice(index, 1);
            // 修改标签背景色为未选中状态
            obj.css('background-color', 'lightgray');
        } else {
            // 将点击的标签对应的技能添加到用户技能列表中
            userSkillList.push(obj.html());
            // 修改标签背景色为选中状态
            obj.css('background-color', 'green');
        }
    }

    function updateUserSkill() {
        var url = userAPIPrefix + '/v1/user/skill';
        var data = {
            'skill': userSkillList
        };
        putURL(url, data, refreshUserSkill);
    }

    function refreshUserSkill() {
        var url = userAPIPrefix + '/v1/user/skill';
        getURL(url, usGetDataFromServer);
    }

    function usGetDataFromServer(data) {
        userSkillList = data['skill'];
        for (var i = 0; i < skills.length; i ++) {
            var obj = $(skills[i]);
            if (userSkillList.includes(obj.html())) {
                obj.css('background-color', 'green')
            } else {
                obj.css('background-color', 'lightgray');
            }
        }
    }

    // 站内信 页面 ----------------------------------------------

    // 定义通用变量
    var currentPage = 0;
    var limit = 8;

    // 获取页面对象
    var msgsPanel = $('#userMsg .msgs');
    var msLeftBtn = $('#userMsg .btnLeft');
    var msRightBtn = $('#userMsg .btnRight');

    msLeftBtn.click(function () {
        if (currentPage > 0) currentPage --;
        refreshUserMsg();
    });

    msRightBtn.click(function () {
        currentPage ++;
        refreshUserMsg();
    });

    function handleMsgClickEvent() {
        var contentDetail = $(this).children('div').eq(1).children('p').eq(2);
        if ($(this).prop('extended')) {
            console.log('收起');
            $(this).prop('extended', false);
            $(this).css('height', '30px');
            contentDetail.css('display', 'none');
            refreshUserMsg();
        } else {
            console.log('展开');
            $(this).prop('extended', true);
            $(this).css('height', '100px');
            contentDetail.css('display', 'block');
            // 调用后端接口，更新状态为已读
            var msgid = $(this).attr('msgid');
            updateUserMsg(msgid);
        }
    }

    function updateUserMsg(msgid) {
        var url = userAPIPrefix + '/v1/user/messages';
        var data = {
            'id': msgid
        };
        putURL(url, data, function () {});
    }

    function refreshUserMsg() {
        var url = userAPIPrefix + '/v1/user/messages';
        var data = {
            'limit': limit,
            'page': currentPage
        };
        postURL(url, data, msGetDataFromServer);
    }

    function msGetDataFromServer(data) {
        var messages = data['body']['messages'];

        if (messages.length) {
            // 消息列表不为空的时候清空面板
            msgsPanel.html('');
        } else {
            // 消息列表为空时直接返回，不做任何更新
            // 页面没有刷新，更新当前所在页面变量
            currentPage --;
            return
        }
        for (var i in messages) {
            var m = messages[i];
            var title = m['title'];
            var msgDetail = m['content'];
            var hasRead = m['has_read'];
            var msgID = m['id'];
            var time = m['create_time'];
            msgsPanel.html(msgsPanel.html() + generateMsgPanel(title, msgDetail, hasRead, msgID, time));
        }

        var msg = $('#userMsg .msg');
        msg.prop('extended', false);
        msg.click(handleMsgClickEvent);
    }

    function generateMsgPanel(title, msgDetail, hasRead, msgID, time) {
        var style = !hasRead ? 'style="background-color: red"' : '';
        var msgid = 'msgid=' + msgID;
        var msgPanel = '<div class="msg"' +
            msgid +
            '><div class="status"' +
            style +
            '></div><div class="content"><p>' +
            title +
            '</p><p class="time">' +
            time +
            '</p><p>' +
            msgDetail +
            '</p></div></div>';

        return msgPanel;
    };
});