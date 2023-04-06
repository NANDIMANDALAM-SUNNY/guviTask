$(document).ready(function() {
  // checking if user already logged or not
  if (document.cookie.indexOf('session_id=') == -1) {
  window.location.href = 'login.html';
}

let email = localStorage.getItem('email');
// setting email 
$('#email').text(email);
$('#nav-email').text(email);

  $("#profile-btn").click(function(){
    // get the form values
    let age = $('#age').val();
    let dob = $('#dob').val();
    let phone = $('#phone').val();
    // afer stroring values in variable we have clear the form
    $('#age').val("")
    $('#dob').val("")
    $('#phone').val("")
    if (age && dob && phone) {
      // console.log('Name:', age,dob,phone);
      // sewnding backend request
      $.ajax({
        url: "./php/profile.php",
        method: "POST",
        data: { age: age, dob: dob, phone: phone ,email:email},
        success: function(response){
          if(response === "Document updated successfully."){
            toastMessage('success','We have updated your detailas',"Success")
          }
          if(response === "Failed to update document."){
            toastMessage('error','Something went wrong,Please try again',"Failed")
          }
        }
  });

    } else {   //form validation
      if (!age) {
        $('#age').addClass('error');
        $('.age-error').text('Please enter your age');
      }
      if (!dob) {
        $('#dob').addClass('error');
        $('.dob-error').text('Please enter your Date of birth');
      }
      if (!phone) {
        $('#phone').addClass('error');
        $('.phone-error').text('Please enter your phone number');
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

// removing the cookie and redirecting
$("#logout-btn").click(function(){
document.cookie = 'session_id=null; max-age=0; path=/;';
window.location.href = 'login.html';

})


});
























$(document).ready(function() {
  $('#submitBtn').click(function(e) {
    e.preventDefault();
    var name = $('#nameInput').val().trim();
    var email = $('#emailInput').val().trim();
    var message = $('#messageInput').val().trim();
    var isError = false;

    switch(true) {
      case (!name):
        $('#nameInput').addClass('border-red');
        isError = true;
        break;
      case (!email):
        $('#emailInput').addClass('border-red');
        isError = true;
        break;
      case (!message):
        $('#messageInput').addClass('border-red');
        isError = true;
        break;
      default:
        // If all fields are filled, submit the form
        $('#contactForm').submit();
    }

    // If any field is missing, show error message
    if (isError) {
      $('#errorMessage').text('Please fill in all required fields.').show();
    }
  });

  // Remove red border when user starts typing
  $('input, textarea').keyup(function() {
    $(this).removeClass('border-red');
    $('#errorMessage').hide();
  });
});
