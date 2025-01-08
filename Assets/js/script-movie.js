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
            .then((film) => {

                moment.locale("fr")
                let heure = Math.floor(film.runtime / 60)
                let minute = film.runtime % 60
                // .filter = if et .map = aplique une fonction sur tout un tableau
                let directors = credit.crew.filter(member => member.job === "Director").map(member => member.name).join(", ");
                let writers = credit.crew.filter(member => member.job === "Writer").map(member => member.name).join(", ");
                // .join = les avoir tous a la suite avec une virgule entre 2
                let genres = film.genres.map((genres) => genres.name).join(", ")

                // Appeler la fonction pour mettre à jour les keyframes
                updateKeyframes(Math.round(film.vote_average * 10));
                document.getElementById("affiche").innerHTML = `
                <div class="row m-0 content">
                    <img src="${film.poster_path == null ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" : `https://image.tmdb.org/t/p/w500${film.poster_path}`}" alt="${film.title}"
                    class="col-lg-3 col-11 p-0 m-3">
                    <div class="col-lg-8 col-11 ">
                        <h1 class="fs-2 p-0 m-3">${film.title}</h1>
                        <p class="m-3">${moment(film.release_date).format("ll")} · ${genres} · ${heure}h${minute}</p>
                        <div class="progress-bar-container m-3">
                            <div class="progress-bar js">
                                <progress id="js" min="0" max="100" value="${film.vote_average * 10}"></progress>
                            </div>
                        </div>
                        <p class="m-3 text-secondary">${film.tagline}</p>
                        <h2 class="m-3 fs-5">Synopsis</h2>
                        <p class="m-3">${film.overview}</p>
                        <div id="director" class="m-3 row">
                            <div class="col-6 p-0" id="Director-info">
                                <h3 class="fs-6" id="Director">${directors}</h3>
                                <p>Director</p>
                            </div>
                            </div>
                    </div>
                </div>`
                document.getElementById("affiche").style.backgroundImage = `url(https://image.tmdb.org/t/p/original${film.backdrop_path})`;
            })

        function updateKeyframes(newValue) {
            // Rechercher une feuille de style existante ou en créer une
            let styleSheet = Array.from(document.styleSheets).find(sheet => !sheet.href);
            if (!styleSheet) {
                const style = document.createElement("style");
                document.head.appendChild(style);
                styleSheet = style.sheet;
            }

            // Rechercher la règle @keyframes js-progress
            let keyframesRule = Array.from(styleSheet.cssRules).find(
                (rule) => rule.type === CSSRule.KEYFRAMES_RULE && rule.name === "js-progress"
            );

            // Si la règle n'existe pas, la créer
            if (!keyframesRule) {
                const keyframes = `
                        @keyframes js-progress {
                            to {
                                --progress-value: ${newValue};
                            }
                        }
                    `;
                styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
                console.log(`Created new keyframes with value: ${newValue}`);
            } else {
                // Si la règle existe, la modifier
                for (let keyframe of keyframesRule.cssRules) {
                    if (keyframe.keyText === "to") {
                        keyframe.style.setProperty("--progress-value", newValue);
                        console.log(`Updated keyframes to value: ${newValue}`);
                    }
                }
            }
        }


        for (let acteur = 0; acteur < 10; acteur++) {
            document.getElementById("scroll").innerHTML += `
            <div class="card p-0" style="width: 10rem;">
                <img src="${credit.cast[acteur].profile_path == null ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg" : `https://image.tmdb.org/t/p/w500${credit.cast[acteur].profile_path}`}" class="card-img-top" style="height: 237px;" alt="Image de ${credit.cast[acteur].name}">
                <div class="card-body">
                    <h5 class="card-title">${credit.cast[acteur].name}</h5>
                    <p class="card-text">${credit.cast[acteur].character}</p>
                </div>
            </div>`;
        }
    })
