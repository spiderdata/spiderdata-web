/**
 * Created by Doublestar on 2017/10/1.
 */
$(document).ready(function(){   //在HTML文档加载完成后执行
    //GET方法
    $("#get").click(function(){ //HTML中id为get的HTML标签的点击动作
        $.ajax({
            url:'http://127.0.0.1:5000/api/user/login',    //请求的URL地址
            type:'GET', //请求方法，GET、POST、PUT、DELETE在这里设置
            timeout:5000,    //超时时间
            dataType:'text',    //返回的数据格式：json/xml/html/script/jsonp/text
            success:function(data,textStatus,jqXHR){    //成功的回调函数
                $("#result").html(data) //设置id为result的标签的html内容为返回的data数据
            },
            error:function(xhr,textStatus){ //失败的回调函数
                $("#result").html(textStatus)
            }
        })
    })
//POST方法
    $("#post").click(function(){
        $.ajax({
            url:"http://127.0.0.1:5000/api/user/register",
            type:'POST', //请求方法，GET、POST、PUT、DELETE在这里设置
            timeout:5000,    //超时时间
            dataType:'text',    //返回的数据格式：json/xml/html/script/jsonp/text
            success:function(data,textStatus,jqXHR){
                $("#result").html(data)
            },
            error:function(xhr,textStatus){
                $("#result").html(textStatus)
            }
        })
    })
//PUT方法
    $("#put").click(function(){
        $.ajax({
            url:'http://localhost:8080/product/1/?name=测试PUT&age=22',
            type:'PUT', //请求方法，GET、POST、PUT、DELETE在这里设置
            timeout:5000,    //超时时间
            dataType:'text',    //返回的数据格式：json/xml/html/script/jsonp/text
            success:function(data,textStatus,jqXHR){
                $("#result").html(data)
            },
            error:function(xhr,textStatus){
                $("#result").html(textStatus)
            }
        })
    })
//DELETE方法
    $("#delete").click(function(){
        $.ajax({
            url:'http://localhost:8080/product/1',
            type:'DELETE', //请求方法，GET、POST、PUT、DELETE在这里设置
            timeout:5000,    //超时时间
            dataType:'text',    //返回的数据格式：json/xml/html/script/jsonp/text
            success:function(data,textStatus,jqXHR){
                $("#result").html(data)
            },
            error:function(xhr,textStatus){
                $("#result").html(textStatus)
            }
        })
    })

})