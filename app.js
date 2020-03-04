//Инициализация miterialize
document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();
});

const apiKey = 'b4a7d4c12c2d4b80bcf4edcacfd78c04';
const apiUrl = 'http://newsapi.org/v2';

async function getNews(apiKey, apiUrl, Switch, country, search = null) {
  try {
    let response;
    switch(Switch) {
      case 1: response  = await fetch(`${apiUrl}/everything?q=${search}&language=${country[1]}&apiKey=${apiKey}`);
      break;
      case 2: response  = await fetch(
      `${apiUrl}/top-headlines?country=${country[0]}&apiKey=${apiKey}`);
      break;
      }
    let data = await response.json();
    data = data.articles;
    renderNews(data);
  } catch (err) {
    M.toast({html: err, classes: 'rounded'});
  }
}; 

const form = document.forms['newsForm'];

form.addEventListener('submit', e => {
  e.preventDefault();
  responseNews();
})

function responseNews() {
  const countrySelect = form.elements['country'];
  const searchInput = form.elements['search'];
  let countryMassive = countrySelect.value.split('_');
  const search = searchInput.value;
  if (search) {
    getNews(apiKey, apiUrl, 1, countryMassive, search);
  } else {
    getNews(apiKey, apiUrl, 2, countryMassive);
  }
}

function renderNews(news) {
  const container = document.querySelector('.newsContainer .row')
  if (container.children.length) {
    container.innerHTML = '';
  }
  let fragment = '';
  news.forEach(newsItem => {
    const element = newsTemplate(newsItem);
    fragment += element;
  })
  container.insertAdjacentHTML('afterbegin', fragment);
}

function newsTemplate({ title, description, url, urlToImage}) {
  return `
  <div class="col xl4 l6 m6 s12">
    <div class="card">
      <div class="card-image">
        <img src="${urlToImage}">
        <span class="card-title card-title-custom">${title || ''}</span>
      </div>
      <div class="card-content">
        <p>${description || ''}</p>
      </div>
      <div class="card-action">
        <a href="${url}">Read more</a>
      </div>
    </div>
  </div>
  `
}