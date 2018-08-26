initializeFirebase();
document.getElementById('loginModal').addEventListener('click', event => {
  event.preventDefault();
  const loginForm = `<section class="section section-login">
        <div class="valign-wrapper row login-box">
        <div class="col card hoverable m12">
            <form>
            <div class="card-content">
                <span class="card-title">Enter login details</span>
                <div class="row">
                <div class="input-field col s12">
                    <label for="text">User ID</label>
                    <input type="text" class="validate" name="uid" id="userid" />
                </div>
                <div class="input-field col s12">
                    <label for="password">Password </label>
                    <input type="password" class="validate" name="pwd" id="password" />
                </div>
                </div>
            </div>
            <div class="card-action right-align">
                <input class="btn teal waves-effect waves-light" value="Login">
            </div>
            </form>
        </div>
        </div>
      </section>`;
  swal({
    html: loginForm,
    confirmButtonText: 'Cerrar',
    confirmButtonColor: '#F44336',
    backdrop: 'rgba(24, 24, 36, 0.92)'
  });
});