initializeFirebase();
document.getElementById('loginModal').addEventListener('click', event => {
  event.preventDefault();
  const loginForm = `<section class="section section-login mb-0">
        <div class="valign-wrapper row login-box mb-0">
        <div class="col card card-no-border m12 mb-0">
        <div class="card-image">
        <div class="col offset-s1 s10">
            <img class="login-img mx-auto" src="img/user-default.png">
          </div>
        </div>
            <div class="card-content">
                <span class="card-title">Enter your login details</span>
                <div class="row">
                <div class="input-field col s12">
                    <label for="userEmail">Email </label>
                    <input type="text" class="validate" id="user-email"/>
                </div>
                <div class="input-field col s12">
                    <label for="userpassword">Password </label>
                    <input type="password" class="validate" id="user-password"/>
                </div>
                <button id="login-button" class="btn red waves-effect waves-light">Login</button>
                </div></div>
            <div class="card-action center-align">
                <span>Login with your social media account</span>
                <div class="mt-3">
                    <button  id="loginFacebook" class="waves-effect waves-light facebook btn"><i class="fab fa-facebook-square"></i></button>
                    <button  id="loginGithub" class="waves-effect waves-light btn github"><i class="fab fa-github"></i></button>
                    <button id="loginGoogle" class="waves-effect waves-light btn google"><i class="fab fa-google"></i></button>
                </div></div></div></div></section>`;
  swal({
    html: loginForm,
    showConfirmButton: false,
    showCloseButton: true
  });

  document.getElementById('login-button').addEventListener('click', event => {
    event.preventDefault();
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    loginWithEmailAndPassword(email, password);
  });

  document.getElementById('loginFacebook').addEventListener('click', event => {
    event.preventDefault();
    loginWithFacebook();
  });

  document.getElementById('loginGithub').addEventListener('click', event => {
    event.preventDefault();
    loginWithGitHub();
  });

  document.getElementById('loginGoogle').addEventListener('click', event => {
    event.preventDefault();
    loginWithGoogle();
  });
});

