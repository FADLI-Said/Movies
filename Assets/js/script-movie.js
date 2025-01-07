const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjA0YTJhNDgwOTMwMzhkM2ZiODdlODVkM2ZmZGYzNyIsIm5iZiI6MTczNjE1NzcyMS4xNjMsInN1YiI6IjY3N2JhYTE5ODJjY2UxNWE3Njc1MTdmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NOKO4mRcOFRzcNO-c8m-5bOsDPb7rK21MO-MLQAyvJc'
    }
};

let params = new URLSearchParams(document.location.search);
let id = params.get("id");

fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=fr-FR`, options)
    .then((reponse) => reponse.json())
    .then((credit) => {



        fetch(`https://api.themoviedb.org/3/movie/${id}?language=fr-FR`, options)
            .then((reponse) => reponse.json())
            .then((matrix) => {
                let heure = Math.floor(matrix.runtime / 60)
                let minute = matrix.runtime % 60
                // .filter = if et .map = aplique une fonction sur tout un tableau
                let directors = credit.crew.filter(member => member.job === "Director").map(member => member.name).join(", ");
                let writers = credit.crew.filter(member => member.job === "Writer").map(member => member.name).join(", ");
                let genres = matrix.genres.map((genres) => genres.name).join(", ")
                // .join = les avoir tous a la suite avec une virgule entre 2
                let percentage = document.get
                document.getElementById("affiche").innerHTML = `
                <div class="row m-0 content">
                    <img src="https://image.tmdb.org/t/p/w500/${matrix.poster_path}" alt="${matrix.title}"
                    class="col-lg-3 col-11 p-0 m-3">
                    <div class="col-lg-8 col-11 ">
                        <h1 class="fs-2 p-0 m-3">${matrix.title}</h1>
                        <p class="m-3">${matrix.release_date}(FR) · ${genres} · ${heure}h${minute}</p>
                        <div class="progress-bar-container m-3">
                            <div class="progress-bar js">
                                <progress id="js" min="0" max="100" value="${matrix.vote_average}"></progress>
                            </div>
                        </div>
                        <p class="m-3 text-secondary">${matrix.tagline}</p>
                        <h2 class="m-3 fs-5">Synopsis</h2>
                        <p class="m-3">${matrix.overview}</p>
                        <div id="director" class="m-3 row">
                            <div class="col-6 p-0" id="Director-info">
                                <h3 class="fs-6" id="Director">${directors}</h3>
                                <p>Director</p>
                            </div>
                            </div>
                    </div>
                </div>`
                document.getElementById("affiche").style.backgroundImage = `url(https://image.tmdb.org/t/p/original${matrix.backdrop_path})`;
            })

        for (let acteur = 0; acteur < 10; acteur++) {
            document.getElementById("scroll").innerHTML += `
            <div class="card p-0" style="width: 10rem;">
                <img src="https://image.tmdb.org/t/p/w500${credit.cast[acteur].profile_path}" class="card-img-top"
                    alt="Image de ${credit.cast[acteur].name}">
                <div class="card-body">
                    <h5 class="card-title">${credit.cast[acteur].name}</h5>
                    <p class="card-text">${credit.cast[acteur].character}</p>
                </div>
            </div>`;
        }
    })


// Permet de scroller une barre horizonatl avec la souris
document.getElementById("scroll").addEventListener('wheel', (e) => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
});