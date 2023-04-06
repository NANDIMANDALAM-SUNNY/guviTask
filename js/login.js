$(document).ready(function() {
  $("#login-btn").click(function(){
    
    let email = $("#email").val();
    let password = $("#password").val();

    if(email && password){
      $.ajax({
        url: './php/login.php',
        method: 'POST',
        data: { email: email, password: password },
        success: function(response) {
          // console.log(response)
          if(response === "Invalid password."){
            toastMessage('error','Please try Again',"Wrong Credentials")
          }
          if(response === "User not found."){
            toastMessage('warning','Please Check your credentials',"User not found",)
          }
          if(response === "success"){
            toastMessage('success','GUVI welcomes you',"Success",)
              localStorage.setItem('email', email);  
              setTimeout(()=>{
                window.location.href = 'profile.html';
              },2000)
          }
        }
      })
    }
      else{
        // displaying error messages
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