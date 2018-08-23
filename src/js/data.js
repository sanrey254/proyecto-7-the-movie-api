
window.getData = (search, page) => {
    fetch(`https://www.omdbapi.com/?apikey=add73b1a&s=${search}&page=${page}`)
        .then(response => response.json())
        .then(response => {
            drawData(response.Search);
        })
        .catch( () => {
            console.log('Error');
            document.getElementById('dataGrid').innerHTML = `<div class="mt-5 px-3 px-md-0 mx-auto"><img src="img/no-result.png"class="img-fluid"></div>`;
        })
}

document.getElementById('search-string-button').addEventListener('click', event => {
    event.preventDefault();
    let searchString = document.getElementById('search-string').value;
    let newSearchString = searchString.replace(' ', '+');
    getData(newSearchString, 1);
    document.getElementById('search-string').value = '';
})

window.drawData = (dataArray) => {
    let result = '';
    let poster = '';
    //console.log(typeof(dataArray));
    dataArray.forEach(data => {
        let type = getTypeBage(data.Type);
        if (data.Poster === 'N/A') {
            poster = 'img/no-poster.jpg';
        } else {
            poster = data.Poster;
        }
        result += `<div class="col-6 col-sm-4 col-md-3 col-lg-3 my-3">
					<div class="card hoverable">
					    <img class="img-fluid height-img" src="${poster}">
					    <div class="card-body">
                            <h4 class="card-title">${data.Title}</h4>
                            <div class="row">
                            <div class="col-md-6"><p class="card-text">${type}</p></div>
                            <div class="col-md-6"><span class="badge badge-dark"><i class="fas fa-info-circle"></i><button class="no-btn text-white" onclick="getDetails('${data.imdbID}')">Detalles</button></span></div>
                            </div>
					    </div>
					</div>
    			</div>`;
    });
    document.getElementById('dataGrid').innerHTML = result;
}

window.getTypeBage = (type) => {
    let result = '';
    if (type === 'movie') {
        result = `<span class="badge badge-warning"><i class="fas fa-film"></i> Película</span>`;
    }
    if (type === 'series') {
        result = `<span class="badge badge-success"><i class="fas fa-tv"></i> Serie</span>`;
    }
    if (type === 'game') {
        result = `<span class="badge badge-info"><i class="fas fa-gamepad"></i> Videojuego</span>`;
    }
    return result;
}

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
}

window.drawDataDetails = (dataArray) => {
    if (dataArray.Poster === 'N/A') {
        poster = 'img/no-poster.jpg';
    } else {
        poster = dataArray.Poster;
    }
    const card = `<div class="container pl-4">
    <div class="card">
      <div class="row ">
        <div class="col-md-6 px-0"><img src="${poster}" class="img-fluid img-card"></div>
          <div class="col-md-6 pl-0"><div class="card-block p-3 text">
              <h4 class="card-title-details text-center">${dataArray.Title}</h4>
              <div class="text-left">
                <span class="card-text-details pb-1 d-block"><strong>Clasificación: </strong>${dataArray.Rated}</span>
                <span class="card-text-details py-1 d-block"><strong>Año: </strong>${dataArray.Year}</span>
                <span class="card-text-details py-1 d-block"><strong>País: </strong>${dataArray.Country}</span>
                <span class="card-text-details py-1 d-block"><strong>Categoríass: </strong>${dataArray.Genre}</span>
                <span class="card-text-details pt-1 d-block small-text"><strong>Reseña: </strong>${dataArray.Plot}</span>
            </div></div></div></div></div></div></div>`;
    swal({
        html: card,
        confirmButtonText: 'Cerrar',
        backdrop: `rgba(24, 24, 36, 0.92)`
    })

}

window.getMoviesTop = () =>{
    const topMovies = ['tt1677720', 'tt4154756', 'tt5463162', 'tt3606756', 'tt1825683','tt5104604', 'tt5095030', 'tt6911608', 'tt5164214', 'tt4881806', 'tt4073790', 'tt6133466'];
    //let topMoviesImdbID = new Array;
    let result = '';
    topMovies.forEach((element, i) =>{
        fetch(`https://www.omdbapi.com/?apikey=add73b1a&i=${element}`)
            .then(response => response.json())
            .then(data => {
                let type = getTypeBage(data.Type);
                if (data.Poster === 'N/A') {
                    poster = 'img/no-poster.jpg';
                } else {
                    poster = data.Poster;
                }
                result += `<div class="col-6 col-sm-4 col-md-3 col-lg-3 my-3">
					<div class="card hoverable">
					    <img class="img-fluid height-img" src="${poster}">
					    <div class="card-body">
                            <h4 class="card-title">${data.Title}</h4>
                            <div class="row">
                            <div class="col-md-6"><p class="card-text">${type}</p></div>
                            <div class="col-md-6"><span class="badge badge-dark"><i class="fas fa-info-circle"></i><button class="no-btn text-white" onclick="getDetails('${data.imdbID}')">Detalles</button></span></div>
                            </div>
					    </div>
					</div>
                </div>`; 
                document.getElementById('dataGrid').innerHTML = result;
            })
            .catch(error => {
                console.log('Error', error);
            });
    })
    //drawData(topMoviesImdbID);
}

getMoviesTop();