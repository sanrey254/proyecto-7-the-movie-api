initializeFirebase();
let db = firebase.firestore();

window.getData = (search, page) => {
  fetch(`https://www.omdbapi.com/?apikey=add73b1a&s=${search}&page=${page}`)
    .then(response => response.json())
    .then(response => {
      drawData(response.Search);
    })
    .catch((error) => {
      console.log('Error', error);
      document.getElementById('topMovies').style.display = 'none';
      document.getElementById('topSeries').style.display = 'none';
      document.getElementById('searchResult').innerHTML = '<div class="col offset-s4 s6"><img src="../img/no-result.png" class="responsive-img mt-5"></div>';
    });
};

document.getElementById('search-string').addEventListener('keyup', event => {
  event.preventDefault();
  if (event.keyCode === 13) {
    let searchString = document.getElementById('search-string').value;
    let newSearchString = searchString.replace(' ', '+');
    document.getElementById('movieTap').classList.remove('active');
    document.getElementById('serieTap').classList.remove('active');
    getData(newSearchString, 1);
    document.getElementById('search-string').value = '';
  }
});

window.drawData = (dataArray) => {
  let result = '';
  let poster = '';
  dataArray.forEach(data => {
    let type = getTypeBage(data.Type);
    if (data.Poster === 'N/A') {
      poster = '../img/no-poster.jpg';
    } else {
      poster = data.Poster;
    }
    result += `<div class="col offset-s1 s10 m6 l3"><div class="card">
          <div class="card-image">
            <img class="height-img" src="${poster}">
            <a class="btn-floating halfway-fab waves-effect waves-light red" onclick="addToFavorites('${data.imdbID}')" title="Add to favorites"><i class="material-icons"> star</i></a>
          </div>
          <div class="card-content">
            <p><b>${data.Title}</b></p>
          </div>
          <div class="card-action">
            ${type}<a><span class="badge blue darken-4 white-text lowerCase pointer" onclick="getDetails('${data.imdbID}')"><i class="fas fa-info-circle"></i> Details</span></a>
          </div></div></div>`;
  });
  document.getElementById('topMovies').style.display = 'none';
  document.getElementById('topSeries').style.display = 'none';
  document.getElementById('searchResult').innerHTML = result;
};

window.getTypeBage = (type) => {
  let result = '';
  if (type === 'movie') {
    result = '<a><span class="badge amber white-text lowerCase"><i class="fas fa-film"></i> Movie</span></a>';
  }
  if (type === 'series') {
    result = '<a><span class="badge red darken-4 white-text lowerCase"><i class="fas fa-tv"></i> Serie</span></a>';
  }
  if (type === 'game') {
    result = '<a><span class="badge green accent-4 white-text lowerCase"><i class="fas fa-gamepad"></i> Videogame</span></a>';
  }
  return result;
};

window.getDetails = (imdbID) => {
  console.log(imdbID);
  fetch(`https://www.omdbapi.com/?apikey=add73b1a&i=${imdbID}`)
    .then(response => response.json())
    .then(response => {
      drawDataDetails(response);
    })
    .catch(error => {
      console.log('Error', error);
    });
};

window.drawDataDetails = (dataArray) => {
  if (dataArray.Poster === 'N/A') {
    poster = '../img/no-poster.jpg';
  } else {
    poster = dataArray.Poster;
  }
  const card = `<div class="row">
  <div><h4>${dataArray.Title}</h4></div>
  <div class="col s5">
  <div class="mt-4"><img class="responsive-img" src="${poster}"></div>
  </div>
  <div class="col s7">
  <div class="card-action-text">
      <p><strong>Rated: </strong>${dataArray.Rated}</span></p>
      <p><strong>Year: </strong>${dataArray.Year}</span></p>
      <p><strong>Country: </strong>${dataArray.Country}</span></p>
      <p><strong>Genre: </strong>${dataArray.Genre}</span></p>
      <p><strong>Plot: </strong>${dataArray.Plot}</span></p>
  </div></div></div>`;
  swal({
    html: card,
    confirmButtonText: 'Ok',
    confirmButtonColor: '#F44336',
    backdrop: 'rgba(24, 24, 36, 0.92)'
  });
};

