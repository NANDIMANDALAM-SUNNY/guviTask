$(document).ready(function(){
		$("#register-btn").click(function(){
			let username = $("#username").val();
			let email = $("#email").val();
			let password = $("#password").val();
			if(username && email && password){
			// console.log(username,email,password)
			let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				toastMessage('warning','',"Please Enter valid Email Address",)
			  } 
			else{
				$.ajax({
					url: "./php/register.php",
					method: "POST",
					data: { username: username, email: email, password: password },
					success: function(response){
						if(response === "This email address is already registered"){
							toastMessage('warning','Please use different email address',"This Email address is already used",)
						}
						if(response === "Registration successful"){
							toastMessage('success','Please Login',"Successfully Registered",)
							setTimeout(()=>{
								window.location.href = 'login.html';
							  },2000)
						}
					}
				});
			}
		}

		else{
			 // displaying error messages
			 if(!username){
				$('#username').addClass('error')
				$('.username-error').text('Please enter your username \u26A0\ufe0f');
			 }
			 if(!email){
				$('#email').addClass('error')
				$('.email-error').text('Please enter your email \u26A0\ufe0f');
			  }
			  if(!password){
				$('#password').addClass('error')
				$('.password-error').text('Please enter your password \u26A0\ufe0f');
			  }
		}



		});


		// remove classs if user giving input fields
		$('input').on('input', function(event) {
			$(event.target).removeClass('error');
			$(event.target).next('div').text('');
		  });




		  // toast message type defining
const toastMessage = (type,body,messgae)=>{
	toastr[`${type}`](`${body}`, `${messgae}`,{
	  "closeButton": true,
	  "debug": true,
	  "newestOnTop": false,
	  "progressBar": true,
	  "positionClass": "toast-top-right",
	  "preventDuplicates": false,
	  "onclick": null,
	  "showDuration": "300",
	  "hideDuration": "1000",
	  "timeOut": "5000",
	  "extendedTimeOut": "1000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	})
	
	
  }
	  
	});