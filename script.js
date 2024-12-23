"strict use"

fetch("movies.json")
    .then((reponse) => reponse.json())
    .then((movies) => {
        console.log(movies);
        movies.results.forEach(film => {
            document.getElementById("film").innerHTML += `
            <div class="card p-0 col-lg-2 mb-3" style="width: 18rem;">
                <div class="position-relative">
                    <img src="${film.backdrop_path}"
                        class="card-img-top" alt="${film.title}">
                    <span class="d-inline-block position-absolute bottom-0 end-0 p-1" tabindex="0" data-bs-toggle="popover"
                        data-bs-trigger="hover focus" data-bs-placement="top" data-bs-content="${film.vote_count} votants">
                        <button class="btn btn-light" type="button" disabled> ${film.vote_average} /10</button>
                    </span>
                </div>
                <div class="card-body h-auto">
                    <h3 class="card-title fs-6">${film.title}</h3>
                    <p class="text-secondary mb-0 h-auto"> ${film.release_date} </p>
                </div>
            </div>`
        });
    })

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))