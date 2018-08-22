
window.getData = (search, page) => {
    fetch(`http://www.omdbapi.com/?apikey=add73b1a&s=${search}&page=${page}`)
    .then(response => response.json())
    .then(response =>{
        drawDataBySearch(response);
    })
    .catch(error =>{
        console.log('Error', error);
    })
}

document.getElementById('search-string-button').addEventListener('click', event =>{
    event.preventDefault();
    let searchString = document.getElementById('search-string').value;
    let newSearchString = searchString.replace(' ', '+');
    getData(newSearchString, 1);
    document.getElementById('search-string').value = '';
})

window.drawDataBySearch = (dataArray) =>{
    let result = '';
    let poster = '';
    //console.log(dataArray.totalResults)
    dataArray.Search.forEach(data => {
        let type = getTypeBage(data.Type);
        if(data.Poster === 'N/A'){
            poster = 'img/no-poster.jpg';
        }else{
            poster = data.Poster;
        }
        result += `<div class="col-6 col-sm-4 col-md-3 col-lg-3 my-3">
					<div class="card hoverable">
					    <img class="img-fluid height-img" src="${poster}">
					    <div class="card-body">
                            <h4 class="card-title">${data.Title}</h4>
                            <div class="row">
                            <div class="col-md-6"><p class="card-text">${type}</p></div>
                            <div class="col-md-6"><span class="badge badge-dark"><i class="fas fa-info-circle"></i><button class="no-btn" onclick="getDetails('${data.imdbID}')">Detalles</button></span></div>
                            </div>
					    </div>
					</div>
    			</div>`;
    });
    document.getElementById('dataGrid').innerHTML = result;
}

window.getTypeBage = (type) =>{
    let result = '';
    if(type === 'movie'){
        result = `<span class="badge badge-warning"><i class="fas fa-film"></i> Película</span>`;
    }
    if(type === 'series'){
        result = `<span class="badge badge-success"><i class="fas fa-tv"></i> Serie</span>`;
    }
    if(type === 'game'){
        result = `<span class="badge badge-info"><i class="fas fa-gamepad"></i> Videojuego</span>`;
    }
    return result;
}

window.getDetails = (imdbID) =>{
    console.log(imdbID);
    fetch(`http://www.omdbapi.com/?apikey=add73b1a&i=${imdbID}`)
        .then(response => response.json())
        .then(response => {
            drawDataDetails(response)
        })
        .catch(error => {
            console.log('Error', error);
        });
}

window.drawDataDetails = (dataArray) =>{
    console.log(dataArray);
    const card = `<div class="container pl-4">
    <div class="card">
      <div class="row ">
        <div class="col-md-6 px-0"><img src="${dataArray.Poster}" class="img-fluid img-card"></div>
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