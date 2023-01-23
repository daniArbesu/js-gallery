import { MOCK_CARDS } from './constants';
import './style.css';

// SETUP
const appElement = document.querySelector('#app');

const getContainerTemplate = () => `
<div id="js-gallery" class="js-gallery">

</div>
`;

appElement.innerHTML += getContainerTemplate();

// LOGIC
const galleryElement = document.querySelector('#js-gallery');

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
  MOCK_CARDS.forEach((card) => {
    const template = getCardTemplate(card);
    galleryElement.innerHTML += template;
  });
};

setupCards();
