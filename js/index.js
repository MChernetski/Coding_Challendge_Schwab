const formSearch = document.querySelector('.form-search');
const searchURL =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=30&srsearch=';

formSearch.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.input-search').value;
  const query = input.trim();
  //console.log(query);
  fetchResult(query);
});

function fetchResult(query) {
  const endpoint = searchURL + query;
  //console.log(endpoint);
  fetch(endpoint)
    .then(getJson)
    .then(getResults)
    .then(displayResults)
    .catch(error => console.log('An error occurred:', error));
}
function getJson(response) {
  return response.json();
}
function getResults(data) {
  return data.query.search;
}
function displayResults(results) {
  //console.log(results);
  const searchResults = document.querySelector('.result-search');
  searchResults.innerHTML = '';
  results.forEach(result => {
    const url = encodeURI(`http://en.wikipedia.org/wiki/${result.title}`);
    searchResults.insertAdjacentHTML(
      'beforeend',
      `<div class="result">
      <h3 class="result-title">
        <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
      </h3>
      <span class="result-snippet">${result.snippet}</span>
      <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
    </div>`
    );
  });
}
