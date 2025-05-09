document.addEventListener("DOMContentLoaded", () => {
  // Check if user is authenticated
  fetch('/check-auth')
    .then(res => res.json())
    .then(data => {
      if (data.loggedIn) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('profile-section').style.display = 'block';
        document.getElementById('username').innerText = data.username;
      } else {
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('profile-section').style.display = 'none';
      }
    });

  const registerlink = document.getElementById("registerlink");
  registerlink.addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
  });
});

function logout() {
  fetch('/logout')
    .then(() => location.reload());
}

function editpass() {
document.getElementById("editpass").style.display = "block";
document.getElementById("editusername").style.display = "none";
}

function editusername() {
document.getElementById("editusername").style.display = "block";
document.getElementById("editpass").style.display = "none";
}
document.getElementById("btnback1").onclick = function () {
 window.history.back();
}
function goBack() {
  if (document.referrer && document.referrer !== window.location.href) {
    window.location.href = document.referrer;
  } else {
    window.location.href = 'index.html'; 
  }
}