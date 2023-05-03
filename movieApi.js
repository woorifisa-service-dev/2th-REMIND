const API_KEY = '354af52aee70782be0a6e4c9d4057d64';
const BASE_URL = "https://api.themoviedb.org/3";

export const movieApi = {
    getMovies : async (path, position) => {
        let movies = [];

        await fetch(`${BASE_URL}/movie/${path}?api_key=${API_KEY}&language=ko`)
            .then((res) => res.json())
            .then((data) => movies = data.results)
            .catch((err) => console.error('API 에러: ' ,err));
    
        const createList = movies.slice(0,3).map((movie) => {
            const imageUrl = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
            return `<li data-movie-id="${movie.id}">
                 <div class="poster" style="background-image: url(${imageUrl});"></div>
                 <h3 class="poster-title">${movie.title}</h3>
                </li>`;
        }); 
    
        document.querySelectorAll('.card-list')[position].innerHTML = createList;    
    }
};

