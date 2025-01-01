"strict use"

fetch("nextMovies.json")
  .then((reponse) => reponse.json())
  .then((movies) => {
    console.log(movies);
    movies.results.forEach(film => {
      moment.locale("fr")
      document.getElementById("film").innerHTML += `
            <div class="card position-relative p-0 mb-lg-5 rounded">
  <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" class="card-img-top" alt="${film.original_title}">
  <div class="card__content">
    <p class="card__title m-0">${film.original_title} </p>
        <button class="card__description btn btn-light position-absolute bottom-0 start-0 p-2" type="button" disabled>${moment(film.release_date).format("ll")} </button>
    <span class="d-inline-block m-0 position-absolute bottom-0 end-0 p-0" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="${film.vote_count} votants">
        <button class="btn btn-light" type="button" disabled>${film.vote_average} /10</button>
    </span>
  </div>
</div>`
    });
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

    document.getElementById("search").style.backgroundImage = `url("https://image.tmdb.org/t/p/original${movies.results[0].backdrop_path}")`;
  })



  // Scroll horizontal possible avce la roulette de la sourie
document.getElementById('film').addEventListener('wheel', (e) => {
  e.preventDefault();
  e.currentTarget.scrollLeft += e.deltaY;
});