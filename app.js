
const input = document.querySelector("#input");

input.addEventListener('keyup', e => {
  if (e.keyCode === 13) searchMovie(input.value);
})

function searchMovie(query) {
  const key = 'apikey=596c355f';
  const url = `https://www.omdbapi.com/?${key}&t=${query}`;

  fetch(url)
    .then(d => d.json())
    .then(render)
    .catch(console.error);
}

function render(data) {
  const result = document.querySelector("#result");

  if (data.Response == 'False') {
    // when not found
    result.innerHTML = 'Movie Not Found !';
    return;
  }

  const rating = parseInt(data.imdbRating);
  let type = 'green';

  if (rating < 3) type = 'red';
  else if (rating < 6) type = 'orange';

  result.innerHTML =
    `
      <img src="${data.Poster}" alt="" class="movie-img">
      <div class="movie-title">${data.Title}</div>
      <div class="movie-rating ${type}">
        ${rating} out of 10
        <div class="inner-bar" style="width: ${rating * 10}%"></div>
      </div>    
    `;

}

