"strict use"

fetch("nextMovies.json")
    .then((reponse) => reponse.json())
    .then((movies) => {
        console.log(movies);
        movies.results.forEach(film => {
            moment.locale("fr")
            document.getElementById("film").innerHTML += `
            <div class="card position-relative p-0 mb-5 rounded">
  <img src="${film.backdrop_path}" class="card-img-top" alt="Test">
  <div class="card__content">
    <p class="card__title m-0">${film.original_title} </p>
    <p class="card__description mt-1">${film.overview} </p>
    <p class="card__description mt-1">${moment(film.release_date).format("ll")} </p>
    <span class="d-inline-block position-absolute bottom-0 end-0 p-1" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="${film.vote_count} votants">
        <button class="btn btn-light" type="button" disabled>${film.vote_average} /10</button>
    </span>
  </div>
</div>`
        });
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

        document.getElementById("search").style.backgroundImage = `url("${movies.results[0].backdrop_path}")`;
    })