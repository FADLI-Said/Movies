"strict use"

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjA0YTJhNDgwOTMwMzhkM2ZiODdlODVkM2ZmZGYzNyIsIm5iZiI6MTczNjE1NzcyMS4xNjMsInN1YiI6IjY3N2JhYTE5ODJjY2UxNWE3Njc1MTdmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NOKO4mRcOFRzcNO-c8m-5bOsDPb7rK21MO-MLQAyvJc'
  }
};

let params = new URLSearchParams(document.location.search);
let idMovie = params.get("idMovie")

if (idMovie) {


  fetch(`https://api.themoviedb.org/3/search/movie?query=${idMovie}&include_adult=false&language=fr-FR&page=1`, options)
    .then((reponse) => reponse.json())
    .then((movies) => {
      console.log(movies);
      movies.results.forEach(film => {
        moment.locale("fr")
        document.getElementById("film").innerHTML += `
        <div class="card position-relative p-0 mb-lg-5 rounded">
        <a href="movies.html?id=${film.id}"> 
          <img src="${film.poster_path == null ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" : `https://image.tmdb.org/t/p/w500${film.poster_path}`}" class="card-img-top" alt="${film.title}">
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

    })
}