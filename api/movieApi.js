const API_KEY = '354af52aee70782be0a6e4c9d4057d64';
const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w200/';

export const movieApi = {
    getMovies: async (path, position) => {
        let movies = [];

        await fetch(`${BASE_URL}/movie/${path}?api_key=${API_KEY}&language=ko`)
            .then((res) => res.json())
            .then((data) => movies = data.results)
            .catch((err) => console.error('API 에러: ', err));

        const createList = movies.slice(0, 3).map((movie) => {

            const imageUrl = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
            return `<li class="event-li" data-id="${movie.id}">
                 <div class="poster" style="background-image: url(${imageUrl});"></div>
                 <h3 class="poster-title dark:text-white">${movie.title}</h3>
                </li>`;
        });

        document.querySelectorAll('.card-list')[position].innerHTML = createList;

        document.querySelectorAll('.card-list')[0].addEventListener('click', (event) => {
            movieApi.getDetail(event.target.parentNode.dataset.id);
        });

        document.querySelectorAll('.card-list')[1].addEventListener('click', (event) => {
            movieApi.getDetail(event.target.parentNode.dataset.id);
        });
    },
    getDetail: async (movieId) => {
        let movieTitle;
        let content;
        let rating;
        let backBgPath;
        let posterBgPath;

        await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko`)
            .then((res) => res.json())
            .then(({ title, overview, vote_average, poster_path, backdrop_path }) => {
                movieTitle = title;
                content = overview;
                rating = vote_average;
                posterBgPath = BASE_IMG_URL + poster_path;
                backBgPath = BASE_IMG_URL + backdrop_path;
            })
            .catch((err) => console.error(err));

        // 배경 이미지 html 설계 오류 - 수정 필요
        // <div class="rt-poster-container" style="background-image: url(${backBgPath})"></div>
        const template = `<div class="rt-poster-container">
        <div class="rt-poster" style="background-image: url(${posterBgPath})"></div>
        <div class="rt-poster-detail">
          <div class="rt-poster-detail__title">
            <p>${movieTitle}</p>
          </div>
          <div class="rt-poster-detail__description">
            <p>
             ${content}
            </p>
          </div>
          <div class="rt-poster-detail-plus">
            <div class="rt-poster-detail-plus__star">
              <i class="fa-solid fa-star fa-xs"></i> ${rating.toFixed(1)}/10
            </div>
            <div class="rt-poster-detail-plus__distribution">
              <p></p>
            </div>
          </div>
        </div>
      </div>`;
        document.querySelector('.container-rt').innerHTML = template;
    }
};
