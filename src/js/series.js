
window.getSeries = (search) => {
    fetch(`http://www.omdbapi.com/?apikey=add73b1a&type=series&s=${search}&page=1`)
    .then(response => response.json())
    .then(response =>{
        drawSeriesBySearch(response.Search);
    })
    .catch(error =>{
        console.log('Error', error);
    })
}

window.drawSeriesBySearch = (seriesArray) =>{
    let result = '';
    seriesArray.forEach(serie => {
        result += `<div class="col-sm-6 col-md-4 col-lg-3 mt-4">
                    <div class="card">
                        <img class="card-img-top" src="${serie.Poster}">
                        <div class="card-block">
                            <h4 class="card-title mt-3">${serie.Title}</h4>
                        </div>
                        <div class="card-footer">
                            <small>${serie.Year}</small>
                            <button class="btn btn-secondary float-right btn-sm">Detalle</button>
                        </div>
                    </div>
                </div>`;
    });
    document.getElementById('seriesGrid').innerHTML = result;
}