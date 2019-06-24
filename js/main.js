$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        //console.log($('#searchText').val());//debugger
        e.preventDefault();
        
    })
});

function getMovies(searchText){
    let api_key = '98325a9d3ed3ec225e41ccc4d360c817';
    axios.get("https://api.themoviedb.org/3/search/movie?api_key="+api_key+"&language=en-US&query=" + searchText)
         .then((response) => {
            console.log(response);
            let movies = response.data.results;
            let output = '';
            $.each(movies, (index, movie) => {
              output += `
                <div class="card text-white bg-secondary mb-3" style="max-width: 22rem;">
                    <div class="card-header"><label> ${movie.title} </label></div>
                        <div class="card-body">
                            <img style="height: 400px; width: 100%; display: block;" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image">
                            <section class="neonbuttons">
                            <a onclick="movieSelected('${movie.id}')"href="#">
                            <span><span> View Movie </span></span></a>
                            </section>
                        </div>
                    </div>
                </div>

              `;
              $('#movies').html(output);
            })
          })
         .catch((err => {
             console.log(err);
         }));
}

function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    // Make a request for a user with a given ID
    axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=98325a9d3ed3ec225e41ccc4d360c817")
      .then(function (response) {
      let movie = response.data;
      //console.log(movie);
      let output = `
          <div class="row">
            <div class="col-md-4">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${movie.title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
                <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} min.</li>
                <li class="list-group-item"><strong>Production Companies:</strong> ${movie.production_companies[0].name} min.</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="well">
              <h3>Plot</h3>
              ${movie.overview}
              <hr>
              <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="index.html" class="btn btn-default">Go Back To Search</a>
            </div>
          </div>
      `;
      $('#movie').html(output);
      })
      .catch(function (error) {
        console.log(error);
      });
  }