
window.getData = (search, page) => {
  fetch(`https://www.omdbapi.com/?apikey=add73b1a&s=${search}&page=${page}`)
    .then(response => response.json())
    .then(response => {
      drawData(response.Search);
    })
    .catch(() => {
      console.log('Error');
      document.getElementById('moviesGrid').innerHTML = '';
      document.getElementById('dataGrid').innerHTML = '<div class="mt-5 px-3 px-md-0 mx-auto"><img src="img/no-result.png"class="img-fluid"></div>';
    });
};

/* document.getElementById('search-string-button').addEventListener('click', event => {
  event.preventDefault();
  let searchString = document.getElementById('search-string').value;
  let newSearchString = searchString.replace(' ', '+');
  getData(newSearchString, 1);
  document.getElementById('search-string').value = '';
}); */

window.drawData = (dataArray) => {
  
  let result = '';
  let poster = '';
  // console.log(typeof(dataArray));
  dataArray.forEach(data => {
    let type = getTypeBage(data.Type);
    if (data.Poster === 'N/A') {
      poster = 'img/no-poster.jpg';
    } else {
      poster = data.Poster;
    }
    result += `<div class="col offset-s1 s10 m6 l3"><div class="card">
          <div class="card-image">
            <img class="height-img" src="${poster}">
            <a class="btn-floating halfway-fab waves-effect waves-light red" onclick="getDetails('${data.imdbID}')"><i class="material-icons">speaker_notes</i></a>
          </div>
          <div class="card-content">
            <p><b>${data.Title}<b></p>
          </div>
          <div class="card-action">
            ${type}
          </div></div></div>`;
  });
  document.getElementById('moviesGrid').innerHTML = '';
  document.getElementById('dataGrid').innerHTML = result;
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
    poster = 'img/no-poster.jpg';
  } else {
    poster = dataArray.Poster;
  }
  const card = `<div class="row">
  <div class=""><h4>${dataArray.Title}</h4></div>
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
    confirmButtonText: 'Cerrar',
    confirmButtonColor: '#F44336',
    backdrop: 'rgba(24, 24, 36, 0.92)'
  });
};

window.getMoviesTop = () => {
  const topMovies = ['tt1677720', 'tt4154756', 'tt5463162', 'tt3606756', 'tt1825683', 'tt5104604', 'tt5095030', 'tt6911608', 'tt5164214', 'tt4881806', 'tt4073790', 'tt6133466'];
  // let topMoviesImdbID = new Array;
  let result = '';
  topMovies.forEach((element, i) => {
    fetch(`https://www.omdbapi.com/?apikey=add73b1a&i=${element}`)
      .then(response => response.json())
      .then(data => {
        let type = getTypeBage(data.Type);
        if (data.Poster === 'N/A') {
          poster = 'img/no-poster.jpg';
        } else {
          poster = data.Poster;
        }
        result += `<div class="col offset-s1 s10 m6 l3"><div class="card">
          <div class="card-image">
            <img class="height-img" src="${poster}">
            <a class="btn-floating halfway-fab waves-effect waves-light red" onclick="getDetails('${data.imdbID}')"><i class="material-icons">speaker_notes</i></a>
          </div>
          <div class="card-content">
            <p><b>${data.Title}<b></p>
          </div>
          <div class="card-action">
            ${type}
          </div></div></div>`;
        document.getElementById('moviesGrid').innerHTML = result;
      })
      .catch(error => {
        console.log('Error', error);
      });
  });
  // drawData(topMoviesImdbID);
};

getMoviesTop();