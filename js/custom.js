var response = ''
var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
var regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
var regPhoneNumber = /^\d{10}$/
function validate() {
      var hasError = false
      var name = document.getElementById('client_name').value
      if(!regName.test(name)) {
        document.getElementById('name_check').innerHTML = "Please provide valid name";
        hasError = true;
      } else {
         document.getElementById('name_check').innerHTML = "";
      }
      var email = document.getElementById('client_email').value
      if(!regEmail.test(email)) {
        document.getElementById('email_check').innerHTML = "Please provide valid mail";
        hasError = true;
      } else {
        document.getElementById('email_check').innerHTML = "";
      }
      var phone_number = document.getElementById('client_phone_number').value
      if(!regPhoneNumber.test(phone_number)) {
        document.getElementById('phone_number_check').innerHTML = "Please provide valid phone number";
        hasError = true;
      } else {
        document.getElementById('phone_number_check').innerHTML = "";
      }
      var service_type = document.getElementById('service_type').value
      if(service_type == 'default') {
        document.getElementById('service_type_check').innerHTML = "Please select service type";
        hasError = true;
      } else {
        document.getElementById('service_type_check').innerHTML = "";
      }
      if(!hasError) sendEmail();
}
async function sendEmail() {
  var body= "Name: " + document.getElementById('client_name').value + "\n" + "Email: " + document.getElementById('client_email').value + "\nPhone Number: " + document.getElementById('client_phone_number').value + "\nService Type: " + document.getElementById('service_type').value;
  axios.post('https://sevenpence.herokuapp.com/send-email', {
      name: document.getElementById('client_name').value,
      email: document.getElementById('client_email').value,
      phone_number: document.getElementById('client_phone_number').value,
      service_type: document.getElementById('service_type').value
  }).then((res) => {
    if(res.status == 200)
        document.getElementById('response_span').innerHTML = "Thank You! You've been registered successfully. We'll connect with you shortly.";
    else 
        document.getElementById('response_span').innerHTML = "Oops! Problem Occured. Please try again.";
    clearForm();
    setTimeout(() => document.getElementById('response_span').innerHTML = "", 2000);
  }).catch((res) => {

  });
}

function clearForm() {
  document.getElementById('client_name').value = "",
  document.getElementById('client_email').value = "",
  document.getElementById('client_phone_number').value = "",
  document.getElementById('service_type').value = "default"
}

function onSubmit() {
    return false;
}

function registerEmail() {
  var email = document.getElementById('EMAIL').value
      if(!regEmail.test(email)) {
        document.getElementById('email_check').innerHTML = "Please provide valid mail";
        return
      } else {
                 axios.post('https://sevenpence.herokuapp.com/register_email', {
                      email: email,
                }).then((res) => {
                     if(res.status == 201)
                        document.getElementById('newsletter_span').innerHTML = "Thank You! You've been registered successfully";
                     else 
                       document.getElementById('newsletter_span').innerHTML = "Oops! Problem Occured. Please try again.";
                      setTimeout(() => document.getElementById('newsletter_span').innerHTML = "", 2000);
                    }).catch((res) => {
                      alert('Problem')
                   });
          return false;
      }
}
