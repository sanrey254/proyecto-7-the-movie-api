document.getElementById('sign-out').addEventListener('click', event => {
  event.preventDefault();
  signOut();
});


window.getCurrentUserFavorites = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection('users').get()
        .then(response => {
          let i = 0;
          response.forEach(element => {
            if (user.uid === element.data().userID) {
              drawCurrentUserFavorites(element.id);
              i++;
            }
          });
          if (i === 0) {
            db.collection('users').add({
              userID: user.uid,
              favorites: []
            }).then(() => {
              console.log('Usuario Agregado');
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      location.href = ('index.html');
    }
  });
};

window.drawCurrentUserFavorites = (id) => {
  db.collection('users').doc(id).get()
    .then(response => {
      drawMoviesAndSeriesTop(response.data().favorites, 3);
    });
};

getCurrentUserFavorites();