window.drawMoviesAndSeriesTop = (topArray, typeOfSearch) => {
  let result = '';
  topArray.forEach(element => {
    fetch(`https://www.omdbapi.com/?apikey=add73b1a&i=${element}`)
      .then(response => response.json())
      .then(data => {
        let type = getTypeBage(data.Type);
        if (data.Poster === 'N/A') {
          poster = '../img/no-poster.jpg';
        } else {
          poster = data.Poster;
        }
        result += `<div class="col offset-s1 s10 m6 l3"><div class="card hoverable">
          <div class="card-image">
            <img class="height-img" src="${poster}">
            <a class="btn-floating halfway-fab waves-effect waves-light red" onclick="addToFavorites('${data.imdbID}')" title="Add to favorites"><i class="material-icons"> star</i></a>
          </div>
          <div class="card-content">
            <p><b>${data.Title}</b></p>
          </div>
          <div class="card-action">
            ${type}<a><span class="badge blue darken-4 white-text lowerCase pointer" onclick="getDetails('${data.imdbID}')"><i class="fas fa-info-circle"></i> Details</span></a>
          </div></div></div>`;
        if (typeOfSearch === 1) {
          document.getElementById('topMovies').innerHTML = result;
        }
        if (typeOfSearch === 2) {
          document.getElementById('topSeries').innerHTML = result;
        }
        if (typeOfSearch === 3) {
          document.getElementById('myFavorites').innerHTML = result;
        }
      })
      .catch(error => {
        console.log('Error', error);
      });
  });
};

window.init = () => {
  const topMovies = ['tt1677720', 'tt4154756', 'tt5463162', 'tt3606756', 'tt1825683', 'tt5104604', 'tt5095030', 'tt6911608', 'tt5164214', 'tt4881806', 'tt4073790', 'tt6133466'];
  const topSeries = ['tt5753856', 'tt0944947', 'tt4574334', 'tt1520211', 'tt4230076', 'tt2085059', 'tt3032476', 'tt0898266', 'tt6257970', 'tt8363140', 'tt7016936', 'tt6470478'];
  drawMoviesAndSeriesTop(topMovies, 1);
  drawMoviesAndSeriesTop(topSeries, 2);
};


window.cleanSearchResultElement = () => {
  document.getElementById('searchResult').innerHTML = '';
};


window.checkElementID = (elementID, favorites) => {
  const positionElementID = favorites.indexOf(elementID);
  if (positionElementID === -1) {
    return true;
  } else {
    return positionElementID;
  }
};

window.addToFavorites = (id) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection('users').get()
        .then(response => {
          response.forEach(element => {
            if (user.uid === element.data().userID) {
              let currentUserFavorites = element.data().favorites;
              console.log(element.data().favorites);
              
              const checkUserFavorites = checkElementID(id, element.data().favorites);
              if (checkUserFavorites === true) {
                currentUserFavorites.push(`${id}`);
                db.collection('users').doc(element.id).update({
                  favorites: currentUserFavorites
                }).then(() => {
                  drawCurrentUserFavorites(element.id);
                }).catch(() => {
                  console.log('No agregado a favoritos');
                });
              } else {
                currentUserFavorites.splice(checkUserFavorites, 1);
                db.collection('users').doc(element.id).update({
                  favorites: currentUserFavorites
                }).then(() => {
                  console.log('Quitado de favoritos');
                  drawCurrentUserFavorites(element.id);
                }).catch(() => {
                  console.log('No quitado de favoritos');
                });
              }
            }
          });
        });
    } else {
      swal({
        confirmButtonText: 'Ok',
        type: 'error',
        title: 'You can´t add this to favorites',
        text: 'You need to sign in or sign up before',
        confirmButtonColor: '#F44336',
        backdrop: 'rgba(24, 24, 36, 0.92)'
      });
    }
  });
};