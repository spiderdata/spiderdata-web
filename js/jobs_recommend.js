$(function () {
    // 当前页面需要登录状态，如果未登录，返回首页
    if (localStorage.getItem('logined') === 'false') {
        window.location.href = 'index.html'
    }

    // 刷新顶部链接
    updateTop();

    // 刷新用户技能列表
    refreshUserSkill();

    // 定义通用变量
    var userSkillList = [];

    // 获取页面对象
    var skills = $('#skills');
    var recommendBtn = $('#button_jobs_recommend button');
    var jobRecommend = $('#suitable_position a');

    // 处理推荐按钮点击事件
    recommendBtn.click(function () {
        var url = dataAPIPrefix + '/v1/job_recommend';
        var data = {
            'skill': userSkillList
        };
        postURL(url, data, function (data) {
            var jobName = data['job']['job_name'];
            var jobUrl = data['job']['job_url'];
            console.log(data['job']);
            jobRecommend.html(jobName).attr('href', jobUrl);
        });
    });

    function refreshUserSkill() {
        var url = userAPIPrefix + '/v1/user/skill';
        getURL(url, GetDataFromServer);
    }

    function GetDataFromServer(data) {
        userSkillList = data['skill'];
        // 将用户技能列表展示在页面上
        for (i in userSkillList) {
            skills.html(skills.html() + '<p>' + userSkillList[i] + '</p>');
        }
    }
});