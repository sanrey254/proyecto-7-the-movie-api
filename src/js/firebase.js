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
      location.href = ('views/userView.html'); // es para redireccionar al muro
    })
    .catch(error => {
      let errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        swal({
          confirmButtonText: 'Aceptar',
          type: 'error',
          title: 'Contraseña inválida',
          text: 'Inténtalo de nuevo'
        });
      } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-email') {
        swal({
          confirmButtonText: 'Aceptar',
          type: 'error',
          title: 'Usuario inválido',
          text: 'Inténtalo de nuevo'
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

window.getPopUpForAccount = (provider) => {
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      location.href = ('views/userView.html');
    // Errores en la conexión
    }).catch(error => {
      const errorCode = error.code;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        swal({
          confirmButtonText: 'Aceptar',
          type: 'error',
          title: 'Ya existe un usuario registrado con la dirección de correo proporcionada',
          text: 'Inténtalo de nuevo'
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
          console.log('Correo enviado');
          swal({
            confirmButtonText: 'Aceptar',
            type: 'success',
            title: 'Se ha enviado un enlace de verificación a tu cuenta de correo',
            text: 'Sigue las instrucciones para ingresar a tu cuenta'
          });
          signOut();
        }).catch(error => {
          console.log('Error', error);
        });
    })
    .catch(error => {
      let errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        swal({
          confirmButtonText: 'Aceptar',
          type: 'error',
          title: 'Dirección de correo inválida',
          text: 'Inténtalo de nuevo'
        });
      } else if (errorCode === 'auth/weak-password') {
        swal({
          confirmButtonText: 'Aceptar',
          type: 'error',
          title: 'Contraseña inválida',
          text: 'Inténtalo de nuevo'
        });
      } else if (errorCode === 'auth/email-already-in-use') {
        swal({
          confirmButtonText: 'Aceptar',
          type: 'error',
          title: 'Ya existe un usuario registrado con la dirección de correo proporcionada',
          text: 'Inténtalo de nuevo'
        });
      }
    });
};

// Cerrar sesión
window.signOut = () => {
  firebase.auth().signOut()
    .then(() => {
      location.href('../index.html');
    }).catch(error => {
      console.log('Error', error);
    });
};
