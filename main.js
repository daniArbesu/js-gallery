import { MOCK_CARDS, TECHNOLOGIES_URL } from './constants';
import './style.css';

// SETUP
const appElement = document.querySelector('#app');

const getContainerTemplate = () => `
<div id="js-gallery" class="js-gallery">
  <h1>Loading... ⌚</h1>
</div>
`;

appElement.innerHTML += getContainerTemplate();

// LOGIC
const galleryElement = document.querySelector('#js-gallery');
const loadingElement = document.querySelector('#js-gallery > h1');

let cards;

const setupStars = (score) => {
  if (!score) {
    return `<p class="no-rating">No rating</p>`;
  }

  let starContainer = [];

  for (let i = 1; i < score; i++) {
    starContainer.push(`<span class="star">⭐</span>`);
  }

  return starContainer.join('');
};

const getCardTemplate = ({ name, logo, score }) => `
<div class="card">
  <h3>${name}</h3>

  <div class="image-container">
    <img src="${logo}" alt="${name}" />
  </div>

  <div class="score-container">${setupStars(score)}</div>
</div>
`;

const setupCards = () => {
  loadingElement.remove();

  cards.forEach((card) => {
    const template = getCardTemplate(card);
    galleryElement.innerHTML += template;
  });
};

const getTechnologies = async () => {
  try {
    const res = await fetch(TECHNOLOGIES_URL);
    const cardsData = await res.json();

    cards = cardsData;
    setupCards();
  } catch (err) {
    console.log(err);
    cards = MOCK_CARDS;
    setupCards();
  }
};

getTechnologies();
