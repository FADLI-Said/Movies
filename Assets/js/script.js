"strict use"

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjA0YTJhNDgwOTMwMzhkM2ZiODdlODVkM2ZmZGYzNyIsIm5iZiI6MTczNjE1NzcyMS4xNjMsInN1YiI6IjY3N2JhYTE5ODJjY2UxNWE3Njc1MTdmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NOKO4mRcOFRzcNO-c8m-5bOsDPb7rK21MO-MLQAyvJc'
  }
};

fetch('https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1&region=FR', options)
  .then((reponse) => reponse.json())
  .then((movies) => {
    console.log(movies);
    movies.results.forEach(film => {
      moment.locale("fr")
      document.getElementById("film").innerHTML += `
        <div class="card position-relative p-0 mb-lg-5 rounded">
        <a href="movies.html?id=${film.id}"> 
          <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" class="card-img-top" alt="${film.title}">
            <div class="card__content">
            <p class="card__title m-0">${film.title} </p>
            <button class="card__description btn btn-light position-absolute bottom-0 start-0 p-2" type="button" disabled>${moment(film.release_date).format("ll")} </button>
            <span class="d-inline-block m-0 position-absolute bottom-0 end-0 p-0" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="${film.vote_count} votants">
            <button class="btn btn-light" type="button" disabled>${film.vote_average} /10</button>
            </span>
            </div>
        </a>
        </div>`
    });
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

    document.getElementById("search").style.backgroundImage = `url("https://image.tmdb.org/t/p/original${movies.results[0].backdrop_path}")`;
  })

// Scroll horizontal possible avce la roulette de la souris
// document.getElementById('film').addEventListener('wheel', (e) => {
//   e.preventDefault();
//   e.currentTarget.scrollLeft += e.deltaY;
// });

fetch(`https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1&region=FR`, options)
  .then((reponse) => reponse.json())
  .then((nextMovie) => {
    nextMovie.results.forEach(nextMovie => {
      document.getElementById("nextFilm").innerHTML += `
    <div class="card position-relative p-0 mb-lg-5 rounded">
        <a href="movies.html?id=${nextMovie.id}"> 
          <img src="https://image.tmdb.org/t/p/w500${nextMovie.poster_path}" class="card-img-top" alt="${nextMovie.title}">
            <div class="card__content">
            <p class="card__title m-0">${nextMovie.title} </p>
            <button class="card__description btn btn-light position-absolute bottom-0 start-0 p-2" type="button" disabled>${moment(nextMovie.release_date).format("ll")} </button>
            <span class="d-inline-block m-0 position-absolute bottom-0 end-0 p-0" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="${nextMovie.vote_count} votants">
            <button class="btn btn-light" type="button" disabled>${nextMovie.vote_average} /10</button>
            </span>
            </div>
        </a>
        </div>
    `
    });
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

    document.getElementById("search").style.backgroundImage = `url("https://image.tmdb.org/t/p/original${movies.results[0].backdrop_path}")`;
  })

// document.getElementById('nextFilm').addEventListener('wheel', (e) => {
//   e.preventDefault();
//   e.currentTarget.scrollLeft += e.deltaY;
// });