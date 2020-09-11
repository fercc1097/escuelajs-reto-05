const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
const final = document.getElementById('finale');
const main = document.querySelector('.Main');


const getData = api => {
  if (localStorage.getItem('next_fetch') !== null) {
    api = localStorage.getItem('next_fetch');
  }
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      const next = response.info.next;
      localStorage.setItem('next_fetch', next);
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      checkFinal(next);
    })
    .catch(error => {
      console.log(error)
    });
}

const checkFinal = (next) => {
  if (next === null) {
    intersectionObserver.disconnect($observe);
    console.log('Ya no hay personajes');
    alert('ya no hay personajes');
  }
}
const loadData = async () => {
  try {
    await initialize;
    await getData(API);
  } catch (error) {
    checkFinal();
    console.log(error);
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

const initialize = document.addEventListener("DOMContentLoaded", () => {
  localStorage.clear();
  localStorage.setItem('next_fetch', API);
})