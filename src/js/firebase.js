window.initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyDMXIdPenAJ46ZGLKEL02orm0c5SHOmESc',
    authDomain: 'timetoseriesandmovies.firebaseapp.com',
    databaseURL: 'https://timetoseriesandmovies.firebaseio.com',
    projectId: 'timetoseriesandmovies',
    storageBucket: 'timetoseriesandmovies.appspot.com',
    messagingSenderId: '368192200809'
  });
};

// Ingreso con correo y contraseña
window.loginWithEmailAndPassword = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      location.href = ('userView.html'); // es para redireccionar a la vista de usuario
    })
    .catch(error => {
      let errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        swal({
          confirmButtonText: 'Ok',
          type: 'error',
          title: 'Invalid password',
          text: 'Try again'
        });
      } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-email') {
        swal({
          confirmButtonText: 'Aceptar',
          type: 'error',
          title: 'Invalid email address',
          text: 'Try again'
        });
      }
    });
};

// Ingreso con correo de Google
window.loginWithGoogle = () => {
  // Comprueba que el usuario no haya ingresado antes, que no tenga una sesión activa.
  if (!firebase.auth().currentUser) {
    // Crear un nuevo objeto para realizar la conexión con la API de google
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    getPopUpForAccount(provider);
  } else {
    firebase.auth().signOut();
  }
};

// Ingreso con correo de facebook
window.loginWithFacebook = () => {
  // Comprueba que el usaurio no haya ingresado antes, que no tenga una sesión activa.
  if (!firebase.auth().currentUser) {
    // Crear un nuevo objeto para realizar la conexión con la API de Facebook
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    getPopUpForAccount(provider);
  } else {
    firebase.auth().signOut();
  }
};

window.loginWithGitHub = () => {
  if (!firebase.auth().currentUser) {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    getPopUpForAccount(provider);
  } else {
    firebase.auth().signOut();
  }
};

window.getPopUpForAccount = (provider) => {
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      location.href = ('userView.html');
    // Errores en la conexión
    }).catch(error => {
      const errorCode = error.code;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        swal({
          confirmButtonText: 'Ok',
          type: 'error',
          title: 'Email address already in use',
          text: 'Try again'
        });
      }
    });
};

window.createNewAccount = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = firebase.auth().currentUser;
      user.sendEmailVerification()
        .then(() => {
          swal({
            confirmButtonText: 'Ok',
            type: 'success',
            title: 'A verification email has been sent to your email address',
            text: 'Follow the instructions'
          }).then((result) => {
            if (result.value) {
              signOut();
            }
          });
        }).catch(error => {
          console.log('Error', error);
        });
    })
    .catch(error => {
      let errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        swal({
          confirmButtonText: 'Ok',
          type: 'error',
          title: 'Invalid email address',
          text: 'Try again'
        });
      } else if (errorCode === 'auth/weak-password') {
        swal({
          confirmButtonText: 'Ok',
          type: 'error',
          title: 'Invalid password',
          text: 'Try again'
        });
      } else if (errorCode === 'auth/email-already-in-use') {
        swal({
          confirmButtonText: 'Ok',
          type: 'error',
          title: 'Email address already in use',
          text: 'Try again'
        });
      }
    });
};

// Cerrar sesión
window.signOut = () => {
  firebase.auth().signOut()
    .then(() => {
      console.log('salio');
      location.href = ('index.html');
    }).catch(error => {
      console.log('Error', error);
    });
};
