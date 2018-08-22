
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

window.drawDataBySearch = (dataArray) =>{
    let result = '';
    let poster = '';
    console.log(dataArray.totalResults)
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
                            <div class="col-md-6"><span class="badge badge-dark"><i class="fas fa-info-circle"></i><button class="no-btn">Detalles</button></span></div>
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