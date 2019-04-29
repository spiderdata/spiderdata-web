$(document).ready(function(){ 
	$("#post").click(function(){
		var username = $("input#username").val();
		var password = $("input#password").val();
		var birthday = $("input#birthday").val();
		var emai =$("input#email").val();
		var newFriend = { "username":username,
		                  "password":password,
		                  "birthday":birthday,
		                  "emai":emai
		}
		$.ajax({
	            url: "http://127.0.0.1:5000/v1/users",
   	    headers:{"Authorization": "Token 069e68e8-720e-48f3-9029-74cd048c5d54"},
	    type: "POST",
	    data: JSON.stringify(newFriend),
	    contentType: "application/json",
	    dataType: "json",
	    success: function(data){
	        console.log(data["body"])
	
	    },
		    error: function(data,textStatus,errorThrown){
		    	console.log(data['responseJSON'])
		    	console.log(textStatus)
		        console.log("请求失败："+errorThrown)
		    }
	    })
    })
	$("#get").click(function(){
		var username = $("input#username").val();
		var password = $("input#password").val();
		var newFriend = { "username":username,
		                  "password":password          
		}
		$.ajax({
	            url: "http://127.0.0.1:5000/v1/auth/tokens",
	    type: "POST",
	    data: JSON.stringify(newFriend),
	    contentType: "application/json",
	    dataType: "json",
	    success: function(data){
	        console.log(data["body"])
	        $("#name").append($("<h1>"+data["body"].username+"</h1>"))	
	    },
		    error: function(data,textStatus,errorThrown){
		        console.log(data['responseJSON'])
		    	console.log(textStatus)
		        console.log("请求失败："+errorThrown)
		    }
	    })
    })
})